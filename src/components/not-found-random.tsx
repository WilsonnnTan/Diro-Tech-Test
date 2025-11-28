"use client";

import { useState, useEffect } from "react";

interface RandomMessageProps {
    messages: string[];
}

export default function RandomNotFound({ messages }: RandomMessageProps) {
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        setMessage(messages[randomIndex]);
    }, [messages]);

    return (
        <span className="text-xl font-light tracking-wide text-neutral-50">
            {message}
        </span>
    );
}