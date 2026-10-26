import { useState, useEffect } from 'react';
import './Sidebar.css';

export default function Sidebar({ setActiveScenario, setActivePage }){
    const [ scenarios, setScenarios ] = useState([]);

    const handleClick = (filename) => {
        setActiveScenario(filename);
        setActivePage('interaction');
    }

    useEffect(() => {
        fetch('./data/scenarios.json')
        .then(res => res.json())
        .then(data => {
            setScenarios(data.scenarios);
        });
    }, []);

    return (<div className="sidebar">
        <h4>Choose a chat</h4>
        {scenarios && <div>
            {scenarios.map(scenario => <Button key={scenario.id} caption={scenario.description} onClick={() => handleClick(scenario.filename)}></Button>)}    
        </div>}
    </div>);
}

function Button({caption, onClick}){
    return <div className="button" onClick={onClick} >
        {caption}
    </div>
}