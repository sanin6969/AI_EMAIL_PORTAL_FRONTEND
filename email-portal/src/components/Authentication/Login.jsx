import React, { useState } from "react";
import { useLogin } from "../../API/api";
const Login = () => {
  const loginMutation = useLogin()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginMutation.mutate(formData)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container p-3 bg-white shadow rounded" style={{ width: "30%", minWidth: "300px" }}>
        <h4 className="text-center mb-3">Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Username</label>
            <input type="text" className="form-control form-control-sm" name="username" value={formData.username} onChange={handleChange} required />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input type="password" className="form-control form-control-sm" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;