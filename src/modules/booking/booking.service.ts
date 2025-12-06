import { pool } from "../../config/db";
import { Availability } from "../../enum/availabilityStatus";
import { Status } from "../../enum/bookingStatus";

const createBooking = async (bookingInfo: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
    bookingInfo;
  // if(!customer_id)throw new Error ('Customer ID need')
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const number_of_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
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

export const bookingService = {
  createBooking,
};
