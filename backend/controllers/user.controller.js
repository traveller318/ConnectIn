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
    const { user_id, qualifications, work_experience, certifications, portfolio_url, resume_url } = req.body;

    // Validate required fields
    if (!user_id) {
        return res.status(400).json({ message: "User ID is required.", success: false });
    }

    try {
        // Check if the user is a Job Seeker
        const [user] = await con.query("SELECT * FROM user WHERE user_id = ? AND user_type = ?", [user_id, "Job Seeker"]);
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "User is not a Job Seeker or does not exist.", success: false });
        }

        // Check if job seeker info already exists for the user
        const [existingInfo] = await con.query("SELECT * FROM job_seeker_info WHERE user_id = ?", [user_id]);
        if (existingInfo && existingInfo.length > 0) {
            // Update existing record
            await con.query(
                `UPDATE job_seeker_info 
                 SET resume_url = ?, qualifications = ?, work_experience = ?, certifications = ?, portfolio_url = ? 
                 WHERE user_id = ?`,
                [resume_url, qualifications, work_experience, certifications, portfolio_url, user_id]
            );
            return res.status(200).json({ message: "Job seeker info updated successfully.", success: true });
        } else {
            // Insert new record
            await con.query(
                `INSERT INTO job_seeker_info (user_id, resume_url, qualifications, work_experience, certifications, portfolio_url) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [user_id, resume_url, qualifications, work_experience, certifications, portfolio_url]
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

export const addUserSkillsByName = async (req, res) => {
    const { user_id, skill_names } = req.body; // `skill_names` should be an array of skill names
    console.log(skill_names);
    
    // Validate required fields
    if (!user_id || !Array.isArray(skill_names) || skill_names.length === 0) {
        return res.status(400).json({ message: "User ID and an array of skill names are required.", success: false });
    }

    try {
        // Check if the user exists
        const [user] = await con.query("SELECT * FROM user WHERE user_id = ?", [user_id]);
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "User does not exist.", success: false });
        }

        // Retrieve skill IDs based on skill names
        const skillIdQuery = `
            SELECT skill_id FROM skills WHERE skill_name IN (?)
        `;
        const [skills] = await con.query(skillIdQuery, [skill_names]);

        if (skills.length === 0) {
            return res.status(400).json({ message: "No matching skills found.", success: false });
        }

        // Insert user skills into the user_skills table
        const skillInsertPromises = skills.map(skill =>
            con.query("INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)", [user_id, skill.skill_id])
        );

        // Execute all insert queries
        await Promise.all(skillInsertPromises);

        return res.status(201).json({ message: "User skills added successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const applyForJob = async (req, res) => {
    const { user_id, job_id, status } = req.body;

    // Validate required fields
    if (!user_id || !job_id) {
        return res.status(400).json({ message: "User ID and Job ID are required.", success: false });
    }

    try {
        // Check if the user exists
        const [user] = await con.query("SELECT * FROM user WHERE user_id = ?", [user_id]);
        if (user.length === 0) {
            return res.status(400).json({ message: "User does not exist.", success: false });
        }

        // Check if the job exists
        const [job] = await con.query("SELECT * FROM jobs WHERE job_id = ?", [job_id]);
        if (job.length === 0) {
            return res.status(400).json({ message: "Job does not exist.", success: false });
        }

        // Insert new application
        await con.query(
            `INSERT INTO applications (user_id, job_id, status) 
             VALUES (?, ?, ?)`,
            [user_id, job_id, status || 'Pending'] // Default to 'Pending' if no status is provided
        );

        return res.status(201).json({ message: "Job application submitted successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const updateApplicationStatus = async (req, res) => {
    const { user_id, job_id, status } = req.body;

    // Validate required fields
    if (!user_id || !job_id || !status) {
        return res.status(400).json({ message: "User ID, Job ID, and status are required.", success: false });
    }

    try {
        // Check if the application exists
        const [application] = await con.query(
            "SELECT * FROM applications WHERE user_id = ? AND job_id = ?",
            [user_id, job_id]
        );
        if (application.length === 0) {
            return res.status(400).json({ message: "Application does not exist.", success: false });
        }

        // Update the application status
        await con.query(
            "UPDATE applications SET status = ? WHERE user_id = ? AND job_id = ?",
            [status, user_id, job_id]
        );

        return res.status(200).json({ message: "Application status updated successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const saveJob = async (req, res) => {
    const { user_id, job_id } = req.body;

    // Validate required fields
    if (!user_id || !job_id) {
        return res.status(400).json({ message: "User ID and Job ID are required.", success: false });
    }

    try {
        // Check if the job is already saved by the user
        const [existing] = await con.query(
            "SELECT * FROM saved_jobs WHERE user_id = ? AND job_id = ?",
            [user_id, job_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Job is already saved.", success: false });
        }

        // Insert the saved job
        await con.query(
            "INSERT INTO saved_jobs (user_id, job_id) VALUES (?, ?)",
            [user_id, job_id]
        );

        return res.status(201).json({ message: "Job saved successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};


export const getSavedJobs = async (req, res) => {
    const { user_id } = req.params;

    // Validate user ID
    if (!user_id) {
        return res.status(400).json({ message: "User ID is required.", success: false });
    }

    try {
        // Query to retrieve saved jobs with job and employer details for the given user
        const [savedJobs] = await con.query(
            `SELECT jobs.job_id, jobs.job_title, jobs.job_description, jobs.requirements, 
                    jobs.salary_range, jobs.job_type, jobs.location, jobs.application_deadline, 
                    saved_jobs.saved_date,
                    (SELECT company_name FROM employer_info WHERE employer_info.user_id = jobs.employer_id) AS company_name,
                    (SELECT industry FROM employer_info WHERE employer_info.user_id = jobs.employer_id) AS industry,
                    (SELECT company_website FROM employer_info WHERE employer_info.user_id = jobs.employer_id) AS company_website
             FROM saved_jobs
             JOIN jobs ON saved_jobs.job_id = jobs.job_id
             WHERE saved_jobs.user_id = ?`,
            [user_id]
        );

        if (savedJobs.length === 0) {
            return res.status(404).json({ message: "No saved jobs found for this user.", success: false });
        }

        return res.status(200).json({ savedJobs, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};
