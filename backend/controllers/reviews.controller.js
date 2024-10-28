import con from "../db/db.js";

export const addReviewJStoEmp = async (req, res) => {
    const { user_id, employer_id, rating, review_text } = req.body;

    // Validate required fields
    if (!user_id || !employer_id || !rating) {
        return res.status(400).json({ message: "User ID, Employer ID, and rating are required.", success: false });
    }

    try {
        // Insert the new review into the user_reviews table
        await con.query(
            `INSERT INTO user_reviews (user_id, employer_id, rating, review_text) 
             VALUES (?, ?, ?, ?)`,
            [user_id, employer_id, rating, review_text]
        );
        return res.status(201).json({ message: "Review added successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const updateReviewJStoEmp = async (req, res) => {
    const { user_id, employer_id, rating, review_text } = req.body;

    // Validate required fields
    if (!user_id || !employer_id) {
        return res.status(400).json({ message: "User ID and Employer ID are required.", success: false });
    }

    try {
        // Check if the review exists
        const [existingReview] = await con.query("SELECT * FROM user_reviews WHERE user_id = ? AND employer_id = ?", [user_id, employer_id]);
        if (existingReview.length === 0) {
            return res.status(404).json({ message: "Review not found.", success: false });
        }

        // Update the review
        await con.query(
            `UPDATE user_reviews 
             SET rating = ?, review_text = ? 
             WHERE user_id = ? AND employer_id = ?`,
            [rating, review_text, user_id, employer_id]
        );

        return res.status(200).json({ message: "Review updated successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export const getEmployerReviews = async (req, res) => {
    const { employer_id } = req.params; // Get the employer_id from the route parameters

    // Validate the employer_id
    if (!employer_id) {
        return res.status(400).json({ message: "Employer ID is required.", success: false });
    }

    try {
        // Fetch reviews for the given employer_id
        const [reviews] = await con.query("SELECT * FROM user_reviews WHERE employer_id = ?", [employer_id]);

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this employer.", success: false });
        }

        return res.status(200).json({ reviews, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};
