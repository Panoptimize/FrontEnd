import Background from "../../assets/images/AuthBackground.png";
import Email from "../../assets/images/email.png";
import Password from "../../assets/images/password.png";
import Logo from "../../assets/images/PanoptimizeBlue.png";
import { Button } from "../../components/Button";
import React, { useState } from "react";
import { useAppContext } from "../../store/app-context/app-context";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      navigate(ROUTES.DASHBOARD);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
              <p className="text-xl font-bold">Company name</p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email:
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <img src={Email} alt="email" className="h-5 w-5" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@test.com"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <img src={Password} alt="password" className="h-5 w-5" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="******"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors duration-300 mt-3"
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
