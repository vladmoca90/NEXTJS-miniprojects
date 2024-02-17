"use client";
import "./styles/cookieButtons.css";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ButtonMain() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsLogin(true);
    }, []);

    const setLogin = useCallback(async () => {
        Cookies.set("name", "VladMocanu", {
            expires: 2,
        });
    }, []);

    // const getLogin = useCallback(async () => {
    //     const loginValue = Cookies.get("name");
    // }, []);

    if (!isLogin) {
        return null;
    }

    return (
        <div id="buttonContent" className="inline-flex">
            <button type="button" onClick={setLogin} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Login
            </button>
            <button type="button" className="focus:outline-none border border-gray-300 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Logout
            </button>

            {Cookies.get("name") && (
                <div className="flex items-center justify-center flex-col gap-3">
                    <p className="mt-5 text-xl">
                        {"user-pref" + ": " + Cookies?.get("user-pref")}
                    </p>
                </div>
            )}
        </div>
    );
}