"use client";
import "./styles/send-message.css";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function SendMessage() {
    const [message, setMessage] = useState("");

    const getMessage = useCallback(async (e: { target: { value: string } }) => {
        setMessage(e.target.value);
    }, []);

    return (
        <div id="sendText">
            <form className="max-w-sm mx-auto">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea onChange={getMessage} value={message} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                <Link className="messageBtn" href={{
                    pathname: "/send-message/message-value",
                    query: {
                        "messageText": message,
                    },
                }}>Submit</Link>
            </form>
            <p id="yourText">{message}</p>
        </div>
    );
}