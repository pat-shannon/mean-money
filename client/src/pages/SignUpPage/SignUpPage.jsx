import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitNewUser } from "../../services/users.js";
import "../../FormStyling.css"
import "./SignUpPage.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { NavBar } from "../../components/NavBar";


export function SignUpPage() {

    // const [formStuff, setFormStuff] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    // });


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        return nameRegex.test(name);
    };

    // const handleNameChange = (e) => {
    //     const newName = e.target.value;
    //     setName(newName);
        
    //     if (newName && !validateName(newName)) {
    //         toast.error("Name must not contain special characters", {
    //            role: "alert",
    //                 ariaLive: "assertive"
    //         });
    //     }
    // };
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();


            // const formData = new FormData();
            // formData.append("name", name);
            // formData.append("email", email);
            // formData.append("password", password);
            if (!validateName(name)) {
                toast.error("Name can only contain letters, spaces, apostrophes and hyphens. Please enter a valid name", {
                    role: "alert",
                    ariaLive: "assertive"
                });
                return;
            }

            try {
                setErrorMessage("");
            const data = await submitNewUser(name, email, password);

            console.log("Signup successful:", data);
        

            toast.success("Sign up successful! Please log in.", {
                role: "alert",
                ariaLive: "polite"
            });
    

            setName("");
            setEmail("");
            setPassword("");
    

            setTimeout(() => {
                navigate("/login");
            }, 3000);
    
        } catch (error) {
            console.error("Error during signup:", error);
            setErrorMessage(error.message);

            toast.error(error.message || "Sign up failed. Please try again.", {
                role: "alert",
                ariaLive: "assertive"
            });
        }
    };

    return (
        <div>
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
                <h2 className="form-title">Sign Up</h2>
                <input
                    style={{marginBottom: "20px"}}
                    placeholder="Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // value={formStuff.name}
                    // onChange={(handleChange)}
                    required
                />
                <input
                    style={{marginBottom: "20px"}}
                    placeholder="Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // value={formStuff.email}
                    // onChange={(handleChange)}
                    required
                />
                <input
                    style={{marginBottom: "8px"}}
                    placeholder="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // value={formStuff.password}
                    // onChange={(handleChange)}
                    required
                    minLength={4}
                />
                <br />
                <br />
                <button className="form-button" type="submit">Join Mean Money</button>
            </form>
            </div>
        </div>
    );
};
