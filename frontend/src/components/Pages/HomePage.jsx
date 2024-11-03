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
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/login');
  };
  const jobList = [
    {
      title: "Software Engineer",
      company: "BlackRock",
      salary: "$90,000 - $130,000",
      logo: blackrock_logo,
      bgColor: "bg-gray-200",
    },
    {
      title: "Product Manager",
      company: "Google",
      salary: "$120,000 - $150,000",
      logo: google_logo,
      bgColor: "bg-black",
    },
    {
      title: "Data Scientist",
      company: "NVIDIA",
      salary: "$100,000 - $140,000",
      logo: nvidia_logo,
      bgColor: "bg-green-200",
    },
  ];

  const companies = [
    { name: "Apple", logo: apple_logo, bgColor: "bg-pink-200" },
    { name: "Amazon", logo: amazon_logo, bgColor: "bg-yellow-200" },
    { name: "Microsoft", logo: microsoft_logo, bgColor: "bg-blue-200" },
    { name: "Meta", logo: meta_logo, bgColor: "bg-purple-200" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 text-gray-800"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-blue-600">ConnectIn</span>
          </motion.div>
          <nav className="hidden md:flex space-x-4">
            <motion.a
              href="#job-search"
              className="text-gray-600 hover:text-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Jobs
            </motion.a>
            <motion.a
              href="#companies"
              className="text-gray-600 hover:text-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Companies
            </motion.a>
            <motion.a
              href="#advices"
              className="text-gray-600 hover:text-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Career Advice
            </motion.a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Register
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight"
          >
            Discover Your Next Career Move
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
          >
            Connecting talent with opportunity, everywhere. Find your dream job
            or hire the best talent.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
              >
                Find Jobs
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
              >
                Post a Job
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Bar */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white py-12 px-4 shadow-md"
        id="job-search"
      >
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
              onClick={handleButtonClick}
            >
              Search Jobs
            </motion.button>
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
              <span className="ml-2">Internship</span>
            </label>
          </div>
        </div>
      </motion.section>

      {/* Trending Jobs & Featured Companies */}
      <section className="py-16 px-4" id="companies">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Trending Jobs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobList.map((job, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${job.bgColor}`}
                >
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-green-600 font-semibold mb-4">
                    {job.salary}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  >
                    Quick Apply
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Featured Companies
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-8">
              {companies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ 
 scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className={`w-24 h-24 mx-auto mb-2 rounded-full shadow-md ${company.bgColor} p-2`}
                  />
                  <p className="font-semibold">{company.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              onClick={handleButtonClick}
            >
              View All Companies
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Why Choose JobPortal
          </motion.h2>
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
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="flex justify-center"
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            How It Works
          </motion.h2>
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
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </motion.li>
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
                  <motion.li
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              onClick={handleButtonClick}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Job Categories
          </motion.h2>
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
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{category}</h3>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              onClick={handleButtonClick}
            >
              Explore More Categories
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Success Stories
          </motion.h2>
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
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Advice */}
      <section className="bg-gray-100 py-16 px-4" id="advices">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Latest Career Advice
          </motion.h2>
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
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
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
                  <motion.a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              onClick={handleButtonClick}
            >
              View All Articles
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Job Alerts Subscription */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-blue-600 text-white"
      >
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              onClick={handleButtonClick}
              className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Subscribe
            </motion.button>
          </form>
          <p className="mt-4 text-sm">No spam, only relevant job alerts.</p>
        </div>
      </motion.section>

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
            &copy; {new Date().getFullYear()} All rights reserved. Designed by traveller31
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
    </motion.div>
  );
}