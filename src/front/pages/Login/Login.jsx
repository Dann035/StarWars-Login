
import "./Login.css";
import { Link, useNavigate } from "../../../../node_modules/react-router-dom/dist/index.mjs";
import { useState } from "react";


function Login() {
    const navigate = useNavigate();
    const [dataToken, setDataToken] = useState({});
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function loginDatos(e) {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        });
        if (!response.ok) {
            console.log("Something went wrong");
            return;
        }
        const data = await response.json();
        setDataToken(data);
        navigate("/home");
    }
    localStorage.setItem("token", dataToken);


    return (
        <div className="contenedor">
            <div className="login-container">
                <h2 className="h2-login">Login</h2>
                <form onSubmit={loginDatos}>
                    <fieldset className="fieldset-login">
                        <label>Email:</label>
                        <input
                            onChange={handleForm}
                            value={form.email}
                            name="email"
                            type="email"
                            placeholder="Enter your email.."
                        />
                    </fieldset>
                    <fieldset className="fieldset-login">
                        <label>Password:</label>
                        <input
                            onChange={handleForm}
                            value={form.password}
                            name="password"
                            type="password"
                            placeholder="Enter your password.."
                        />
                    </fieldset>

                    <button className="btn-login mb-2" type="submit">Login</button>
                    <Link to="/signUp">
                        <button className="btn-login" type="button">SignIn</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
