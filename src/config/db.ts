import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connectionString,
  ssl: { rejectUnauthorized: false },
});

const initializeDb = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users_table(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE CHECK (email = LOWER(email)),
  password TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer','admin'))
)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('car','bike','van','SUV')),
      registration_number TEXT NOT NULL UNIQUE,
      daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
      availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available','booked'))
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS booking(
      id SERIAL PRIMARY KEY,
      customer_id INT NOT NULL REFERENCES users_table(id) ON DELETE CASCADE,
      vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','cancelled','returned')),
      CONSTRAINT rent_dates_check CHECK (rent_end_date > rent_start_date)
    )`);

    console.log("Database initialized successfully!");
  } catch (error: any) {
    console.log("Database initialization failed:", error.message);
  }
};
export default initializeDb;
