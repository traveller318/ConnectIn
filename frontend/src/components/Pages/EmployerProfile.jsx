import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const EmployerProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
  const user = location.state;

  console.log("In EmployerProfile:", user);
  
  return (
    <div>EmployerProfile</div>
  )
}

export default EmployerProfile