import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Select from "react-select";
import { useLocation } from "react-router-dom";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const skillsOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  // Add more options as needed
];

export default function AfterJobSeekerRegisterPage() {
  const location = useLocation();
  const user = location.state;
  // console.log(user);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: user.user_id,
    resumeUrl: "",
    qualifications: "",
    workExperience: "",
    certifications: "",
    portfolioUrl: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillsChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions || []); // Handles empty selection as well
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.resumeUrl) {
      newErrors.resumeUrl = "Resume URL is required.";
    }
    if (!formData.qualifications) {
      newErrors.qualifications = "Qualifications are required.";
    }
    if (!formData.workExperience) {
      newErrors.workExperience = "Work experience is required.";
    }
    if (!formData.certifications) {
      newErrors.certifications = "Certifications are required.";
    }
    if (!formData.portfolioUrl) {
      newErrors.portfolioUrl = "Portfolio URL is required.";
    }
    if (selectedSkills.length === 0) {
      newErrors.skills = "At least one skill must be selected.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
  
    // Data for the job seeker info request
    const dataToSend = {
      user_id: formData.user_id,
      resume_url: formData.resumeUrl,
      qualifications: formData.qualifications,
      work_experience: formData.workExperience,
      certifications: formData.certifications,
      portfolio_url: formData.portfolioUrl,
    };
  
    // Data for the skills request
    const selectedSkillValues = selectedSkills.map((skill) => skill.value);
    const skillsDataToSend = {
      user_id: formData.user_id,
      skill_names: selectedSkillValues,
    };
  
    try {
      // Make the job seeker info request
      console.log(dataToSend);
      
      const uploadJobSeekerInfoResponse = await axios.post(
        "http://localhost:3000/api/users/upload-job-seeker-info",
        dataToSend
      );
      console.log(uploadJobSeekerInfoResponse);
      
      if (uploadJobSeekerInfoResponse.status === 200 || uploadJobSeekerInfoResponse.status === 201) {
        // If successful, proceed to update skills
        const addSkillsResponse = await axios.post(
          "http://localhost:3000/api/users/add-user-skills",
          skillsDataToSend
        );
        console.log(addSkillsResponse);
        
        if (addSkillsResponse.status === 201) {
          navigate("/jobSeekerHome", { state: user });
        } else {
          throw new Error("Error adding skills. Please try again.");
        }
      } else {
        throw new Error("Error uploading job seeker info. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile or skills:", error);
      console.log(error);
      
      alert("There was an issue updating your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 md:p-12">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg md:p-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Complete Your Job Seeker Profile
        </h1>
        <p className="mb-6 text-gray-600">
          Provide as much detail as possible to improve your chances of finding
          the perfect job match.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              placeholder="https://example.com/your-resume"
              value={formData.resumeUrl}
              onChange={handleInputChange}
              required
            />
            {errors.resumeUrl && (
              <p className="text-red-600">{errors.resumeUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              placeholder="List your academic and professional qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              required
            />
            {errors.qualifications && (
              <p className="text-red-600">{errors.qualifications}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="workExperience">Work Experience</Label>
            <Textarea
              id="workExperience"
              name="workExperience"
              placeholder="Describe your previous work experience"
              value={formData.workExperience}
              onChange={handleInputChange}
              required
            />
            {errors.workExperience && (
              <p className="text-red-600">{errors.workExperience}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications</Label>
            <Textarea
              id="certifications"
              name="certifications"
              placeholder="List any relevant certifications"
              value={formData.certifications}
              onChange={handleInputChange}
            />
            {errors.certifications && (
              <p className="text-red-600">{errors.certifications}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
            <Input
              id="portfolioUrl"
              name="portfolioUrl"
              type="url"
              placeholder="https://example.com/your-portfolio"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
            />
            {errors.portfolioUrl && (
              <p className="text-red-600">{errors.portfolioUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="skills">Select Your Skills:</label>
            <Select
              id="skills"
              options={skillsOptions}
              isMulti
              value={selectedSkills}
              onChange={handleSkillsChange}
              placeholder="Select skills"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Profile
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
