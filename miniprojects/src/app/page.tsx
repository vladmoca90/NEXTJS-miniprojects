"use client";
import { ChangeEvent, useCallback, useState } from "react";
import "./styles/appointment-details.css";
import Link from "next/link";

export default function AppointmentForm() {
    let appointmentsUrl = "http://localhost:3000/api/appointment";

    const [forenameText, setForenameText] = useState("");
    const [surnameText, setSurnameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passText, setPassText] = useState("");
    const [passConfirmText, setPassConfirmText] = useState("");
    const [phoneText, setPhoneText] = useState("");
    const [workplaceText, setWorkplaceText] = useState("");

    const getForenameText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setForenameText(e.target.value);
    }, []);

    const getSurnameText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setSurnameText(e.target.value);
    }, []);

    const getEmailText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setEmailText(e.target.value);
    }, []);

    const getPassText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setPassText(e.target.value);
    }, []);

    const getPassConfirmText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setPassConfirmText(e.target.value);
    }, []);

    const getPhoneText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneText(e.target.value);
    }, []);

    const getWorkplaceText = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        setWorkplaceText(e.target.value);
    }, []);

    // Validation functions for the form functionality.
    const getPassMatch = useCallback(() => {
        if (passText !== passConfirmText) {
            return `password-match password-alert`;
        } else {
            return `password-match`;
        }
    }, [passConfirmText, passText]);

    const getEmailValidation = useCallback(() => {
        if (emailText.indexOf("@") === -1) {
            return `email-validation email-alert`;
        } else if (emailText.length === 0) {
            return `email-validation`;
        } else {
            return `email-validation`;
        }
    }, [emailText]);

    const appointmentBtnActive = useCallback(() => {
        if (forenameText.length === 0 || surnameText.length === 0 || passText.length === 0 || passConfirmText.length === 0 || emailText.length === 0 || phoneText.length === 0 || workplaceText.length === 0) {
            return `btn btn-submit disabled`;
        } else {
            return `btn btn-submit`;
        }
    }, [emailText.length, forenameText.length, passConfirmText.length, passText.length, phoneText.length, surnameText.length, workplaceText.length]);

    const submitAppointment = useCallback(async () => {
        await fetch(appointmentsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "forename": forenameText,
                "surname": surnameText,
                "email": emailText,
                "password": passText,
                "passConfirm": passConfirmText,
                "phone": phoneText,
                "workplace": workplaceText,
            })
        });

        getPassMatch();
        getEmailValidation();
    }, [appointmentsUrl, forenameText, surnameText, emailText, passText, passConfirmText, phoneText, workplaceText, getPassMatch, getEmailValidation]);

    return (
        <div id="appointments">
            <form className="max-w-md mx-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={getForenameText} value={forenameText} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={getSurnameText} value={surnameText} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={getEmailText} value={emailText} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    <span className={getEmailValidation()}>The email is not valid!</span>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={getPassText} value={passText} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={getPassConfirmText} value={passConfirmText} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    <span className={getPassMatch()}>The password does not match!</span>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={getPhoneText} value={phoneText} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={getWorkplaceText} value={workplaceText} type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Workplace</label>
                    </div>
                </div>
                <Link href={{
                    pathname: "/appointment-details",
                    query: {
                        "forename": forenameText,
                        "surname": surnameText,
                    }
                }} className={appointmentBtnActive()} onClick={submitAppointment} type="button">Submit</Link>
            </form>
        </div>
    );
}