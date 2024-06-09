import Background from "../../assets/images/AuthBackground.png";
import Logo from "../../assets/images/PanoptimizeBlue.png";
import Email from "../../assets/images/email.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const PasswordReset = () => {
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetMessage, setResetMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent! Check your inbox");
    } catch (error: any) {
      setResetMessage(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden">
        <img src={Background} alt="Background" className="w-screen" />
        <div className="absolute inset-0 flex items-center justify-center space-x-0">
          <div className="w-96 h-96 bg-cyan-100 rounded-l-xl shadow-lg flex items-center justify-center">
            <img src={Logo} alt="Panoptimize logo" className="w-80" />
          </div>
          <div className="w-96 h-96 bg-white rounded-r-xl shadow-lg flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-6">
              {error && (
                <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
              )}
              <p className="text-xl font-bold">Password Reset</p>
              <form
                onSubmit={handlePasswordReset}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                    data-testid="email-label"
                  >
                    Email:
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <img src={Email} alt="email" className="h-5 w-5" />
                    </span>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email to reset password"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                      data-testid="email-input"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors duration-300 mt-3"
                >
                  Send reset email
                </button>
              </form>

              {resetMessage && (
                <p className="text-center mt-4 text-sm font-medium text-red-500">
                  {resetMessage}
                </p>
              )}
              <Link
                to={ROUTES.AUTH}
                className="block text-blue-500 mt-2 text-sm text-center hover:underline"
              >
                Return to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
