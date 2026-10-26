import { useState } from 'react';
import './Case.css';

export default function Case(){


    return(
        <div className="case-management">
            <h3>Case Management</h3>
            <div className="case-management-buttons">
                <CaseButton label="Create" />
                <CaseButton label="Search" />
            </div>
            <div className="case-management-body">
                <CaseCreate />
            </div>
        </div>
    );
}

function CaseButton({ label }) {
    return (
        <div className="case-button">
            {label}
        </div>
    );
}

function CaseCreate(){
    return (
        <div className="case-create">
            <div>
                <label>Case Type</label>
                <select>
                    <option>Complaint</option>
                    <option>Compliment</option>
                    <option>Baggage Claim</option>
                </select>
            </div>
            <div>
                <label>Booking Number</label>
                <input type="text"></input>
            </div>
            <div>
                <label>Passenger's Name</label>
                <input type="text"></input>
            </div>
            <div>
                <label>Case Description</label>
                <textarea></textarea>
            </div>

            <button>Create</button>
        </div>
    );
}