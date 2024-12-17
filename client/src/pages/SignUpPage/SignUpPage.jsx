import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitNewUser } from "../../services/users.js";
import "./SignUpPage.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


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

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        
        if (newName && !validateName(newName)) {
            toast.error("Name can only contain letters, spaces, apostrophes, hyphens", {
                position: "top-right",
                autoClose: 3000
            });
        }
    };
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
                toast.error("Name can only contain letters, spaces, apostrophes, hyphens. Please enter a valid name", {
                    position: "top-right",
                    autoClose: 1000
                });
                return;
            }

            try {
                setErrorMessage("");
            const data = await submitNewUser(name, email, password);

            console.log("Signup successful:", data);
        

            toast.success("Sign up successful! Please log in.", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
    

            setName("");
            setEmail("");
            setPassword("");
    

            setTimeout(() => {
                navigate("/login");
            }, 1500);
    
        } catch (error) {
            console.error("Error during signup:", error);
            setErrorMessage(error.message);

            toast.error(error.message || "Sign up failed. Please try again.", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
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
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor="name">Name:</label>
                <br></br>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // value={formStuff.name}
                    // onChange={(handleChange)}
                    required
                />
                <br />
                <br />
                <label htmlFor="email">Email:</label>
                <br></br>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // value={formStuff.email}
                    // onChange={(handleChange)}
                    required
                />
                <br />
                <br />
                <label htmlFor="password">Password:</label>
                <br></br>
                <input
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
                <button className="submit-button" type="submit">Join Mean Money Now!</button>
            </form>
        </div>
    );
};
