import { useContext } from "react";
import { LoginContext } from "./loginContext/LoginContext";

export default function LoginComponent() {
    const {
        setUsername,
        setShowProfile,
    } = useContext(LoginContext);

    return (
        <div id="loginContainer">
            <div>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(event) => {
                        setUsername(
                            event.target.value
                        );
                    }}
                />

                <input
                    type="text"
                    placeholder="Password..."
                />

                <button
                    className="login-btn"
                    onClick={() => {
                        setShowProfile(true);
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}