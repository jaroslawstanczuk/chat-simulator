import { useState } from 'react';
import './Toggler.css';


export default function Toggler({ caption }){
    const [ enabled, setEnabled ] = useState(false);
    
    return (
        <div className="toggle-wrapper">
        <span className="toggle-label">{caption}</span>
        <div 
            className={`toggle ${enabled ? "enabled" : ""}`}
            onClick={() => setEnabled(!enabled)}
        >
            <div className="toggle-circle"></div>
        </div>
        </div>
    );
}