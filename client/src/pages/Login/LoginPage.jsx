import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserDetails } from "../../services/users";
import { login } from "../../services/authentication";
import "../../FormStyling.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { NavBar } from "../../components/NavBar";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      const userDetails = await getMyUserDetails(token);
      localStorage.setItem("userData", JSON.stringify(userDetails.userData));
      const userData = userDetails.userData;
      if (
        userData.currentSavings +
          userData.disposableIncome +
          userData.foodAndDrinkGoal +
          userData.socialAndEntertainmentGoal +
          userData.holidayAndTravelGoal +
          userData.healthAndBeautyGoal +
          userData.miscGoal ==
        0
      ) {
        navigate("/spending-goals");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);

      setEmail("");
      setPassword("");

      toast.error("Incorrect email or password. Please try again.", {
        role: "alert",
        ariaLive: "assertive"
    });
     
  }
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
        <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
            <NavBar />
            <div className="form-container">
      
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        <label htmlFor="email" className="form-label">Email</label>
        <input
          style={{marginBottom: "20px"}}
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="form-label">Password</label>
        <input
          style={{marginBottom: "20px"}}
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className="form-button" role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      </div>
    </>
  );
}
