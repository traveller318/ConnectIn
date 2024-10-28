import bcrypt from "bcryptjs";
import con from "../db/db.js";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req, res) => {
    const { email, password, user_type } = req.body;

    // Validate input
    if (!email || !password || !user_type) {
        return res.status(400).json({ message: "Email, password, and user type are required.", success: false });
    }

    // Validate user_type
    const validUserTypes = ["Job Seeker", "Employer"];
    if (!validUserTypes.includes(user_type)) {
        return res.status(400).json({ message: "Invalid user type.", success: false });
    }

    try {
        // Check if the user exists
        const [user] = await con.query("SELECT * FROM user WHERE email = ? AND user_type = ?", [email, user_type]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Invalid email, password, or user type.", success: false });
        }

        const foundUser = user[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password.", success: false });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: foundUser.user_id, email: foundUser.email, user_type: foundUser.user_type },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            message: "Login successful.",
            success: true,
            user: {
                user_id: foundUser.user_id,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
                email: foundUser.email,
                user_type: foundUser.user_type
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const logoutUser = (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict"
        });

        return res.status(200).json({ message: "Logout successful.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const uploadJobSeekerInfo = async (req, res) => {
    const { user_id, qualifications, skills, work_experience, certifications, portfolio_url, resume_url } = req.body;

    // Validate required fields
    if (!user_id) {
        return res.status(400).json({ message: "User ID is required.", success: false });
    }

    try {
        // Check if the user is a Job Seeker
        const [user] = await con.query("SELECT * FROM user WHERE user_id = ? AND user_type = ?", [user_id, "Job Seeker"]);
        if (user.length === 0) {
            return res.status(400).json({ message: "User is not a Job Seeker or does not exist.", success: false });
        }

        // Check if job seeker info already exists for the user
        const [existingInfo] = await con.query("SELECT * FROM job_seeker_info WHERE user_id = ?", [user_id]);
        if (existingInfo.length > 0) {
            // Update existing record
            await con.query(
                `UPDATE job_seeker_info 
                 SET resume_url = ?, qualifications = ?, skills = ?, work_experience = ?, certifications = ?, portfolio_url = ? 
                 WHERE user_id = ?`,
                [resume_url, qualifications, skills, work_experience, certifications, portfolio_url, user_id]
            );
            return res.status(200).json({ message: "Job seeker info updated successfully.", success: true });
        } else {
            // Insert new record
            await con.query(
                `INSERT INTO job_seeker_info (user_id, resume_url, qualifications, skills, work_experience, certifications, portfolio_url) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [user_id, resume_url, qualifications, skills, work_experience, certifications, portfolio_url]
            );
            return res.status(201).json({ message: "Job seeker info uploaded successfully.", success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const uploadEmployerInfo = async (req, res) => {
    const { user_id, company_name, company_website, industry, number_of_employees, company_description, headquarters_location } = req.body;

    // Validate required fields
    if (!user_id || !company_name) {
        return res.status(400).json({ message: "User ID and company name are required.", success: false });
    }

    try {
        // Check if the user is an Employer
        const [user] = await con.query("SELECT * FROM user WHERE user_id = ? AND user_type = ?", [user_id, "Employer"]);
        if (user.length === 0) {
            return res.status(400).json({ message: "User is not an Employer or does not exist.", success: false });
        }

        // Check if employer info already exists for the user
        const [existingInfo] = await con.query("SELECT * FROM employer_info WHERE user_id = ?", [user_id]);
        if (existingInfo.length > 0) {
            // Update existing record
            await con.query(
                `UPDATE employer_info 
                 SET company_name = ?, company_website = ?, industry = ?, number_of_employees = ?, company_description = ?, headquarters_location = ? 
                 WHERE user_id = ?`,
                [company_name, company_website, industry, number_of_employees, company_description, headquarters_location, user_id]
            );
            return res.status(200).json({ message: "Employer info updated successfully.", success: true });
        } else {
            // Insert new record
            await con.query(
                `INSERT INTO employer_info (user_id, company_name, company_website, industry, number_of_employees, company_description, headquarters_location) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [user_id, company_name, company_website, industry, number_of_employees, company_description, headquarters_location]
            );
            return res.status(201).json({ message: "Employer info uploaded successfully.", success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

