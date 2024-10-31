import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Briefcase,
  Globe,
  Building,
  Users,
  FileText,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ChevronRight,
} from "lucide-react";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Other",
];

export default function AfterEmployerRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state;
  console.log(user);

  const [formData, setFormData] = React.useState({
    companyName: "",
    website: "",
    industry: "",
    numberOfEmployees: "",
    description: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      user_id: user.user_id, // Use user_id from the user object
      company_name: formData.companyName,
      company_website: formData.website,
      industry: formData.industry,
      number_of_employees: Number(formData.numberOfEmployees),
      company_description: formData.description,
      headquarters_location: formData.location,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/upload-employer-info",
        requestBody
      );
      if (response.status === 201) {
        navigate("/employerHome", { state: user });
      }
    } catch (error) {
      console.error("There was an error uploading the employer info!", error);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-semibold text-gray-600">ConnectIn</div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Employer Registration
          </h1>
          <div className="w-20"></div> {/* Placeholder for balance */}
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Complete Your Company Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="companyName"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Inc."
                    className="w-full"
                    required
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <Globe className="w-4 h-4 mr-2 text-gray-500" />
                    Company Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    className="w-full"
                    required
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="industry"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    Industry
                  </Label>
                  <Select
                    id="industry"
                    required
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, industry: value })
                    } // Changed onChange to onValueChange
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry}
                          value={industry}
                        >
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="employees"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    Number of Employees
                  </Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="e.g., 50"
                    min="1"
                    className="w-full"
                    required
                    value={formData.numberOfEmployees}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfEmployees: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  Company Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe your company..."
                  className="w-full h-32"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  Headquarters Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  className="w-full"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <CardFooter className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white text-lg py-4"
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gradient-to-r from-gray-600 to-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">ConnectIn</h2>
              <p className="text-gray-100">
                Connecting professionals worldwide
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Advertising", "Small Business"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-gray-300 transition-colors flex items-center"
                      >
                        <ChevronRight className="h-4 w-4 mr-2" />
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {[
                  "Help Center",
                  "Safety Center",
                  "Community Guidelines",
                  "Cookie Policy",
                  "Privacy & Terms",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <p className="text-sm text-gray-100 mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-700 border-gray-500 text-white placeholder-gray-300"
                />
                <Button className="w-full bg-white text-gray-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <Separator className="my-8 bg-gray-400" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
            <p>© {currentYear} ConnectIn Corporation. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Preferences
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
