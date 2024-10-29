import express from "express";
import { registerUser, loginUser, logoutUser, uploadJobSeekerInfo,uploadEmployerInfo, addUserSkillsByName, applyForJob, updateApplicationStatus, saveJob, getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated  from "../utils/isAuth.js";
import { addCompanyFAQ, addJobPostingCategories, addOrUpdateJob,getAllJobs, getFAQsAndEmployerInfo, getJobsByCategory } from "../controllers/jobs.controller.js";
import { addReviewJStoEmp, getEmployerReviews, updateReviewJStoEmp } from "../controllers/reviews.controller.js";

const router = express.Router();

// User authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/upload-job-seeker-info",isAuthenticated, uploadJobSeekerInfo);

router.post("/upload-employer-info",isAuthenticated, uploadEmployerInfo);
router.post("/add-or-update-job", isAuthenticated,addOrUpdateJob);
router.get("/jobs", getAllJobs);
router.post("/add-user-skills", isAuthenticated,addUserSkillsByName);
router.post("/apply-for-job", isAuthenticated,applyForJob);
router.put("/update-application-status",isAuthenticated, updateApplicationStatus);
router.post("/save-job",isAuthenticated ,saveJob);
router.get("/saved-jobs/:user_id", getSavedJobs);
router.post("/review", isAuthenticated, addReviewJStoEmp);
router.put("/review", isAuthenticated, updateReviewJStoEmp);
router.get("/employer/:employer_id/reviews", getEmployerReviews);

router.post("/add-job-posting-categories", addJobPostingCategories);
router.get("/jobs/category/:category_id", getJobsByCategory);
router.post("/faqs", addCompanyFAQ);
router.get("/faqs-and-info/:employer_id", getFAQsAndEmployerInfo);


export default router;
