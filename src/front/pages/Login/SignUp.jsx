import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useEffect, useState } from "react";

function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleMandarDatos(e) {
        e.preventDefault();
        console.log(form);
        fetch('http://127.0.0.1:3001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
        navigate("/");
    }

    return (
        <div className="contenedor">
            <div className="container-signUp">
                <h2 className="h2-login">SignUp</h2>
                <form onSubmit={(e) => handleMandarDatos(e)}>
                    <fieldset className="fieldset-login fieldset-signUp">
                        <label>Nombre:</label>
                        <input value={form.name} onChange={handleForm} name="name" type="text" placeholder="Enter your name.." />
                    </fieldset>
                    <fieldset className="fieldset-login fieldset-signUp">
                        <label>Email:</label>
                        <input value={form.email} onChange={handleForm} name="email" type="email" placeholder="Enter your email.." />
                    </fieldset>
                    <fieldset className="fieldset-login fieldset-signUp">
                        <label>Password:</label>
                        <input
                            onChange={handleForm}
                            value={form.password}
                            name="password"
                            type="password"
                            placeholder="Enter your password.."
                        />
                    </fieldset>
                    <button className="btn-login" type="submit">SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
