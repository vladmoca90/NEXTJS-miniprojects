"use client";
import "./styles/appointment-details.css";
import Link from "next/link";
import { emailValid, passValid } from "./appointment-details/validation";
import { ChangeEvent, useCallback, useState } from "react";

export default function AppointmentForm() {
    const appointmentsUrl = "http://localhost:3000/api/appointment";

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
        if (emailText.length === 0 || emailText.match(emailValid)) {
            return `email-validation`;
        } else if (emailText.indexOf("@") === -1) {
            return `email-validation  email-alert`;
        } else {
            return `email-validation`;
        }
    }, [emailText]);

    const appointmentBtnActive = useCallback(() => {
        if (forenameText.length === 0 || surnameText.length === 0 || passText.length === 0 || passText !== passConfirmText
            || passText.match(passValid) || passConfirmText.length === 0 || emailText.length === 0 || emailText.match(emailValid)
            || emailText.indexOf("@") === -1 || phoneText.length === 0 || workplaceText.length === 0) {
            return `btn btn-submit`;
        } else {
            return `btn btn-submit disabled`;
        }

    }, [emailText, forenameText.length, passConfirmText, passText, phoneText.length, surnameText.length, workplaceText.length]);

    const submitAppointment = useCallback(async () => {
        await fetch(appointmentsUrl, {
            method: "POST",
            body: JSON.stringify({
                "forename": forenameText.trim(),
                "surname": surnameText.trim(),
                "email": emailText.trim(),
                "password": passText.trim(),
                "passConfirm": passConfirmText.trim(),
                "phone": phoneText.trim(),
                "workplace": workplaceText.trim(),
            })
        });
    }, [appointmentsUrl, forenameText, surnameText, emailText, passText, passConfirmText, phoneText, workplaceText]);

    return (
        <div id="appointments">
            <form className="max-w-md mx-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        <input onChange={getForenameText} value={forenameText} type="text" name="floating_first_name" id="floating_first_name" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        <input onChange={getSurnameText} value={surnameText} type="text" name="floating_last_name" id="floating_last_name" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="floating_email" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    <input onChange={getEmailText} value={emailText} type="email" name="floating_email" id="floating_email" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <span className={getEmailValidation()}>The email is not valid!</span>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="floating_password" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <input onChange={getPassText} value={passText} type="password" name="floating_password" id="floating_password" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    <input onChange={getPassConfirmText} value={passConfirmText} type="password" name="repeat_password" id="floating_repeat_password" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <span className={getPassMatch()}>The password does not match!</span>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_phone" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                        <input onChange={getPhoneText} value={phoneText} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_company" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Workplace</label>
                        <input onChange={getWorkplaceText} value={workplaceText} type="text" name="floating_company" id="floating_company" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                </div>
                <Link href={{
                    pathname: "/appointment-details",
                    query: {
                        "forename": forenameText.trim(),
                        "surname": surnameText.trim(),
                        "email": emailText.trim(),
                        "phone": phoneText.trim(),
                        "workplace": workplaceText.trim(),
                    }
                }} className={appointmentBtnActive()} onClick={submitAppointment} type="button">Submit</Link>
            </form>
        </div>
    );
}