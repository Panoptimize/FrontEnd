import Background from "../../assets/images/AuthBackground.png";
import Logo from "../../assets/images/PanoptimizeVertical.png";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import axios from "axios";

function Login() {
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
              <TextInput
                placeholder="Email"
                icon="../../assets/icons/plus.png"
                size="small"
              />
              <TextInput
                placeholder="Password"
                icon="../../assets/icons/plus.png"
                size="small"
              />
              <Button text="Login" image="" baseColor="teal" bold={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
