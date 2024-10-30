import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { CalendarIcon, PhoneIcon, MapPinIcon, PencilIcon, BookmarkIcon, LinkedinIcon, TwitterIcon, GithubIcon, FileTextIcon, StarIcon, BriefcaseIcon, ClipboardIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function JobSeekerProfile() {
  const location = useLocation();
  const user = location.state; // Get user from location state
  const [jobSeekerInfo, setJobSeekerInfo] = useState(null); // State to store additional user info

  useEffect(() => {
    const fetchJobSeekerInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/job-seeker-info/${user.user_id}`);
        if (response.data.success) {
          setJobSeekerInfo(response.data.jobSeekerInfo);
        } else {
          console.error('Failed to fetch job seeker information');
        }
      } catch (error) {
        console.error('Error fetching job seeker information:', error);
      }
    };

    if (user?.user_id) {
      fetchJobSeekerInfo();
    }
  }, [user?.user_id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleViewSavedJobs = () => {
    // Navigate to saved jobs page
    // navigate("/saved-jobs");
  }

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">ConnectIn</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-32"></div>
          <CardContent className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <Avatar className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={`/placeholder.svg?height=150&width=150`} alt={`${user.first_name} ${user.last_name}`} />
              <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
            </Avatar>

            <h1 className="text-3xl font-bold text-gray-900 mt-4">{user.first_name} {user.last_name}</h1>
            <p className="text-gray-500 mt-1">{user.email}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <PhoneIcon className="w-4 h-4 mr-2" />
                {user.phone_number}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                🎂 {formatDate(user.date_of_birth)}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                ♀️ {user.gender}
              </Badge>
            </div>

            <div className="mt-6 text-gray-600">
              <MapPinIcon className="w-5 h-5 inline-block mr-2 text-gray-400" />
              {`${user.address}, ${user.city}, ${user.state} ${user.zip_code}, ${user.country}`}
            </div>

            <Badge className="mt-6 text-lg" variant="outline">{user.user_type}</Badge>

            <div className="mt-4 text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 inline-block mr-2" />
              Joined on: {formatDate(user.registration_date)}
            </div>

            {/* Additional job seeker information section */}
            {jobSeekerInfo && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge variant="outline" className="flex items-center px-3 py-1 text-sm">
                    <ClipboardIcon className="w-4 h-4 mr-2" />
                    {jobSeekerInfo.qualifications}
                  </Badge>
                  <Badge variant="outline" className="flex items-center px-3 py-1 text-sm">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    {jobSeekerInfo.work_experience}
                  </Badge>
                  <Badge variant="outline" className="flex items-center px-3 py-1 text-sm">
                    <StarIcon className="w-4 h-4 mr-2" />
                    {jobSeekerInfo.certifications}
                  </Badge>
                  <Badge variant="outline" className="flex items-center px-3 py-1 text-sm">
                    <FileTextIcon className="w-4 h-4 mr-2" />
                    <a href={jobSeekerInfo.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Resume</a>
                  </Badge>
                  <Badge variant="outline" className="flex items-center px-3 py-1 text-sm">
                    <FileTextIcon className="w-4 h-4 mr-2" />
                    <a href={jobSeekerInfo.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Portfolio</a>
                  </Badge>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <Button className="w-full sm:w-auto">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Saved Jobs</h2>
            <p className="text-gray-600 mb-6">Access your saved job listings and continue your job search journey.</p>
            <Button onClick={handleViewSavedJobs} className="w-full sm:w-auto">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              View Saved Jobs
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About ConnectIn</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQs</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect with Us</h3>
              <div className="flex space-x-6 mt-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <TwitterIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <GithubIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; {new Date().getFullYear()} ConnectIn, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
