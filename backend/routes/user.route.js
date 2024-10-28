import express from "express";
import { registerUser, loginUser, logoutUser, uploadJobSeekerInfo,uploadEmployerInfo, addUserSkillsByName, applyForJob } from "../controllers/user.controller.js";
import isAuthenticated  from "../utils/isAuth.js";
import { addOrUpdateJob,getAllJobs } from "../controllers/jobs.controller.js";

const router = express.Router();

// User authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Job seeker info upload route
router.post("/upload-job-seeker-info",isAuthenticated, uploadJobSeekerInfo);

router.post("/upload-employer-info",isAuthenticated, uploadEmployerInfo);
router.post("/add-or-update-job", isAuthenticated,addOrUpdateJob);
router.get("/jobs", getAllJobs);
router.post("/add-user-skills", addUserSkillsByName);
router.post("/apply-for-job", applyForJob);


export default router;
