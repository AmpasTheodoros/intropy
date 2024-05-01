"use client"
import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {}, []);

    return (
        <div>
            <SignIn/>
        </div>
    );
}