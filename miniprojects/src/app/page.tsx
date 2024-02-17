"use client";
import Cookies from "js-cookie"
import { useCallback } from "react";

export default function CookieForm() {
    const formUrl = "http://localhost:3000/api/cookies/form";

    const getFormCookie = useCallback(async () => {
        await fetch(formUrl);
    }, []);

    return (
        <main className="flex mt-5 flex-col items-center justify-center">
            <h1 className="my-5 text-center text-2xl font-bold">
                Getting and Setting Cookies in Next.js
            </h1>
            <div>
                <h2 className="m-5 text-center text-3xl font-semibold">Set Cookie</h2>
                <form action={getFormCookie}>
                    <input type="email" className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md" placeholder="email" name="email" />
                    <input type="password" className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md" placeholder="password" name="password" />
                    <button className="bg-blue-600 rounded-md px-6 py-2 w-full text-white">Login</button>
                </form>
            </div>
            <div className="mt-5">
                <div className="mt-5">
                    <h2 className="mt-5 text-center text-3xl font-semibold">{" "} Cookie Value</h2>
                    {
                        Cookies.get("user-pref") && (
                            <div className="flex items-center justify-center flex-col gap-3">
                                <p className="mt-5 text-xl">
                                    {"user-pref" + ": " + Cookies?.get("user-pref")}
                                </p>
                                <button className="bg-blue-600 rounded-md px-6 py-2 w-fit mx-auto text-white">Remove cookie</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </main>
    );
}