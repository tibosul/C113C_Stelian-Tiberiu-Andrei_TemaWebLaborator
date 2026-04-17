import pool from "../backend/src/config/db.js";

async function checkSchema() {
  try {
    const res = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users';
    `);
    console.log("Current Users table schema:");
    console.table(res.rows);

    const constraints = await pool.query(`
      SELECT conname, pg_get_constraintdef(c.oid)
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE c.conrelid = 'users'::regclass;
    `);
    console.log("Current Users table constraints:");
    console.table(constraints.rows);

    process.exit(0);
  } catch (err) {
    console.error("Error checking schema:", err);
    process.exit(1);
  }
}

checkSchema();
