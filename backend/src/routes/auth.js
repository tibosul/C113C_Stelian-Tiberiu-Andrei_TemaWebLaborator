import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Check if email, username, or phone is available
router.post("/check-availability", async (req, res) => {
  try {
    const { email, username, phone } = req.body;
    let query = "";
    let params = [];
    
    const conditions = [];
    if (email) {
      conditions.push(`email = $${conditions.length + 1}`);
      params.push(email);
    }
    if (username) {
      conditions.push(`username = $${conditions.length + 1}`);
      params.push(username);
    }
    if (phone) {
      conditions.push(`phone = $${conditions.length + 1}`);
      params.push(phone);
    }

    if (conditions.length === 0) {
      return res.status(400).json({ error: "Email, username, or phone required" });
    }

    query = `select email, username, phone from Users where ${conditions.join(" or ")}`;
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.json({ available: true });
    }

    const taken = {};
    result.rows.forEach(row => {
      if (email && row.email === email) taken.email = true;
      if (username && row.username === username) taken.username = true;
      if (phone && row.phone === phone) taken.phone = true;
    });

    return res.json({ available: false, taken });
  } catch (err) {
    console.error("Availability check error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User registration endpoint
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("username")
      .isLength({ min: 3, max: 50 })
      .withMessage("Username must be between 3 and 50 characters long"),
    body("firstName")
      .isLength({ min: 1, max: 50 })
      .withMessage("First name must be between 1 and 50 characters long"),
    body("lastName")
      .isLength({ min: 1, max: 50 })
      .withMessage("Last name must be between 1 and 50 characters long"),
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required"),
    body("country_code")
      .notEmpty()
      .withMessage("Resident country is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        email,
        password,
        username,
        firstName,
        lastName,
        phone,
        country_code,
      } = req.body;

      const existing = await pool.query(
        `select email, username, phone from Users where email = $1 or username = $2 or phone = $3`,
        [email, username, phone],
      );

      if (existing.rows.length > 0) {
        const taken = {};
        existing.rows.forEach(row => {
          if (row.email === email) taken.email = true;
          if (row.username === username) taken.username = true;
          if (row.phone === phone) taken.phone = true;
        });
        return res
          .status(409)
          .json({ 
            error: "One or more identifiers already in use", 
            taken 
          });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const result = await pool.query(
        `insert into Users (email, password_hash, username, first_name, last_name, phone, country_code)
         values ($1, $2, $3, $4, $5, $6, $7)
         returning id, email, username, first_name, last_name, phone, country_code, tier, is_admin, created_at`,
        [
          email,
          passwordHash,
          username,
          firstName,
          lastName,
          phone,
          country_code,
        ],
      );

      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username, is_admin: user.is_admin },
        JWT_SECRET,
        { expiresIn: "24h" },
      );

      res.status(201).json({ token, user });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// User login endpoint
router.post(
  "/login",
  [
    body("email_or_username")
      .notEmpty()
      .withMessage("Email or username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email_or_username, password } = req.body;

      const result = await pool.query(
        `select id, email, username, first_name, last_name, phone, country_code, tier, kyc_verified, is_active, is_admin, password_hash from Users where email = $1 or username = $1`,
        [email_or_username],
      );

      if (result.rows.length === 0) {
        return res
          .status(401)
          .json({ error: "Invalid email/username or password" });
      }

      const dbUser = result.rows[0];
      if (!dbUser.is_active) {
        return res
          .status(403)
          .json({ error: "Account is inactive. Please contact support." });
      }

      const validPassword = await bcrypt.compare(
        password,
        dbUser.password_hash,
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ error: "Invalid email/username or password" });
      }

      await pool.query(`update Users set last_login_at = now() where id = $1`, [
        dbUser.id,
      ]);

      const token = jwt.sign(
        { id: dbUser.id, email: dbUser.email, username: dbUser.username, is_admin: dbUser.is_admin },
        JWT_SECRET,
        { expiresIn: "24h" },
      );

      const { password_hash, ...userWithoutPassword } = dbUser;
      res.json({ token, user: userWithoutPassword });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Get current user endpoint
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `select id, email, username, first_name, last_name, phone, country_code,
      tier, kyc_verified, two_fa_enabled, cash_balance, buying_power, alpaca_account_id, is_admin, created_at, last_login_at
      from Users where id = $1`,
      [req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile endpoint
router.put(
  "/update-profile",
  authMiddleware,
  [
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("username").optional().isLength({ min: 3, max: 50 }).withMessage("Username too short/long"),
    body("firstName").optional().isLength({ min: 1, max: 50 }),
    body("lastName").optional().isLength({ min: 1, max: 50 }),
    body("phone").optional().notEmpty(),
    body("country_code").optional().notEmpty(),
    body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, username, firstName, lastName, phone, country_code, password } = req.body;
      const userId = req.user.id;

      // Check for availability if email or username is changing
      if (email || username || phone) {
        const checkQuery = `
          SELECT id, email, username, phone FROM Users 
          WHERE (email = $1 OR username = $2 OR phone = $3) AND id != $4
        `;
        const existing = await pool.query(checkQuery, [email || '', username || '', phone || '', userId]);
        
        if (existing.rows.length > 0) {
          const taken = {};
          existing.rows.forEach(row => {
            if (email && row.email === email) taken.email = true;
            if (username && row.username === username) taken.username = true;
            if (phone && row.phone === phone) taken.phone = true;
          });
          return res.status(409).json({ error: "Identifier already in use", taken });
        }
      }

      // Build update query dynamically
      const updates = [];
      const params = [];
      
      if (email) { updates.push(`email = $${params.length + 1}`); params.push(email); }
      if (username) { updates.push(`username = $${params.length + 1}`); params.push(username); }
      if (firstName) { updates.push(`first_name = $${params.length + 1}`); params.push(firstName); }
      if (lastName) { updates.push(`last_name = $${params.length + 1}`); params.push(lastName); }
      if (phone) { updates.push(`phone = $${params.length + 1}`); params.push(phone); }
      if (country_code) { updates.push(`country_code = $${params.length + 1}`); params.push(country_code); }
      
      if (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        updates.push(`password_hash = $${params.length + 1}`);
        params.push(passwordHash);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields provided for update" });
      }

      params.push(userId);
      const updateQuery = `
        UPDATE Users SET ${updates.join(", ")}, updated_at = NOW()
        WHERE id = $${params.length}
        RETURNING id, email, username, first_name, last_name, phone, country_code, tier, created_at
      `;

      const result = await pool.query(updateQuery, params);
      res.json({ user: result.rows[0] });

    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
