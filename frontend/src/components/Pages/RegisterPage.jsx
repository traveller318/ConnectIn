import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    userType: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target ? e.target : e; // Checks if it's an event or a direct object
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    // Basic validation
    if (!formData.firstName) {
      setErrorMessage("First name is required.");
      return;
    }
    if (!formData.lastName) {
      setErrorMessage("Last name is required.");
      return;
    }
    if (!formData.email) {
      setErrorMessage("Email is required.");
      return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    
    if (!formData.password) {
      setErrorMessage("Password is required.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    
    if (!formData.phone) {
      setErrorMessage("Phone number is required.");
      return;
    }
    
    // Validate phone number format (simple regex for demonstration)
    const phonePattern = /^\+?\d{1,15}$/;
    if (!phonePattern.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    
    if (!formData.dob) {
      setErrorMessage("Date of birth is required.");
      return;
    }
    
    if (!formData.gender) {
      setErrorMessage("Gender must be selected.");
      return;
    }
    
    if (!formData.address) {
      setErrorMessage("Address is required.");
      return;
    }
    
    if (!formData.city) {
      setErrorMessage("City must be selected.");
      return;
    }
    
    if (!formData.state) {
      setErrorMessage("State must be selected.");
      return;
    }
    
    if (!formData.country) {
      setErrorMessage("Country must be selected.");
      return;
    }
    
    if (!formData.zipCode) {
      setErrorMessage("Zip code is required.");
      return;
    }
    
    
    if (!formData.userType) {
      setErrorMessage("User type must be selected.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
        date_of_birth: formData.dob,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip_code: formData.zipCode,
        user_type: formData.userType,
      });
  
      if (response.data.success) {
        setSuccessMessage(response.data.message);
  
        // Navigate based on user type
        if (formData.userType === "Job Seeker") {
          navigate("/jobSeekerHome");
        } else if (formData.userType === "Employer") {
          navigate("/employerHome");
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">ConnectIn</h1>
        <p className="text-xl text-muted-foreground">
          Your Gateway to Career Opportunities
        </p>
      </header>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Join our community of job seekers and employers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" required onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleChange({ id: "gender", value })}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St, Apt 4B"
                required
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { id: "city", value } })
                  }
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    {/* Add more cities as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { id: "state", value } })
                  }
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="il">Illinois</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { id: "country", value } })
                  }
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { id: "userType", value } })
                }
              >
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                  <SelectItem value="Employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              Create Account
            </Button>
          </form>

          {/* Display success or error message */}
          {successMessage && (
            <p className="text-green-600 mt-4">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
