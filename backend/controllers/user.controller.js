import bcrypt from "bcryptjs";
import con from "../db/db.js";

export const registerUser = async (req, res) => {
    const { 
        first_name, last_name, email, password, phone_number, date_of_birth, gender, 
        address, city, state, country, zip_code, profile_picture_url, user_type 
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password || !user_type) {
        return res.status(400).json({ message: "First name, last name, email, password, and user type are required.", success: false });
    }

    try {
        // Check if the email already exists
        const [existingUser] = await con.query("SELECT email FROM user WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already in use.", success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert new user
        await con.query(
            `INSERT INTO user 
            (first_name, last_name, email, password, phone_number, date_of_birth, gender, 
            address, city, state, country, zip_code, profile_picture_url, user_type, registration_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`, 
            [first_name, last_name, email, passwordHash, phone_number, date_of_birth, gender, 
            address, city, state, country, zip_code, profile_picture_url, user_type]
        );

        return res.status(201).json({ message: "User created successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};
