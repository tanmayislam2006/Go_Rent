import { pool } from "../../config/db";

const createVehicleData = async (vehicleInfo: Record<string, any>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = vehicleInfo;
  const statusToInsert = availability_status
    ? availability_status
    : "available";

  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [vehicle_name, type, registration_number, daily_rent_price, statusToInsert]
  );
    return result.rows[0];
};
 export const adminService = {
  createVehicleData,
};

