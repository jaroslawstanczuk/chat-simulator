import { useContext, useState, useEffect } from 'react';
import './Exchange.css';
import { UserContext } from '../../contexts/UserContext';
import Feedback from '../Feedback';

export default function Exchange({scenario, checkpoint, choice, setChoice, customerDetails, qualityEvaluation, setScroll, customerTimestamp, agentTimestamp, firstComponentMount = false}){

    const { user } = useContext(UserContext);

    if (checkpoint === 'end'){
        return <Feedback qualityEvaluation={qualityEvaluation} />
    }

    const [ firstMount, setFirstMount ] = useState(firstComponentMount);

    useEffect(() => {
        if (!firstMount) return;
        setTimeout(() => {
            setScroll(true);
            console.log('scrolling triggered from Exchange')
            setFirstMount(false);
        }, 1000);
    }, []);

    const replacePlaceholders = (text) => {
        let output = text;
        output = output.replaceAll('<username>', user);
        output = output.replaceAll('<customerSalutation>', customerDetails.customerSalutation);
        output = output.replaceAll('<customerFirstName>', customerDetails.customerFirstName);
        output = output.replaceAll('<customerLastName>', customerDetails.customerLastName);
        output = output.replaceAll('<customerBooking>', customerDetails.customerBooking);
        output = output.replaceAll('<membershipNumber>', customerDetails.customerMembership);
        return output;
    }

    return <div className="msg">
        <div className="msg-customer">
            <div className="msg-customer-name">{customerDetails.customerName}</div>
            <div className="msg-customer-content">{replacePlaceholders(scenario[checkpoint].message)}</div>
            <div className="msg-timestamp">{customerTimestamp}</div>
        </div>
        {!firstMount && <><div className="msg-user-name">{user}</div>
            <div className="msg-employee">
            {scenario[checkpoint].image && <img src={scenario[checkpoint].image} />}
            {scenario[checkpoint].sharedReply && <div className="msg-shared-reply">{replacePlaceholders(scenario[checkpoint].sharedReply)}</div>}
            {choice
                ?   
                    <>
                        <div>
                            {scenario[checkpoint].options.find(option => option.id === Number(choice)).option}
                        </div>
                    </>
                :   <div className="msg-employee-options">
                        {scenario[checkpoint].options.map(option => 
                            <Option key={option.id} option={option} setChoice={setChoice} />
                        )}
                    </div>
            }
        </div>
        <div className="msg-agent-timestamp">{agentTimestamp}</div>
        </>}
    </div>
}

function Option({option, setChoice}){
    const handleChoice = (e) => {
        setChoice(e.target.id);
        // setScroll(true);
    }

    return <div className={option.goto !== 'end' ? "option" : "option-deadend"} id={option.id} onClick={handleChoice}>
        {option.option}
    </div>
}