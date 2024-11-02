import express from "express";
import { registerUser, loginUser, logoutUser, uploadJobSeekerInfo,uploadEmployerInfo, addUserSkillsByName, applyForJob, updateApplicationStatus, saveJob, getSavedJobs, getJobSeekerInfo, getEmployerInfo, getApplicantsByJob, getAppliedJobs } from "../controllers/user.controller.js";
import isAuthenticated  from "../utils/isAuth.js";
import { addCompanyFAQ, addOrUpdateJob,getAllJobs, getFAQsAndEmployerInfo, getJobsByEmployer } from "../controllers/jobs.controller.js";
import { addReviewJStoEmp, getEmployerReviews, updateReviewJStoEmp } from "../controllers/reviews.controller.js";

const router = express.Router();

// User authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/upload-job-seeker-info", uploadJobSeekerInfo);

router.post("/upload-employer-info", uploadEmployerInfo);
router.post("/add-or-update-job", addOrUpdateJob);
router.get("/jobs", getAllJobs);
router.post("/add-user-skills",addUserSkillsByName);
router.post("/apply-for-job", applyForJob);
router.put("/update-application-status", updateApplicationStatus);
router.post("/save-job",saveJob);
router.get("/saved-jobs/:user_id", getSavedJobs);
router.post("/review",  addReviewJStoEmp);
router.put("/review",  updateReviewJStoEmp);
router.get("/employer/:employer_id/reviews", getEmployerReviews);

router.post("/faqs", addCompanyFAQ);getFAQsAndEmployerInfo
router.get("/faqs-and-info/:employer_id", );

router.get("/job-seeker-info/:user_id", getJobSeekerInfo);
router.get("/employer-info/:user_id", getEmployerInfo);
router.get("/jobs/employer/:employer_id", getJobsByEmployer);
router.get("/applicants/job/:job_id", getApplicantsByJob);

router.get('/:user_id/applied-jobs', getAppliedJobs);




export default router;
