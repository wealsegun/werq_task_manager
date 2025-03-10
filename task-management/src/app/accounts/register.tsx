// pages/register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const Register: React.FC = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData.firstName, formData.lastName, formData.gender, formData.phoneNumber, formData.email, formData.password, "user");
            router.push('/login');
        } catch (err) {
            console.log(err);
            setError('Registration failed. Please try again.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input name="firstName" onChange={handleChange} placeholder="First Name" required />
            <input name="lastName" onChange={handleChange} placeholder="Last Name" required />
            <input name="email" onChange={handleChange} placeholder="Email" required type="email" />
            <input name="gender" onChange={handleChange} placeholder="Gender" required />
            <input name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required />
            <input name="password" onChange={handleChange} placeholder="Password" required type="password" />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;