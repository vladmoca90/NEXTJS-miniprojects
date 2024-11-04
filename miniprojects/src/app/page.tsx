"use client";
import "./styles/appointment-details.css";
import { emailValid, passValid } from "./appointment/appointment-details/validation";
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

    const handleInputChange = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    }, []);

    const getPassMatch = useCallback(() => {
        return passText !== passConfirmText ? "password-match password-alert" : "password-match";
    }, [passConfirmText, passText]);

    const getEmailValidation = useCallback(() => {
        if (emailText.length === 0) {
            return "email-validation"; // No input, valid state
        } else if (!emailText.match(emailValid)) {
            return "email-validation email-alert"; // Invalid email
        }
        return "email-validation"; // Valid email
    }, [emailText]);

    const appointmentBtnActive = useCallback(() => {
        if (forenameText && surnameText && passText && passText === passConfirmText && passText.match(passValid) &&
            emailText && emailText.match(emailValid) && phoneText && workplaceText) {
            return "btn btn-submit"; // Active button
        }
        return "btn btn-submit disabled"; // Disabled button
    }, [emailText, forenameText, passConfirmText, passText, phoneText, surnameText, workplaceText]);

    const submitAppointment = useCallback(async (e: any) => {
        e.preventDefault(); // Prevent default form submission
        
        await fetch(appointmentsUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set content type
            },
            body: JSON.stringify({
                forename: forenameText.trim(),
                surname: surnameText.trim(),
                email: emailText.trim(),
                password: passText.trim(),
                phone: phoneText.trim(),
                workplace: workplaceText.trim(),
            })
        });
    }, [appointmentsUrl, forenameText, surnameText, emailText, passText, phoneText, workplaceText]);

    return (
        <div id="appointments">
            <form className="max-w-md mx-auto" onSubmit={submitAppointment}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        <input onChange={handleInputChange(setForenameText)} value={forenameText} type="text" name="floating_first_name" id="floating_first_name" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        <input onChange={handleInputChange(setSurnameText)} value={surnameText} type="text" name="floating_last_name" id="floating_last_name" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="floating_email" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    <input onChange={handleInputChange(setEmailText)} value={emailText} type="email" name="floating_email" id="floating_email" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <span className={getEmailValidation()}>The email is not valid!</span>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="floating_password" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <input onChange={handleInputChange(setPassText)} value={passText} type="password" name="floating_password" id="floating_password" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    <input onChange={handleInputChange(setPassConfirmText)} value={passConfirmText} type="password" name="repeat_password" id="floating_repeat_password" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <span className={getPassMatch()}>The password does not match!</span>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_phone" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                        <input onChange={handleInputChange(setPhoneText)} value={phoneText} type="tel" name="floating_phone" id="floating_phone" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_company" className="peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Workplace</label>
                        <input onChange={handleInputChange(setWorkplaceText)} value={workplaceText} type="text" name="floating_company" id="floating_company" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-gray dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                </div>
                <button className={appointmentBtnActive()} type="submit">Submit</button>
            </form>
        </div>
    );
}
