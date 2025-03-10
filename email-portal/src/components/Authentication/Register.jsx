import React, { useState } from "react";
import { useRegister } from "../../API/api";

const Register = () => {
  const registerMutation = useRegister();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    bio: "",
    resume: null,
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    email: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format.";
    if (!/^\d{10}$/.test(formData.phone_number)) newErrors.phone_number = "Phone number must be 10 digits.";
    if (formData.resume && formData.resume.type !== "application/pdf") {
      newErrors.resume = "Only PDF files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      registerMutation.mutate(formDataToSend);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="register-container p-3 bg-white shadow rounded" style={{ width: "50%", minWidth: "400px" }}>
        <h4 className="text-center mb-3">Register</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="row mb-2">
            <div className="col-4">
              <label className="form-label">Username</label>
              <input type="text" className="form-control form-control-sm" name="username" value={formData.username} onChange={handleChange} required />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>
            <div className="col-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control form-control-sm" name="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="col-4">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control form-control-sm" name="full_name" value={formData.full_name} onChange={handleChange} required />
              {errors.full_name && <div className="text-danger">{errors.full_name}</div>}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-4">
              <label className="form-label">Email</label>
              <input type="email" className="form-control form-control-sm" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="col-4">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control form-control-sm" name="phone_number" value={formData.phone_number} onChange={handleChange} pattern="\d{10}" required />
              {errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
            </div>
            <div className="col-4">
              <label className="form-label">Resume (PDF only)</label>
              <input type="file" className="form-control form-control-sm" name="resume" onChange={handleChange} accept=".pdf" required />
              {errors.resume && <div className="text-danger">{errors.resume}</div>}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-4">
              <label className="form-label">LinkedIn</label>
              <input type="url" className="form-control form-control-sm" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} required />
            </div>
            <div className="col-4">
              <label className="form-label">GitHub</label>
              <input type="url" className="form-control form-control-sm" name="github_url" value={formData.github_url} onChange={handleChange} required />
            </div>
            <div className="col-4">
              <label className="form-label">Portfolio</label>
              <input type="url" className="form-control form-control-sm" name="portfolio_url" value={formData.portfolio_url} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Bio</label>
            <textarea className="form-control form-control-sm" name="bio" value={formData.bio} onChange={handleChange} rows="2" required></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-sm">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
