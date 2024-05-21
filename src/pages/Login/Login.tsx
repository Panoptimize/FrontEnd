import Background from "../../assets/images/AuthBackground.png";
import Logo from "../../assets/images/PanoptimizeVertical.png";
import { Button } from "../../components/Button";
import React, { FormEvent, useState } from "react";
import axios from "axios";
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
        <img
          src={Background}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center space-x-0">
          <div className="w-96 h-96 bg-blue-300 rounded-l-xl shadow-lg flex items-center justify-center">
            <img src={Logo} alt="Panoptimize logo" className="w-80" />
          </div>
          <div className="w-96 h-96 bg-white rounded-r-xl shadow-lg flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-6">
              {error && (
                <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@test.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="******"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <Button baseColor="mint" text={"Log In"} type="submit"></Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
