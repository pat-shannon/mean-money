import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitNewUser } from "../../services/users.js";
import "./SignUpPage.css"


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


    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrorMessage("");


            // const formData = new FormData();
            // formData.append("name", name);
            // formData.append("email", email);
            // formData.append("password", password);


            const data = await submitNewUser(name, email, password);


            console.log("Signup successful:", data);
            navigate("/login");
        } catch (error) {
            console.error("Error during signup:", error);
            setErrorMessage(error.message);
        }
    };


    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
