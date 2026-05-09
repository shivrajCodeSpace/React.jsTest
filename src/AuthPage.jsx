import { useState } from "react";
import "./Auth.css";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import web_login from "./assets/web_login.png";
import BrandHeader from "./components/BrandHeader";

export default function AuthPage({ onNavigate }) {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState("form"); // form | verify | forgot

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

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
        alert(`Password reset link sent to ${emailOrPhone}`);
        setStep("form");
    };

    // 🔹 Verify OTP
    const handleVerifyOTP = (e) => {
        e.preventDefault();

        if (otp === "123456") {
            alert("Account verified ✅");
            setIsLogin(true);
            setStep("form");
            setError("");
        } else {
            setError("Invalid OTP ❌");
        }
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
                            : isLogin
                            ? "Welcome Back"
                            : "Create Account"}
                    </h2>

                    <p>
                        {step === "verify"
                            ? "Enter the OTP sent to your email/phone"
                            : step === "forgot"
                            ? "Enter your email or phone to reset your password"
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
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                                Send reset link
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
