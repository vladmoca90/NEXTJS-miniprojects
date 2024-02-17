"use client";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function Banner() {
    const [closed, setClosed] = useState(false);

    const closeBanner = useCallback(() => {
        setClosed(closed);
    },[closed]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div>
                <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                    <div role="alert" className="relative block w-full text-base font-regular px-4 py-4 rounded-lg bg-red-500 text-white flex">
                        <div className=" mr-12">
                            <p className="font-bold text-black">
                                🌟 Black Friday Sale <span className="text-white"> - Up to 50% off on fashion items!</span>
                                <span title="" className="inline-flex items-center justify-center text-sm font-bold text-yellow-300 transition-all ml-4 duration-200 rounded-md hover:text-gray-700" role="button">
                                    Get Now <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </span>
                            </p>
                        </div>
                        <Link href="##" onClick={closeBanner} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 !absolute top-3 right-3" type="button">
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}