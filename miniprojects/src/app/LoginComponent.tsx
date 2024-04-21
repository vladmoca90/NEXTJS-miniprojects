import { useContext } from "react";
import { LoginContext } from "./login/loginContext/LoginContext";

export default function LoginComponent() {
    const { setUsername, setShowProfile } = useContext(LoginContext);
    // get the LoginContext and pass the setUsername that you pass through the provider.

    return (
        <div id="loginContainer">
            <div>
                <input type="text" placeholder="Username..." onChange={(event) => { setUsername(event.target.value); }} />
                <input type="text" placeholder="Password..." />
                <button className="login-btn"
                    onClick={() => {
                        setShowProfile(true);
                    }}>Login</button>
            </div>
        </div>
    );
}