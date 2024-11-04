/*
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    zip_code VARCHAR(10),
    profile_picture_url VARCHAR(255),
    user_type ENUM('Job Seeker', 'Employer') NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE VIEW active_applicants_view AS
SELECT 
    applications.user_id, 
    applications.job_id, 
    applications.status, 
    user.first_name, 
    user.last_name, 
    user.email,
    job_seeker_info.qualifications, 
    job_seeker_info.work_experience, 
    job_seeker_info.resume_url 
FROM 
    applications
JOIN 
    user ON applications.user_id = user.user_id
LEFT JOIN 
    job_seeker_info ON applications.user_id = job_seeker_info.user_id
WHERE 
    applications.status != 'Accepted';


DELIMITER //

CREATE TRIGGER remove_applicant_after_accept
AFTER UPDATE ON applications
FOR EACH ROW
BEGIN
    IF NEW.status = 'Accepted' THEN
        DELETE FROM applications WHERE user_id = NEW.user_id AND job_id = NEW.job_id;
    END IF;
END;

//

DELIMITER ;

DROP TRIGGER IF EXISTS remove_applicant_after_accept;


*/