import { useState, useEffect } from 'react';
import './Sidebar.css';

export default function Sidebar({ setActiveScenario, setActivePage }){
    const [ isOpen, setIsOpen ] = useState(false);
    const [ scenarios, setScenarios ] = useState([]);

    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    }

    const handleClick = (filename) => {
        setActiveScenario(filename);
        setActivePage('interaction');
    }

    useEffect(() => {
            // fetch('./data/scenarios.json')
            fetch(`${import.meta.env.BASE_URL}data/scenarios.json`)
        .then(res => res.json())
        .then(data => {
            setScenarios(data.scenarios);
        });
    }, []);

    return (<div className="sidebar">
        <HamburgerButton onToggle={toggleMenu} />
        <div className={`sidebar-content ${isOpen ? 'active' : ''}`}>
            <h4>Choose a chat</h4>
            {scenarios && <div>
                {scenarios.map(scenario => <Button key={scenario.id} caption={scenario.description} onClick={() => handleClick(scenario.filename)}></Button>)}    
            </div>}
        </div>
    </div>);
}

function HamburgerButton({ onToggle }){
    return (
        <button className="hamburger" onClick={onToggle}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
}

function Button({caption, onClick}){
    return <div className="button" onClick={onClick} >
        {caption}
    </div>
}