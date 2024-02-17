"use client";
import "./styles/cookieButtons.css";
import { useCallback, useEffect, useState } from "react";

export default function ButtonMain() {
    const btnCookieUrl = "http://localhost:3000/api/cookies/buttons/add";

    const addBtnCookie = useCallback(async () => {
        await fetch(btnCookieUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "VLadMocanu"
            }),
        });
    }, []);

    return (
        <div id="buttonContent" className="inline-flex">
            <button type="button" onClick={addBtnCookie} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Add
            </button>
            <button type="button" className="focus:outline-none border border-gray-300 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Remove
            </button>
        </div>
    );
}