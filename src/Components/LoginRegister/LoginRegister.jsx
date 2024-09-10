import React, { useState } from "react";
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { email, password, confirmPassword } = input;

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errors.email = "Please enter a valid email address.";
        }

        // Password validation rules
        const minLength = 6;
        const maxLength = 10;
        const uppercaseRegEx = /[A-Z]/;
        const lowercaseRegEx = /[a-z]/;
        const specialCharRegEx = /[^A-Za-z0-9]/;

        if (password.length < minLength || password.length > maxLength) {
            isValid = false;
            errors.password = `Password must be between ${minLength} and ${maxLength} characters long.`;
        }

        if (!uppercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one uppercase letter.";
        }

        if (!lowercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one lowercase letter.";
        }

        if (!specialCharRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one special character.";
        }

        // Check if confirm password matches
        if (password !== confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
        }

        // Check if the checkbox is checked
        if (!isCheckboxChecked) {
            isValid = false;
            errors.checkbox = "You must agree to the terms and conditions.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        if (validate()) {
            // Perform registration logic here
            alert("Registration Successful!");
            setInput({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setIsCheckboxChecked(false); // Reset checkbox
            setAction('');
        }
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form action="" onSubmit={handleRegistration}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={input.username}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    {errors.email && <div className="error">{errors.email}</div>}

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            required
                            className="password-input"
                        />
                        <FaLock className="icon" />
                        <div className="password-hint">Password must be 6-10 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.</div>
                    </div>
                    {errors.password && <div className="error">{errors.password}</div>}

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

                    <div className="remember-forgot">
                        <label>
                            <input
                                type="checkbox"
                                checked={isCheckboxChecked}
                                onChange={handleCheckboxChange}
                            />I agree to the terms & conditions
                        </label>
                    </div>
                    {errors.checkbox && <div className="error">{errors.checkbox}</div>}

                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
