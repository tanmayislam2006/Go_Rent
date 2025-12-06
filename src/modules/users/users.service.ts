import { pool } from "../../config/db";
import { Status } from "../../enum/bookingStatus";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users_table`);
  return result.rows;
};
const updateUser = async (userId: string, userInfo: Record<string, any>) => {
  const isExist = await pool.query(`SELECT * FROM users_table WHERE id=$1`, [
    userId,
  ]);
  if (isExist.rows.length === 0) {
    throw new Error("User Not Found");
  }
  const { name, email, phone, role } = userInfo;
  const result = await pool.query(
    `UPDATE users_table SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, userId]
  );
  const userInfoInDb = result.rows[0];
  return {
    id: userInfoInDb.id,
    name: userInfoInDb.name,
    email: userInfoInDb.email,
    phone: userInfoInDb.phone,
    role: userInfoInDb.role,
  };
};
const deleteUser = async (userId: string) => {
  const exist = await pool.query(`SELECT * FROM users_table WHERE id=$1`, [
    userId,
  ]);
  if (exist.rows.length === 0) {
    throw new Error("User Not Found");
  }
  const activeBookings = await pool.query(
    `SELECT * FROM booking WHERE customer_id=$1 AND status=$2`,
    [userId, Status.ACTIVE]
  );

  if (activeBookings.rows.length > 0) {
    throw new Error("User cannot be deleted because they have active bookings");
  }
  await pool.query(`DELETE FROM users_table WHERE id=$1`, [userId]);
  return { message: `User deleted successfully` };
};
export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
