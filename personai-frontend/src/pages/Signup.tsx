import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { BackArrowIcon } from "../icons/BackArrowIcon";
import { MessageModal } from "../components/section/MessageModal";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const showSuccessMessage = (msg: string) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const showErrorMessage = (msg: string) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    async function signup(){
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !email || !password) {
            showErrorMessage("Please fill in all fields");
            return;
        }

        if (!email.includes("@")) {
            showErrorMessage("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            showErrorMessage("Password must be at least 6 characters long");
            return;
        }

        if (username.length < 3) {
            showErrorMessage("Username must be at least 3 characters long");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                username,
                email,
                password
            });
            showSuccessMessage("Account created successfully! Redirecting to sign in...");
            setTimeout(() => navigate('/signin'), 2000);
        } catch (error: any) {
            if (error.response?.status === 400) {
                showErrorMessage("Email already exists. Please use a different email.");
            } else {
                showErrorMessage("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            <div className="min-h-screen w-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-slate-50">
                <div className="w-full max-w-md mx-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to={'/'} className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-6">
                            <BackArrowIcon />
                            <span className="ml-2 font-medium">Back to Home</span>
                        </Link>
                        <div className="mb-4">
                            <img src="/personAi.png" alt="PersonAI" className="w-16 h-16 mx-auto mb-4" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Join PersonAI</h1>
                        <p className="text-slate-600">Create your account and start building your second brain</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 py-8">
                        <form onSubmit={(e) => { e.preventDefault(); signup(); }} className="space-y-2 flex flex-col items-center">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                                    Username
                                </label>
                                <Input 
                                    placeholder="Choose a username" 
                                    inputType="short" 
                                    ref={usernameRef}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                    Email Address
                                </label>
                                <Input 
                                    placeholder="Enter your email" 
                                    inputType="short" 
                                    ref={emailRef} 
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <Input 
                                    placeholder="Create a password" 
                                    inputType="password" 
                                    ref={passwordRef}
                                />
                                <p className="text-xs text-slate-500 mt-1">Must be at least 6 characters</p>
                            </div>

                            <div className="pt-2">
                                <Button 
                                    variant="primary" 
                                    text={loading ? "Creating Account..." : "Create Account"} 
                                    size="lg" 
                                    fullWidth={true} 
                                    loading={loading} 
                                    onClick={signup} 
                                />
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-slate-600">
                                Already have an account?{" "}
                                <Link to={'/signin'} className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-slate-500">
                            By signing up, you agree to our Terms of Service and Privacy Policy
                        </p>
                        <p className="text-sm text-slate-500 mt-2">
                            Powered by <span className="font-medium text-emerald-600">PersonAI</span>
                        </p>
                    </div>
                </div>
            </div>
            
            <MessageModal message={message} open={showMessage} />
        </>
    )
}