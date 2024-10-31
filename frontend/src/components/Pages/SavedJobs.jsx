import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Toggle } from "../ui/toggle";
import { Badge } from "../ui/badge";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  ExternalLink,
  Grid,
  List,
  MapPin,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SavedJobs() {
  const navigate = useNavigate();

  const location = useLocation();
  const user = location.state; // Get user data
  const [isGridView, setIsGridView] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]); // Start with empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/api/users/saved-jobs/${user.user_id}`)
        .then((response) => {
          setSavedJobs(response.data.savedJobs); // Set saved jobs from response
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load saved jobs.");
          setLoading(false);
        });
    }
  }, [user]);

  const removeJob = (jobId) => {
    setSavedJobs(savedJobs.filter((job) => job.job_id !== jobId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div>Loading saved jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/jobSeekerHome", { state: user })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
      </Button>

      <h1 className="text-4xl font-bold text-center mb-2">Your Saved Jobs</h1>
      <p className="text-center text-gray-600 mb-8">
        Keep track of job opportunities you're interested in.
      </p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Toggle
            pressed={isGridView}
            onPressedChange={() => setIsGridView(true)}
          >
            <Grid className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={!isGridView}
            onPressedChange={() => setIsGridView(false)}
          >
            <List className="h-4 w-4" />
          </Toggle>
        </div>
        <p className="text-sm text-gray-600">{savedJobs.length} saved jobs</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            You haven't saved any jobs yet!
          </h2>
          <p className="text-gray-600">
            Start exploring to find job opportunities that interest you.
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {savedJobs.map((job) => (
            <Card key={job.job_id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl font-bold text-gray-500">
                        {job.company_name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{job.company_name}</h3>
                      <p className="text-sm text-gray-600 italic">
                        {job.industry}
                      </p>
                    </div>
                  </div>
                  
                </div>
                <h2 className="text-xl font-bold">{job.job_title}</h2>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                  <span className="mx-2">•</span>
                  <span>{job.job_type}</span>
                </div>
                <Badge className="mt-2" variant="secondary">
                  {job.salary_range}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-2">
                  {job.job_description}
                </p>
                <p className="text-sm font-medium mb-1">Key Requirements:</p>
                <p className="text-sm text-gray-600">{job.requirements}</p>
              </CardContent>
              <CardFooter className="flex-col items-start mt-auto">
                <div className="flex justify-between w-full mb-2">
                  <Badge variant="outline" className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Deadline: {formatDate(job.application_deadline)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    Saved on {formatDate(job.saved_date)}
                  </span>
                </div>
                <Button className="w-full" asChild>
                  <a
                    href={job.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Company Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
