// pages/register.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const Register: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(
        formData.firstName,
        formData.lastName,
        formData.gender,
        formData.phoneNumber,
        formData.email,
        formData.password,
        "user"
      );
      router.push("/login");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-neutral-800">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="lastName"
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="gender"
            onChange={handleChange}
            placeholder="Gender"
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            type="password"
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Register
          </button>
          {error && <p>{error}</p>}
        </form>
        <p className="mt-5 text-sm">
          Have an account?{" "}
          <Link className="text-blue-500" href={"/login"}>
            Login.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
