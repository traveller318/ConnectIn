import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import ReactSlider from "react-slider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import avatar_img from "../../assets/avatarImg.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Briefcase,
  BookOpen,
  BookmarkPlus,
  Search,
  MapPin,
  DollarSign,
  Calendar,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Menu,
} from "lucide-react";
import logo from "../../assets/logo/logo.png";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function JobSeekerHomePage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the location object
  const user = location.state;
  const jobListingsRef = useRef(null);
  const [appliedJobs, setAppliedJobs] = useState([]); // State to hold applied job IDs
  const [savedJobs, setSavedJobs] = useState([]); // State to hold saved job IDs
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [salaryRange, setSalaryRange] = useState([50000, 200000]);
  const [companyFilter, setCompanyFilter] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobListings, setJobListings] = useState([]); // State to hold job listings
  const [filteredJobListings, setFilteredJobListings] = useState([]); // State to hold filtered job listings

  useEffect(() => {
    // Fetch job listings from API using Axios
    const fetchJobListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/jobs"
        );
        const data = response.data;

        if (data.success) {
          // Map the API data to match your component's expected format
          const formattedJobs = data.data.map((job) => ({
            id: job.job_id, // Match your component's id
            title: job.job_title,
            company: job.company_name,
            location: job.location,
            salary: job.salary_range,
            deadline: new Date(job.application_deadline).toLocaleDateString(), // Format the date
            category: job.category, // Add category field
          }));
          console.log(user);

          setJobListings(formattedJobs); // Update state with formatted job listings
          setFilteredJobListings(formattedJobs); // Initialize filtered job listings
        }
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobListings();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchUserJobStatus = async () => {
      try {
        // Fetch saved jobs
        const savedResponse = await axios.get(
          `http://localhost:3000/api/users/saved-jobs/${user.user_id}`
        );
        console.log(savedResponse);

        if (savedResponse.data.success) {
          const savedJobIds = savedResponse.data.savedJobs.map(
            (job) => job.job_id
          );
          setSavedJobs(savedJobIds);
        } else {
          console.log(savedResponse.data.message); // Log the message if no saved jobs found
          setSavedJobs([]); // Set saved jobs to an empty array
        }

        // Fetch applied jobs
        const appliedResponse = await axios.get(
          `http://localhost:3000/api/users/${user.user_id}/applied-jobs`
        );
        console.log(appliedResponse);

        if (appliedResponse.data.success) {
          const appliedJobIds = appliedResponse.data.appliedJobs.map(
            (job) => job.job_id
          );
          setAppliedJobs(appliedJobIds);
        } else {
          console.log(appliedResponse.data.message); // Log the message if no applied jobs found
          setAppliedJobs([]); // Set applied jobs to an empty array
        }
      } catch (error) {
        console.error("Error fetching job status:", error);
      }
    };

    fetchUserJobStatus();
  }, [user.user_id]);

  const scrollToJobListings = () => {
    if (jobListingsRef.current) {
      jobListingsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/apply-for-job",
        {
          user_id: user.user_id, // Use the user ID from state
          job_id: jobId,
          status: "Pending",
        }
      );

      if (response.data.success) {
        setAppliedJobs([...appliedJobs, jobId]); // Mark job as applied
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchTerm);
    console.log(searchTerm, category, salaryRange, companyFilter);

    // Filter the job listings based on search term, salary range, and category
    const filteredJobs = jobListings.filter((job) => {
      const isTitleMatch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isCategoryMatch = category ? job.category === category : true;
      const isSalaryMatch =
        job.salary >= salaryRange[0] && job.salary <= salaryRange[1];
      return isTitleMatch || isCategoryMatch || isSalaryMatch;
    });
    console.log(filteredJobs);

    setFilteredJobListings(filteredJobs); // Update filtered job listings
  };

  const handleSaveJob = async (jobId) => {
    try {
      // Check if job is already saved
      if (savedJobs.includes(jobId)) {
        // Remove job from saved jobs
        setSavedJobs(savedJobs.filter((id) => id !== jobId));
      } else {
        // Save job via API call
        const response = await axios.post(
          "http://localhost:3000/api/users/save-job",
          {
            user_id: user.user_id, // Use user ID from state
            job_id: jobId,
          }
        );

        // Only add to saved jobs if API call is successful
        if (response.data.success) {
          setSavedJobs([...savedJobs, jobId]); // Update saved jobs
        }
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={logo}
                alt="ConnectIn Logo"
                className="h-10 w-auto mr-4"
              />
              <Input
                type="search"
                placeholder="Search jobs, skills, companies..."
                className="w-64 hidden md:block"
              />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={scrollToJobListings}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Jobs
              </Button>
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={() => navigate("/articles")} // Navigate to /articles
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Articles
              </Button>
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={() => navigate("/saved-jobs", { state: user })}
              >
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Saved Jobs
              </Button>
              <Avatar
                onClick={() => navigate("/job-seeker-profile", { state: user })} // Navigate on click
                className="cursor-pointer" // Optional: Add cursor pointer for better UX
              >
                <AvatarImage
                  src={avatar_img}
                  alt="User"
                  className="w-full h-full object-contain rounded-full"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              <Input
                type="search"
                placeholder="Search jobs, skills, companies..."
                className="w-full mb-2"
              />
              <Button
                variant="ghost"
                className="flex items-center w-full justify-start"
                onClick={() => {
                  scrollToJobListings();
                  // setMobileMenuOpen(false); // Close the mobile menu
                }}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Jobs
              </Button>
              <Button
                variant="ghost"
                className="flex items-center w-full justify-start"
                onClick={() => navigate("/articles")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Articles
              </Button>
              <Button
                variant="ghost"
                className="flex items-center w-full justify-start"
                onClick={() => navigate("/saved-jobs", { state: user })}
              >
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Saved Jobs
              </Button>
              <Button
                variant="ghost"
                className="flex items-center w-full justify-start p-2 text-left text-gray-800 hover:bg-gray-200 transition duration-150 ease-in-out"
                onClick={() => navigate("/job-seeker-profile", { state: user })} // Using the navigate function
              >
                <Avatar>
                  <AvatarImage
                    src={avatar_img}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium">Your Profile</span>
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Find Your Dream Job
        </h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="flex items-center space-x-4 mb-4"
          >
            <Input
              type="search"
              placeholder="Job title or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Salary Range
              </label>
              <ReactSlider
                className="horizontal-slider mt-1"
                trackClassName="track"
                handleClassName="handle"
                min={50000}
                max={200000}
                step={10000}
                value={salaryRange}
                onChange={setSalaryRange}
                renderTrack={(props) => {
                  const { key, ...restProps } = props; // Destructure to separate the key prop
                  return <div key={key} {...restProps} className="track" />;
                }}
                renderThumb={(props) => {
                  const { key, ...restProps } = props; // Destructure to separate the key prop
                  return <div key={key} {...restProps} className="handle" />;
                }}
              />
              <div className="text-sm text-gray-500 mt-2">
                ${salaryRange[0].toLocaleString()} - $
                {salaryRange[1].toLocaleString()}
              </div>
            </div>

            <Input
              type="text"
              placeholder="Filter by company"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Job Listings Carousel */}
        <div
          ref={jobListingsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredJobListings.length > 0 ? (
            filteredJobListings.map((job) => (
              <Card
                key={job.id}
                className="transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Deadline: {job.deadline}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      className={`flex-1 `}
                      onClick={() => handleSaveJob(job.id)}
                      disabled={savedJobs.includes(job.id)}
                    >
                      {savedJobs.includes(job.id) ? "Saved" : "Save Job"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleApplyJob(job.id)}
                      disabled={appliedJobs.includes(job.id)} // Disable if job is applied
                    >
                      {appliedJobs.includes(job.id) ? "Applied" : "Apply Job"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No jobs available for your search criteria.
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ConnectIn</h3>
              <p>Connecting you to your next opportunity.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5" />
                <Linkedin className="h-5 w-5" />
                <Facebook className="h-5 w-5" />
                <Instagram className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: support@connectin.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
