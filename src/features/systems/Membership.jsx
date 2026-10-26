import { useState } from 'react';
import './Membership.css';

export default function Membership({ membershipData }){
    const [ memberFound, setMemberFound ] = useState(false);
    const [ memberSearched, setMemberSearched ] = useState(false);

    function handleSubmit(e){
        if (e.key !== 'Enter') return;
        setMemberSearched(true);
        if (membershipData.number === e.target.value.trim()){
            setMemberFound(true);
            console.log(membershipData);
        } else {
            setMemberFound(false);
        };
    }

    return (
        <div className="membership">
            <h3>Membership System</h3>
            <div className="membership-controls">
                <input className="membership-search-input" onKeyDown={e => handleSubmit(e)} />
            </div>
            <div className="membership-content">
                {memberFound && <MembershipDetails membershipData={membershipData} />}
                {!memberFound && memberSearched && <div>Member not found</div>}
            </div>
        </div>
    );
}

function MembershipDetails({ membershipData }){
    return (
        <div className="membership-details">
            <div className="membership-details-info">
                <div className="membership-details-personal">
                    <div className="membership-details-personal-name"><strong>{membershipData.name}</strong></div>
                    <div className="membership-details-personal-dob">Date of birth: {membershipData.dob}</div>
                    <div className="membership-details-personal-phone">Phone: {membershipData.phone}</div>
                    <div className="membership-details-personal-email">Email: {membershipData.email}</div>
                </div>
                <div className="membership-details-status">
                    <div className="membership-details-status-enrollment">Enrolled on: {membershipData.enrollmentDate}</div>
                    <div className="membership-details-status-tier">Tier: {membershipData.tier}</div>
                    <div className="membership-details-status-points">Status points: {membershipData.points}</div>
                    <div className="membership-details-status-miles">Miles: {membershipData.miles}</div>
                </div>
            </div>
            <div className="membership-details-validity">
                <div className="membership-details-state">
                    <div className="membership-details-state-status">Status: {membershipData.accountStatus.status}</div>
                    <div className="membership-details-state-status">Failed logins: {membershipData.accountStatus.failures}</div>
                </div>
                <div className="membership-details-block">      
                    <div className="membership-details-block-message">
                        <div className="membership-details-block-code circled-sign">{membershipData.blockCode.type}</div>  
                        {membershipData.blockCode.message.toUpperCase()}
                    </div>    
                </div> 
            </div>
        </div>
    )
}