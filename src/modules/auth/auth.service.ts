import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../utils/jwtToken";
const signUpUser = async (userInfo: Record<string, unknown>) => {
  const { name, email, password, phone, role } = userInfo;
  const roleToInsert = role ? role : 'customer';
  const hashPassword = await bcrypt.hash(password as string, 10);
  
 const result = await pool.query(
    `
    INSERT INTO users_table( name, email, password, phone, role)
    VALUES($1,$2,$3,$4,$5) RETURNING *
  `,
    [ name, email, hashPassword, phone, roleToInsert]
  );
const userInfoInDb = result.rows[0];
  return {
    id: userInfoInDb.id,
    name: userInfoInDb.name,
    email: userInfoInDb.email,
    phone :userInfoInDb.phone,
    role: userInfoInDb.role,
  }
};
const signInUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users_table WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("user not found ");
  }
  const userInfoInDb = result.rows[0];
  const passWordMatch = await bcrypt.compare(password, userInfoInDb.password);
  if (!passWordMatch) {
    throw new Error("wrong email or password");
  }
  const accessToken = await generateAccessToken({
    id: userInfoInDb.id,
    email: userInfoInDb.email,
    role: userInfoInDb.role,
  });
  const userInfo = {
    id: userInfoInDb.id,
    name: userInfoInDb.name,
    email: userInfoInDb.email,
    phone :userInfoInDb.phone,
    role: userInfoInDb.role,
  };
  return {token:accessToken,user:userInfo};
};
export const  authService={
    signUpUser,signInUser
}
