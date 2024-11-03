import React, { useEffect, useState } from "react";
import axios from "axios";

import { ArrowLeft, Mail, FileText, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const ViewApplicantsPage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  const { job_id, user } = location.state;

  const handleBackButtonClick = () => {
    navigate("/employerHome", { state: user }); // Navigate with user object
  };

  const handleApplicationStatusUpdate = async (applicantId, status) => {
    try {
      await axios.put("http://localhost:3000/api/users/update-application-status", {
        user_id: applicantId,
        job_id: job_id,
        status: status,
      });
      // Update the local state to reflect the change
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.user_id === applicantId ? { ...applicant, status: status } : applicant
        )
      );
    } catch (err) {
      setError("Failed to update application status");
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/applicants/job/${job_id}`
        );
        setApplicants(response.data.applicants);
      } catch (err) {
        setError("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [job_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={handleBackButtonClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Applicants for Software Engineer Position
            </h1>
            <p className="text-sm text-gray-500">
              Total applicants: {applicants.length}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applicants.map((applicant) => (
            <Card key={applicant.user_id} className="flex flex-col">
              <CardContent className="flex-grow p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${applicant.first_name} ${applicant.last_name}`}
                    />
                    <AvatarFallback>
                      {applicant.first_name[0]}
                      {applicant.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {applicant.first_name} {applicant.last_name}
                    </h2>
                    <Badge
                      variant="secondary"
                      className={statusColors[applicant.status]}
                    >
                      {applicant.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <strong>Qualifications:</strong> {applicant.qualifications}
                  </p>
                  <p className="text-sm">
                    <strong>Experience:</strong> {applicant.work_experience}
                  </p>
                </div>
                <a
                  href={`mailto:${applicant.email}`}
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {applicant.email}
                </a>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                  <a
                    href={applicant.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Resume
                  </a>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleApplicationStatusUpdate(applicant.user_id, "Accepted")}
                      disabled={applicant.status !== "Pending"}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleApplicationStatusUpdate(applicant.user_id, "Rejected")}
                      disabled={applicant.status !== "Pending"}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved. Designed by traveller31
          </p>
          <nav className="flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Help
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ViewApplicantsPage;
