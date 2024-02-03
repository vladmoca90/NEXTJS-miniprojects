"use client";
import Link from "next/link";
import { ChangeEvent, useCallback, useState } from "react";
import "./../app/styles/form-persons.css";

export default function FormPerson() {
    let personsUrl = "http://localhost:3000/api/form-persons";

    const [nameText, setNameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const getNameText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setNameText(e.target.value);
    }, []);

    const getPasswordText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordText(e.target.value);
    }, []);

    const submitPerson = useCallback(async () => {
        await fetch(personsUrl, {
            method: "POST",
            body: JSON.stringify({
                "name": nameText,
                "password": passwordText
            })
        })
    }, [nameText, passwordText, personsUrl]);

    const bookingBtnActive = useCallback(() => {
        if (nameText.length == 0 || passwordText.length == 0) {
            return `btn btn-submit disabled`;
        } else {
            return `btn btn-submit`;
        }
    }, [nameText, passwordText]);

    return (
        <form className="w-full max-w-sm form-container">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">Full Name</label>
                </div>
                <div className="md:w-2/3">
                    <input onChange={getNameText} value={nameText} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Jane Doe" />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">Password</label>
                </div>
                <div className="md:w-2/3">
                    <input onChange={getPasswordText} value={passwordText} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
                </div>
            </div>
            <div className="md:flex md:items-left mb-7">
                <div className="md:w-1/4"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold form-checkbox">
                    <input className="mr-2 leading-tight" type="checkbox" />
                    <span className="text-sm">Confirm terms and conditions!</span>
                </label>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/2"></div>
                <div className="md:w-2/3">
                    <Link onClick={submitPerson} href={{
                        pathname: "/person-details",
                        query: {
                            name: nameText.trim(),
                            password: passwordText.trim(),
                        }
                    }} className={bookingBtnActive()} type="button">Submit</Link>
                </div>
            </div>
        </form>
    );
}