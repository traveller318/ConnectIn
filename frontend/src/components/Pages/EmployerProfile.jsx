import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  LogOut,
  Globe,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const EmployerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const [employerInfo, setEmployerInfo] = useState(null);

  useEffect(() => {
    const fetchEmployerInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/employer-info/${user.user_id}`
        );
        if (response.data.success) {
          setEmployerInfo(response.data.employerInfo);
        }
      } catch (error) {
        console.error("Error fetching employer info:", error);
      }
    };

    fetchEmployerInfo();
  }, [user.user_id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <img src={logo} alt="Company Logo" className="h-12" />
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/employerHome", { state: user })}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                try {
                  const response = await axios.get(
                    "http://localhost:3000/api/users/logout"
                  );
                  if (response.status === 200) {
                    navigate("/login");
                  }
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.first_name} ${user.last_name}`}
                />
                <AvatarFallback>
                  {user.first_name} {user.last_name}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-sm text-muted-foreground">{user.user_type}</p>
              <div className="mt-4 flex flex-col items-center space-y-2">
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> {user.email}
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" /> {user.phone_number}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          {employerInfo && (
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  {employerInfo.company_name}
                </h3>
                <p className="flex items-center text-blue-600">
                  <Globe className="mr-2 h-4 w-4" />
                  <a
                    href={employerInfo.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Company Website
                  </a>
                </p>
                <p className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {employerInfo.number_of_employees} Employees
                </p>
                <p>
                  <strong>Industry:</strong> {employerInfo.industry}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {employerInfo.company_description}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {employerInfo.headquarters_location}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Personal Information */}
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Gender:</strong>
                  <span className="ml-2">{user.gender}</span>
                </p>
                <p>
                  <strong>Address:</strong>
                  <span className="ml-2">{user.address}</span>
                </p>
                <p>
                  <strong>City:</strong>
                  <span className="ml-2">{user.city}</span>
                </p>
                <p>
                  <strong>State:</strong>
                  <span className="ml-2">{user.state}</span>
                </p>
                <p>
                  <strong>Country:</strong>
                  <span className="ml-2">{user.country}</span>
                </p>
                <p>
                  <strong>Zip Code:</strong>
                  <span className="ml-2">{user.zip_code}</span>
                </p>
              </div>
              <div>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <strong>Date of Birth:</strong>
                  <span className="ml-2">{formatDate(user.date_of_birth)}</span>
                </p>
                <p className="flex items-center mt-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <strong>Joined:</strong>
                  <span className="ml-2">
                    {formatDate(user.registration_date)}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfile;
