import React, { useState } from 'react';

function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

const SessionStorage = () => {
    const [item, setItem] = useState(false);
    if (!item) {
        return (
            <>
                <h2>Please set a paragraph...!!</h2>
                <button onClick={() => { setItem(true) }}>Set Value</button>
            </>
        )
    }
    return <h2>Session Storage..!</h2>
}

export default SessionStorage;