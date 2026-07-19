import { useEffect, useState } from "react";
import "./Auth.css";
import { FaUser, FaLock, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import web_login from "../assets/web_login.png";
import BrandHeader from "./BrandHeader";

export default function AuthPage({ onNavigate, initialMode = "login" }) {
    const [isLogin, setIsLogin] = useState(initialMode === "login");
    const [step, setStep] = useState("form"); // form | verify | forgot

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLogin(initialMode === "login");
        setStep("form");
        setError("");
    }, [initialMode]);

    // 🔹 Validation Function
    const validateInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const isNumeric = /^[0-9]+$/.test(emailOrPhone);

        if (!emailOrPhone) {
            return "Field cannot be empty";
        }

        if (emailOrPhone.includes("@")) {
            if (!emailRegex.test(emailOrPhone)) {
                return "Invalid email format";
            }
        } else if (isNumeric) {
            if (!phoneRegex.test(emailOrPhone)) {
                return "Phone number must be 10 digits";
            }
        } else {
            return "Invalid email format";
        }

        return "";
    };

    // 🔹 Send OTP
    const handleSendOTP = (e) => {
        e.preventDefault();

        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        console.log("Sending OTP to:", emailOrPhone);
        setStep("verify");
    };

    const handleForgotPassword = () => {
        setError("");
        setStep("forgot");
    };

    const handleSendReset = (e) => {
        e.preventDefault();

        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        alert(`OTP sent to ${emailOrPhone}`);
        setStep("verify");
    };

    // 🔹 Verify OTP
    const handleVerifyOTP = (e) => {
        e.preventDefault();

        if (otp === "123456") {
            setError("");
            setStep("reset");
        } else {
            setError("Invalid OTP ❌");
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!resetPassword || !confirmPassword) {
            setError("Please enter and confirm your new password.");
            return;
        }

        if (resetPassword.length < 6 || resetPassword.length > 18) {
            setError("Password must be between 6 and 18 characters.");
            return;
        }

        if (resetPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        alert("Password updated successfully.");
        setPassword("");
        setResetPassword("");
        setConfirmPassword("");
        setOtp("");
        setIsLogin(true);
        setStep("form");
    };

    // 🔹 Login
    const handleLogin = (e) => {
        e.preventDefault();

        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        if (onNavigate) {
            onNavigate("Dashboard");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                    <BrandHeader />

                <div className="auth-card">
                    <h2>
                        {step === "verify"
                            ? "Verify OTP"
                            : step === "forgot"
                            ? "Forgot Password"
                            : step === "reset"
                            ? "Reset Password"
                            : isLogin
                            ? "Welcome Back"
                            : "Create Account"}
                    </h2>

                    <p>
                        {step === "verify"
                            ? "Enter the OTP sent to your email/phone"
                            : step === "forgot"
                            ? "Enter your email or phone to receive a verification code"
                            : step === "reset"
                            ? "Create a new password and confirm it"
                            : isLogin
                            ? "Sign in to continue"
                            : "Sign up to get started"}
                    </p>

                    {step === "form" && (
                        <form onSubmit={isLogin ? handleLogin : handleSendOTP}>
                            <div className={`input-group ${error ? "input-error" : ""}`}>
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Email / Phone"
                                    required
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                />
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword((current) => !current)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {isLogin && (
                                <div className="auth-options">
                                    <label>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <span className="forgot" onClick={handleForgotPassword}>
                                        Forgot password?
                                    </span>
                                </div>
                            )}

                            <button type="submit" className="auth-btn">
                                {isLogin ? "Sign In" : "Send OTP"}
                            </button>
                        </form>
                    )}

                    {step === "forgot" && (
                        <form onSubmit={handleSendReset}>
                            <div className={`input-group ${error ? "input-error" : ""}`}>
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Email / Phone"
                                    required
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                />
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <button type="submit" className="auth-btn">
                                Send OTP
                            </button>

                            <p className="switch-text">
                                Remembered your password?{' '}
                                <span
                                    onClick={() => {
                                        setStep("form");
                                        setError("");
                                    }}
                                >
                                    Sign in
                                </span>
                            </p>
                        </form>
                    )}

                    {step === "verify" && (
                        <form onSubmit={handleVerifyOTP}>
                            <div className={`input-group ${error ? "input-error" : ""}`}>
                                <FaLock className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <button type="submit" className="auth-btn">
                                Verify OTP
                            </button>
                        </form>
                    )}

                    {step === "reset" && (
                        <form onSubmit={handleResetPassword}>
                            <div className={`input-group ${error ? "input-error" : ""}`}>
                                <FaLock className="input-icon" />
                                <input
                                    type={showResetPassword ? "text" : "password"}
                                    placeholder="New password"
                                    required
                                    value={resetPassword}
                                    onChange={(e) => setResetPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowResetPassword((current) => !current)}
                                    aria-label={showResetPassword ? "Hide password" : "Show password"}
                                >
                                    {showResetPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className={`input-group ${error ? "input-error" : ""}`}>
                                <FaLock className="input-icon" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword((current) => !current)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <button type="submit" className="auth-btn">
                                Save new password
                            </button>

                            <p className="switch-text">
                                Remembered your password?{' '}
                                <span
                                    onClick={() => {
                                        setStep("form");
                                        setError("");
                                    }}
                                >
                                    Sign in
                                </span>
                            </p>
                        </form>
                    )}

                    {step === "form" && (
                        <>
                            <div className="divider">
                                <span>Or continue with</span>
                            </div>

                            <div className="social-buttons">
                                <button className="social-btn google">
                                    <FaGoogle /> Google
                                </button>
                            </div>
                        </>
                    )}

                    {step === "form" && (
                        <p className="switch-text">
                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                            <span
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                }}
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </span>
                        </p>
                    )}
                </div>
            </div>
            <div className="auth-right">
                <img src={web_login} alt="Login" />
            </div>
        </div>
    );
}
