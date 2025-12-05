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
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};
const getASingleVehicle = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  return result.rows[0];
};
const updateVehicleData = async (
  vehicleId: string,
  updateInfo: Record<string, any>
) => {
    const exit = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
      vehicleId,
    ]);
    if (exit.rows.length === 0) {
      throw new Error("Vehicle not found");
    }
    const {
      vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    } = updateInfo;
    const result = await pool.query(
      `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
      ]
    );
    return result.rows[0];
};
const deleteASingleVehicle = async (vehicleId: string) => {
  const exit = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  if (exit.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  await pool.query(`DELETE FROM vehicles WHERE id=$1`, [vehicleId]);
  return { message: "Vehicle deleted successfully" };
};
export const adminService = {
  createVehicleData,
  getAllVehicles,
  getASingleVehicle,
  updateVehicleData,
  deleteASingleVehicle
};
