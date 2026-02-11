"use client";
import "./styles/cookie-buttons.css";
import { useCallback, useState } from "react";

export default function BtnCookieComponent() {
    const btnAddCookieUrl = "http://localhost:3000/api/cookies/buttons/add";
    const deletedCookieUrl = "http://localhost:3000/api/cookies/buttons/remove";
    
    // State to manage loading and error messages
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addCookie = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Reset error state before the request
        try {
            const response = await fetch(btnAddCookieUrl);
            if (!response.ok) {
                throw new Error('Failed to add cookie');
            }
            // Optionally process the response
            const data = await response.json();
            console.log('Cookie added:', data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [btnAddCookieUrl]);

    const removeCookie = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Reset error state before the request
        try {
            const response = await fetch(deletedCookieUrl);
            if (!response.ok) {
                throw new Error('Failed to remove cookie');
            }
            // Optionally process the response
            const data = await response.json();
            console.log('Cookie removed:', data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [deletedCookieUrl]);

    return (
        <div id="buttonContent" className="inline-flex">
            <button 
                type="button" 
                onClick={addCookie} 
                disabled={isLoading}
                className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {isLoading ? "Adding..." : "Add"}
            </button>
            <button 
                type="button" 
                onClick={removeCookie} 
                disabled={isLoading}
                className={`focus:outline-none border border-gray-300 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 me-2 mb-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {isLoading ? "Removing..." : "Remove"}
            </button>
            {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
        </div>
    );
}
