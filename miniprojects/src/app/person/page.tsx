"use client";
import "./../app/styles/person-details.css";
import Link from "next/link";
import { passValid } from "./person-details/validation";
import { ChangeEvent, useCallback, useState } from "react";

export default function FormPerson() {
    let personsUrl = "http://localhost:3000/api/person-details";

    const [nameText, setNameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const getNameText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setNameText(e.target.value);
    }, []);

    const getPasswordText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordText(e.target.value);
    }, []);

    const onChecked = useCallback(() => {
        setIsChecked(!isChecked);
    }, [isChecked]);

    const getPasswordCheck = useCallback(() => {
        if (passwordText.length === 0 || passwordText.match(passValid)) {
            return `validation-match`;
        } else if (passwordText.length === 0) {
            return 'validation-match validation-alert';
        } else {
            return 'validation-match';
        }
    }, [passwordText]);

    const getIfChecked = useCallback(() => {
        if (!isChecked) {
            return `validation-match`;
        } else if (!isChecked) {
            return 'validation-match validation-alert';
        } else {
            return 'validation-match';
        }
    }, [isChecked]);

    const personBtnState = useCallback(() => {
        if (nameText.length === 0 || passwordText.length === 0 || passwordText.match(passValid) || !isChecked) {
            return `btn btn-submit disabled`;
        } else {
            return `btn btn-submit`;
        }
    }, [isChecked, nameText, passwordText]);

    const submitPerson = useCallback(async () => {
        await fetch(personsUrl, {
            method: "POST",
            body: JSON.stringify({
                "name": nameText.trim(),
                "password": passwordText.trim(),
            })
        })
    }, [personsUrl, nameText, passwordText]);

    return (
        <form className="w-full max-w-sm form-container">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">Full Name</label>
                </div>
                <div className="md:w-2/3">
                    <input onChange={getNameText} value={nameText} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Your name" />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">Password</label>
                </div>
                <div className="md:w-2/3">
                    <input onChange={getPasswordText} value={passwordText} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="Your password" />
                    <span className={getPasswordCheck()}>The password is not valid</span>
                </div>
            </div>
            <div className="md:flex md:items-left mb-7">
                <div className="md:w-1/4"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold form-checkbox">
                    <input className="mr-2 leading-tight" type="checkbox" onChange={onChecked} checked={isChecked} />
                    <span className="text-sm block">Confirm terms and conditions!</span>
                    <span className={getIfChecked()}>You must agree with the term and conditions</span>
                </label>
            </div>
            <div className="md:flex md:items-center">
                <div className="btn-container">
                    <Link href={{
                        pathname: "/person-details",
                        query: {
                            "name": nameText.trim(),
                        }
                    }} className={personBtnState()} onClick={submitPerson} type="button">Submit</Link>
                </div>
            </div>
        </form>
    );
}