// Import footer component here.

import React from "react";
import Image from "next/image";
import { useState } from "react";

const Footer: React.FC = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    return (
        <footer>
            <div className="container">
                <div className="container mx-auto flex flex-col items-center justify-center">
                    <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
                </div>
                <div className="flex space-x-2 mb-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </div>
                <div className="copy">
                    &copy; {year} Fur Ink. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;