import React, { useState } from 'react'
import "./ModeSelect.css"

const ModeSelect = () => {

    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="toggle-container">
            <div className="toggle-label">쉬운모드</div>
            <div className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
                <div className="toggle-circle"></div>
            </div>
        </div>
    );
}

export default ModeSelect