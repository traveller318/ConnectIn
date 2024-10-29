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
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

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

        // Redirect based on user type
        if (formData.userType === "job-seeker") {
          navigate("/jobSeekerHome");
        } else if (formData.userType === "employer") {
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
                <Input id="firstName" placeholder="John" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required onChange={handleChange} />
              </div>
            </div>

            {/* Continue adding fields like this, with handleChange for each input */}
            
            <Button type="submit" className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Create Account
            </Button>
          </form>
          
          {/* Display success or error message */}
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
