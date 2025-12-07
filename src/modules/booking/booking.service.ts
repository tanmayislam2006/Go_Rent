import { pool } from "../../config/db";
import { Availability } from "../../enum/availabilityStatus";
import { Status } from "../../enum/bookingStatus";
import { Role } from "../../enum/role";
const getBookings = async (userInfoToken: Record<string, any>) => {
  if (userInfoToken.role === Role.CUSTOMER) {
    const result = await pool.query(
      `SELECT * FROM booking WHERE customer_id=$1`,
      [userInfoToken.id]
    );
    const response = {
      success: true,
      message: "Your bookings retrieved successfully",
      data: result.rows,
    };
    return response;
  } else {
    const result = await pool.query(`SELECT * FROM booking`);
    const response = {
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    };
    return response;
  }
};
const createBooking = async (bookingInfo: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
    bookingInfo;
  // if(!customer_id)throw new Error ('Customer ID need')
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const number_of_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time portion

  if (start < today) {
    throw new Error("rent_start_date cannot be in the past");
  }

  if (end < today) {
    throw new Error("rent_end_date cannot be in the past");
  }

  if (end <= start) {
    throw new Error("rent_end_date must be after rent_start_date");
  }
  if (number_of_days <= 0) {
    throw new Error(
      `Invalid rent period: rent_end_date must be after rent_start_date`
    );
  }
  const findVehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);
  if (findVehicle.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  const vehicleInfo = findVehicle.rows[0];
  if (vehicleInfo?.availability_status === Availability.BOOKED) {
    throw new Error("Vehicle is not available");
  }
  const total_price = vehicleInfo?.daily_rent_price * number_of_days;
  const result = await pool.query(
    `INSERT INTO booking (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      Status.ACTIVE,
    ]
  );
  const updateTheVehicle = await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING * `,
    [Availability.BOOKED, vehicle_id]
  );
  const response = {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicleInfo.vehicle_name,
      daily_rent_price: vehicleInfo.daily_rent_price,
    },
  };
  return response;
};
const updateBooking = async (
  bookingId: string,
  bookingInfo: Record<string, any>,
  userInfoInToken: Record<string, any>
) => {
  const { status } = bookingInfo;
  const validStatuses = new Set<string>(Object.values(Status));

  if (!validStatuses.has(status)) {
    throw new Error(`Invalid status: ${status}`);
  }
  const findTheBooking = await pool.query(`SELECT * FROM booking WHERE id=$1`, [
    bookingId,
  ]);
  if (findTheBooking.rows.length === 0) {
    throw new Error("Booking Not Found");
  }
  const { customer_id } = findTheBooking?.rows[0];
  if (userInfoInToken.role === Role.CUSTOMER) {
    if (customer_id !== userInfoInToken.id) {
      throw new Error("You are not authorized to update this booking");
    }
  }

  const result = await pool.query(
    `UPDATE booking SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  const bookingInfoDb = result.rows[0];
  let responseMessage = `Booking ${status} successfully`;
  let responseData: any = bookingInfoDb;
  if (
    bookingInfo.status === Status.CANCELLED ||
    bookingInfo.status === Status.RETURNED
  ) {
    const updateTheVehicle = await pool.query(
      `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
      [Availability.AVAILABLE, bookingInfoDb.vehicle_id]
    );

    if (userInfoInToken.role === Role.ADMIN) {
      responseMessage = "Booking marked as returned. Vehicle is now available";
      responseData = {
        ...bookingInfoDb,
        vehicle: {
          availability_status: updateTheVehicle.rows[0].availability_status,
        },
      };
    }
  }
  return {
    success: true,
    message: responseMessage,
    data: responseData,
  };
};

export const bookingService = {
  createBooking,
  updateBooking,
  getBookings,
};
