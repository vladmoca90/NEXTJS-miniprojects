"use client";
import "./styles/cookieButtons.css";
import Cookies from "js-cookie";

export default function ButtonMain() {
    const loginBtn = async () => {
        Cookies.set("name", "VladMocanu");
    };

    return (
        <div id="buttonContent" className="inline-flex">
            <button type="button" onClick={loginBtn} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Login
            </button>
            <button type="button" className="focus:outline-none border border-gray-300 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Logout
            </button>
        </div>
    );
}