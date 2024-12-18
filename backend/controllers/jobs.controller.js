import con from "../db/db.js";

export const addOrUpdateJob = async (req, res) => {
    const { job_id, employer_id, job_title, job_description, requirements, salary_range, job_type, location, application_deadline } = req.body;

    // Validate required fields
    if (!employer_id || !job_title || !job_description || !job_type) {
        return res.status(400).json({ message: "Employer ID, job title, job description, and job type are required.", success: false });
    }

    try {
        // Check if the user is an Employer
        const [employer] = await con.query("SELECT * FROM user WHERE user_id = ? AND user_type = ?", [employer_id, "Employer"]);
        if (employer.length === 0) {
            return res.status(400).json({ message: "User is not an Employer or does not exist.", success: false });
        }

        if (job_id) {
            // Update existing job
            const [existingJob] = await con.query("SELECT * FROM jobs WHERE job_id = ?", [job_id]);
            if (existingJob.length === 0) {
                return res.status(404).json({ message: "Job not found.", success: false });
            }

            // Update the job details
            await con.query(
                `UPDATE jobs SET job_title = ?, job_description = ?, requirements = ?, salary_range = ?, 
                job_type = ?, location = ?, application_deadline = ?, updated_at = CURRENT_TIMESTAMP WHERE job_id = ?`,
                [job_title, job_description, requirements, salary_range, job_type, location, application_deadline, job_id]
            );

            return res.status(200).json({ message: "Job updated successfully.", success: true });
        } else {
            // Insert new job
            await con.query(
                `INSERT INTO jobs (employer_id, job_title, job_description, requirements, salary_range, job_type, location, application_deadline) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [employer_id, job_title, job_description, requirements, salary_range, job_type, location, application_deadline]
            );

            return res.status(201).json({ message: "Job added successfully.", success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        // Fetch all jobs along with employer information
        const [jobs] = await con.query(
            `SELECT * FROM jobs JOIN employer_info ON jobs.employer_id = employer_info.user_id;`
        );

        // Check if there are any jobs
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found.", success: false });
        }

        return res.status(200).json({ message: "Jobs retrieved successfully.", success: true, data: jobs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};



export const addCompanyFAQ = async (req, res) => {
    const { employer_id, question, answer } = req.body;

    // Validate required fields
    if (!employer_id || !question || !answer) {
        return res.status(400).json({ message: "Employer ID, question, and answer are required.", success: false });
    }

    try {
        // Insert new FAQ into the company_faqs table
        await con.query(
            `INSERT INTO company_faqs (employer_id, question, answer) VALUES (?, ?, ?)`,
            [employer_id, question, answer]
        );

        return res.status(201).json({ message: "FAQ added successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const getFAQsAndEmployerInfo = async (req, res) => {
    const { employer_id } = req.params;

    try {
        const [results] = await con.query(`
            SELECT 
                ef.*, 
                cf.question, 
                cf.answer 
            FROM 
                employer_info ef
            LEFT JOIN 
                company_faqs cf ON ef.user_id = cf.employer_id
            WHERE 
                ef.user_id = ?`, [employer_id]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "No FAQs or employer information found for this employer.", success: false });
        }

        return res.status(200).json({ results, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const getJobsByEmployer = async (req, res) => {
    const { employer_id } = req.params;

    try {
        // Fetch jobs posted by the employer
        const [jobs] = await con.query("SELECT * FROM jobs WHERE employer_id = ?", [employer_id]);

        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this employer", success: false });
        }

        return res.status(200).json({ message: "Jobs retrieved successfully", success: true, jobs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};




  