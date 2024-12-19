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
    const  [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[a-zA-Z\d@$!%*?&#]{8,}$/;


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
        console.log("Form submitted")


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

            if (!passwordRegex.test(password)) {
                setPasswordErrorMessage("password is not valid");
                toast.error("Password must include: one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.", {
                    position: "top-right",       
                    autoClose: 4000,            
                    hideProgressBar: true,      // Remove the progress bar for a cleaner look
                    closeOnClick: true,         // Allow clicking to dismiss
                    pauseOnHover: true,         // Pause when hovered over
                    role: "alert",
                    ariaLive: "assertive",
                    style: {
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        border: "1px solid #f5c6cb",
                        borderRadius: "5px",
                        fontSize: "14px",
                    },
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
                <label htmlFor="name" className="form-label">Name</label>
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
                <label htmlFor="email" className="form-label">Email</label>
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
                <label htmlFor="password" className="form-label">Password</label>
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
                    // minLength={4}
                />
                <br />
                <br />
                <button className="form-button" type="submit">Join Mean Money</button>
            </form>
            </div>
        </div>
    );
};
