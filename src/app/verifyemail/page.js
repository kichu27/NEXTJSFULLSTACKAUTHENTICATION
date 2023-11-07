"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await fetch('/api/verifyemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                setVerified(true);
            } else {
                setError(true);
                const errorData = await response.json();
                console.log(errorData);
            }
        } catch (error) {
            setError(true);
            console.error(error);
        }
    }

    useEffect(() => {
                const urlToken = window.location.search.split("=")[1];
                setToken(urlToken || "");
           }, []);
        

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div>
            <h1>Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2>Email Verified</h2>
                    <Link href="/LOGIN">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    );
}
