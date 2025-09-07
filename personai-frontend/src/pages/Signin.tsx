import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BackArrowIcon } from "../icons/BackArrowIcon";
import { MessageModal } from "../components/section/MessageModal";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin(){
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

    async function signin(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            showErrorMessage("Please fill in all fields");
            return;
        }

        if (!email.includes("@")) {
            showErrorMessage("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
                email,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            showSuccessMessage("Welcome back! Redirecting to dashboard...");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error: any) {
            if (error.response?.status === 403) {
                showErrorMessage("Invalid email or password");
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
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
                        <p className="text-slate-600">Sign in to your PersonAI account</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                        <form onSubmit={(e) => { e.preventDefault(); signin(); }} className="space-y-2 flex flex-col items-center">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <Input 
                                    ref={emailRef} 
                                    placeholder="Enter your email" 
                                    inputType="short"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <Input 
                                    ref={passwordRef} 
                                    placeholder="Enter your password" 
                                    inputType="password"
                                />
                            </div>

                            <div className="pt-2">
                                <Button 
                                    variant="primary" 
                                    text={loading ? "Signing in..." : "Sign In"} 
                                    size="lg" 
                                    fullWidth={true} 
                                    loading={loading} 
                                    onClick={signin}
                                />
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-slate-600">
                                Don't have an account?{" "}
                                <Link to={'/signup'} className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-slate-500">
                            Powered by <span className="font-medium text-emerald-600">PersonAI</span>
                        </p>
                    </div>
                </div>
            </div>
            
            <MessageModal message={message} open={showMessage} />
        </>
    )
}