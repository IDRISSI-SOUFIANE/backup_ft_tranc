"use client";

import { useState } from "react";

export default function Test() {
    console.log("Component rendered");

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)} >
            Count: {count}
        </button>
    );
}