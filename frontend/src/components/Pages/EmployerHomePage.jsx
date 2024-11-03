import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  Briefcase,
  Users,
  Menu,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export default function EmployerHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const employerId = user?.user_id;
  const mainRef = useRef(null);
  console.log(user);

  const navigateToProfile = () => {
    navigate("/employer-profile", { state:  user  });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]); // Holds posted jobs
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salaryRange: "",
    jobType: "",
    location: "",
    applicationDeadline: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/jobs/employer/${employerId}`
        );
        console.log(response.data.jobs);

        setJobs(response.data.jobs); // Accessing the jobs array correctly
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (employerId) {
      fetchJobs();
    }
  }, [employerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewApplicants = (jobId) => {
    navigate("/view-applicants", { state: { job_id: jobId,user } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/add-or-update-job",
        {
          employer_id: employerId,
          job_title: newJob.title,
          job_description: newJob.description,
          requirements: newJob.requirements,
          salary_range: newJob.salaryRange,
          job_type: newJob.jobType,
          location: newJob.location,
          application_deadline: newJob.applicationDeadline,
        }
      );

      if (response.status === 201) {
        // Create a new job object based on the API response
        const newJobPosted = {
          job_id: response.data.job_id, // Assuming your API returns the new job ID
          job_title: newJob.title,
          job_description: newJob.description,
          requirements: newJob.requirements, // Ensure this field is included if needed
          salary_range: newJob.salaryRange,
          job_type: newJob.jobType,
          location: newJob.location,
          application_deadline: newJob.applicationDeadline,
        };
        setIsModalOpen(false);
        // Update jobs state to include the newly posted job
        setJobs((prevJobs) => [...prevJobs, newJobPosted]);

        // Close the modal and reset the form
        // setIsModalOpen(false);
        setNewJob({
          title: "",
          description: "",
          requirements: "",
          salaryRange: "",
          jobType: "",
          location: "",
          applicationDeadline: "",
        });
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Responsive Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ConnectIn
                </span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button variant="ghost" onClick={scrollToMain}>
                Posted Jobs
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-4"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Post Job
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Post a New Job</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      name="title"
                      placeholder="Job Title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea
                      name="description"
                      placeholder="Job Description"
                      value={newJob.description}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea
                      name="requirements"
                      placeholder="Requirements"
                      value={newJob.requirements}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="salaryRange"
                      placeholder="Salary Range($80,000 - $120,000 per year)"
                      value={newJob.salaryRange}
                      onChange={handleInputChange}
                      required
                    />
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("jobType", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      name="location"
                      placeholder="Location"
                      value={newJob.location}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="applicationDeadline"
                      type="date"
                      value={newJob.applicationDeadline}
                      onChange={handleInputChange}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Avatar className="ml-4" onClick={navigateToProfile}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center sm:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Button
                variant="ghost"
                onClick={scrollToMain}
                className="w-full justify-start"
              >
                Posted Jobs
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    Post Job
                  </Button>
                </DialogTrigger>
                {/* Dialog content same as above */}
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Post a New Job</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      name="title"
                      placeholder="Job Title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea
                      name="description"
                      placeholder="Job Description"
                      value={newJob.description}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea
                      name="requirements"
                      placeholder="Requirements"
                      value={newJob.requirements}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="salaryRange"
                      placeholder="Salary Range($80,000 - $120,000 per year)"
                      value={newJob.salaryRange}
                      onChange={handleInputChange}
                      required
                    />
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("jobType", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      name="location"
                      placeholder="Location"
                      value={newJob.location}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="applicationDeadline"
                      type="date"
                      value={newJob.applicationDeadline}
                      onChange={handleInputChange}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={navigateToProfile}
              >
                Profile
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main
        ref={mainRef}
        className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <h1 className="text-2xl font-semibold mb-6">Posted Jobs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.job_id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.job_title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm font-semibold mb-2">{job.location}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {job.job_description}
                </p>
                <p className="text-sm mb-2">{job.jobType}</p>
                <p className="text-sm  mb-2">{job.requirements}</p>
                <p className="text-sm mb-2">{job.salary_range}</p>
                <p className="text-sm mt-2">
                  Deadline:{" "}
                  {job.application_deadline
                    ? format(new Date(job.application_deadline), "PPP")
                    : "N/A"}
                </p>
              </CardContent>

              <CardFooter>
              <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleViewApplicants(job.job_id)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Applicants
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">ConnectIn</h2>
              <p className="text-gray-300">
                Connecting professionals worldwide
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Post a Job
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Talent Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Career Advice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Upload Resume
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} All rights reserved. Designed by traveller31
          </p>
        </div>
      </footer>
    </div>
  );
}
