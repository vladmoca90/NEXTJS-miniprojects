"use client";
import "./styles/send-message.css";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";

export default function SendMessage() {
    const [message, setMessage] = useState("");
    const router = useRouter();

    const getMessage = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        router.push({
            pathname: "/send-message/message-value",
            query: { messageText: message },
        });
    };

    return (
        <div id="sendText">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea
                    onChange={getMessage}
                    value={message}
                    id="message"
                    name="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                />
                <button type="submit" className="messageBtn">Submit</button>
            </form>
            <p id="yourText">{message}</p>
        </div>
    );
}
