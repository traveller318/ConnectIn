import img1 from "../../assets/img1.jpg";
import google_logo from "../../assets/company_logos/Google-Logo.png";
import nvidia_logo from "../../assets/company_logos/Nvidia-Logo.png";
import blackrock_logo from "../../assets/company_logos/BlackRock-Logo.png";
import microsoft_logo from "../../assets/company_logos/Microsoft-Logo.png";
import apple_logo from "../../assets/company_logos/Apple-Logo.png";
import meta_logo from "../../assets/company_logos/Meta-Logo.png";
import amazon_logo from "../../assets/company_logos/Amazon-Logo.png";
import human1 from "../../assets/human_imgs/human1.jpg";
import human2 from "../../assets/human_imgs/human2.jpg";
import article_img1 from "../../assets/article_imgs/image1.jpg";
import article_img2 from "../../assets/article_imgs/image2.png";
import article_img3 from "../../assets/article_imgs/image3.jpg";

import React from "react";
import {
  Search,
  Briefcase,
  Building2,
  Users,
  BookOpen,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const jobList = [
    {
      title: "Software Engineer",
      company: "BlackRock",
      salary: "$90,000 - $130,000",
      logo: blackrock_logo,
      bgColor: "bg-gray-200", // Example color for BlackRock logo
    },
    {
      title: "Product Manager",
      company: "Google",
      salary: "$120,000 - $150,000",
      logo: google_logo,
      bgColor: "bg-black", // Black background for Google logo
    },
    {
      title: "Data Scientist",
      company: "NVIDIA",
      salary: "$100,000 - $140,000",
      logo: nvidia_logo,
      bgColor: "bg-green-200", // Example color for NVIDIA logo
    },
  ];

  const companies = [
    { name: "Apple", logo: apple_logo, bgColor: "bg-pink-200" },
    { name: "Amazon", logo: amazon_logo, bgColor: "bg-yellow-200" },
    { name: "Microsoft", logo: microsoft_logo, bgColor: "bg-blue-200" },
    { name: "Meta", logo: meta_logo, bgColor: "bg-purple-200" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-blue-600">ConnectIn</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#job-search" className="text-gray-600 hover:text-blue-600">
              Find Jobs
            </a>
            <a href="#companies" className="text-gray-600 hover:text-blue-600">
              Companies
            </a>
            <a href="#advices" className="text-gray-600 hover:text-blue-600">
              Career Advice
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="bg-white text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight">
            Discover Your Next Career Move
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Connecting talent with opportunity, everywhere. Find your dream job
            or hire the best talent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                Find Jobs
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                Post a Job
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-12 px-4 shadow-md" id="job-search">
        <div className="max-w-5xl mx-auto">
          <form className="flex flex-wrap gap-4">
            <div className="flex-grow">
              <label htmlFor="job-search" className="sr-only">
                Search jobs
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="job-search"
                  type="text"
                  placeholder="Job Title or Skills"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex-grow">
              <label htmlFor="location-search" className="sr-only">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location-search"
                  type="text"
                  placeholder="Location"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
            >
              Search Jobs
            </button>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Full-time</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Part-time</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Remote</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Contract</span>
            </label>
          </div>
        </div>
      </section>

      {/* Trending Jobs & Featured Companies */}
      <section className="py-16 px-4" id="companies">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Trending Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobList.map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between"
              >
                {/* Avatar logo with conditional background color */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${job.bgColor}`} // Increased size from w-14 h-14 to w-20 h-20
                >
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 object-contain" // Increased size from w-10 h-10 to w-16 h-16
                  />
                </div>

                {/* Job content */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-green-600 font-semibold mb-4">
                    {job.salary}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Companies
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {companies.map((company, index) => (
                <div key={index} className="text-center">
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className={`w-24 h-24 mx-auto mb-2 rounded-full shadow-md ${company.bgColor} p-2`} // Background color applied to the image itself with padding
                  />
                  <p className="font-semibold">{company.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              View All Companies
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose JobPortal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="w-12 h-12 mb-4 text-blue-600" />,
                title: "Diverse Job Listings",
                description: "Find jobs across industries and locations.",
              },
              {
                icon: <Building2 className="w-12 h-12 mb-4 text-blue-600" />,
                title: "Verified Employers",
                description: "Work with trusted companies.",
              },
              {
                icon: <Users className="w-12 h-12 mb-4 text-blue-600" />,
                title: "Smart Job Matching",
                description:
                  "Tailored job recommendations based on your profile.",
              },
              {
                icon: <BookOpen className="w-12 h-12 mb-4 text-blue-600" />,
                title: "Career Resources",
                description: "Access resume templates and interview tips.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Job Seekers</h3>
              <ol className="space-y-4">
                {[
                  "Create Profile",
                  "Search Jobs",
                  "Apply with Ease",
                  "Get Hired!",
                ].map((step, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Employers</h3>
              <ol className="space-y-4">
                {[
                  "Create Account",
                  "Post Job",
                  "Review Applications",
                  "Hire Talent",
                ].map((step, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Job Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "IT & Software",
              "Marketing",
              "Healthcare",
              "Education",
              "Finance",
              "Design",
              "Sales",
              "Engineering",
            ].map((category) => (
              <div
                key={category}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{category}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Explore More Categories
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "John Doe",
                role: "Software Developer",
                company: "Google",
                image: human1,
                quote:
                  "JobPortal helped me find my dream job in just two weeks!",
              },
              {
                name: "Jane Smith",
                role: "HR Manager",
                company: "Nvidia",
                image: human2,
                quote:
                  "We've found amazing talent through JobPortal. It's our go-to platform for hiring.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={`${testimonial.image}?height=50&width=50`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Advice */}
      <section className="bg-gray-100 py-16 px-4" id="advices">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Latest Career Advice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Tips for a Successful Job Interview",
                excerpt:
                  "Prepare for your next interview with these proven strategies.",
                image: `${article_img1}?height=200&width=300`,
              },
              {
                title: "How to Write a Standout Resume",
                excerpt: "Make your resume shine with these expert tips.",
                image: `${article_img2}?height=200&width=300`,
              },
              {
                title: `Navigating Career Changes in 2024`,
                excerpt: `Insights on transitioning to a new career path.`,
                image: `${article_img3}?height=200&width=300`,
              },
            ].map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Job Alerts Subscription */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Stay Updated! Get the Latest Job Alerts
          </h2>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 p-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm">No spam, only relevant job alerts.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <Briefcase className="h-8 w-8 text-blue-400 mr-2" />
              <span className="font-bold text-xl">JobPortal</span>
            </div>
            <p className="text-gray-400">
              Connecting talent with opportunity, everywhere.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Job Alerts
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Recruitment Solutions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a
                  href="mailto:support@jobportal.com"
                  className="text-gray-400 hover:text-white"
                >
                  support@jobportal.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white"
                >
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">
                  123 Job Street, Career City, 12345
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
