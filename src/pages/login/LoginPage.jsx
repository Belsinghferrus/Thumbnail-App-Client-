import { useState } from "react";
import "./loginPage.css";
import useAuth from "../../Store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/topBar/component/Logo";
import google from '../../assets/google.png'
import toast from "react-hot-toast";
const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { login, register, googleOAuth } = useAuth();
  const navigate = useNavigate();
  //handle login Input
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle Register Input
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData(
      (prevData) => ({ ...prevData, [name]: value })
    );
  };

  //handle login submit
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      if (loginFormData.password.length < 8) {
        toast.error("Password must be at least 8 characters long!");
        return;
      }
      await login(loginFormData);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  //handle register submit
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      if (registerFormData.password.length < 8) {
        toast.error("Password must be at least 8 characters long!");
        return;
      }
      await register(registerFormData);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  //handle google auth
  const handleGoogleAuth = async () => {
   try {
    await googleOAuth();
   } catch (error) {
    console.log("Error in handleOauth", error);
   }
  };


  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div className="login-page">
      <div className="logo-login">
         <Logo />
      </div>
     
      <div className="login-card">
        <h1 className="auth-title"> Login or Register</h1>

        {showRegisterForm ? (
          <form onSubmit={handleSubmitLogin} className="auth-form">
            <h2>Login</h2>
            <input
              className="auth-input"
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleLoginInputChange}
              placeholder="Email"
              required
            />
            <input
              className="auth-input"
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleLoginInputChange}
              placeholder="Password"
              required
            />
            <button className="auth-button" type="submit">
              Login
            </button>
            <div className="have-account">
              <p className="auth-switch">Don&apos;t have an account?</p>
              <p
                className="auth-switch-button"
                onClick={() => setShowRegisterForm(true)}
              >
                Register
              </p>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSubmitRegister}>
            <h2>Register</h2>
            <input
              className="auth-input"
              type="text"
              name="username"
              value={registerFormData.username}
              onChange={handleRegisterInputChange}
              placeholder="username"
              required
            />
            <input
              className="auth-input"
              type="email"
              name="email"
              value={registerFormData.email}
              onChange={handleRegisterInputChange}
              placeholder="Email"
              required
            />
            <input
              className="auth-input"
              type="password"
              name="password"
              value={registerFormData.password}
              onChange={handleRegisterInputChange}
              placeholder="Password"
              required
            />
            <button className="auth-button" type="submit">
              Register
            </button>
            <div className="have-account">
              <p className="auth-switch">Already have an account? </p>
              <p
                className="auth-switch-button"
                onClick={() => setShowRegisterForm(false)}
              >
                Login
              </p>
            </div>
          </form>
        )}<br/>
        <p>or</p>
        <div>
          <button className="google-auth-button" onClick={handleGoogleAuth}>
            <img
              src={google}
              alt="Google Logo"
              className="google-logo"
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
