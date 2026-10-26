import { useState } from 'react';
import './Email.css';

export default function Email(){
    const [ recipient, setRecipient ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ body, setBody ] = useState('');
    const [ sentEmails, setSentEmails ] = useState([]);
    const [ templates, setTemplates ] = useState([
        {
            id: 1,
            option: 'Ticket refund confirmation',
            body: 'Dear [customer name],\n\nThank you for booking with Tiger Airlines and we are sorry to hear that you had to cancel your reservation.\n\nWe would like to confirm that your booking under reference number [pnr] has been cancelled.\nThe amount [amount and currency] will be refunded to the original payment method within 7 days.\n\nShould you have any additional inquiries, feel free to contact us at any time.\n\nBest regards,\n[name]\nTiger Airlines'
        }
    ]);

    const handleSelectTemplate = (e) => {
        const template = templates.find(t => t.option === e.target.value);
        setBody(template.body);
    }

    const handleSend = () => {
        if (!recipient.includes('@') || recipient.split('@').length > 2){
            alert('not an email');
        }

        const timestamp = new Date();

        setSentEmails([
            ...sentEmails,
            {
                recipient,
                timestamp: timestamp.toDateString(),
                subject,
                body
            }
        ]);

        setRecipient('');
        setSubject('');
        setBody('');
    }


    return (
        <div className="email-main">
            <div className="email-draft">
                <h2>Email Client</h2>
                <div className="email-draft-container">
                    <select onChange={e => handleSelectTemplate(e)}>
                        <option></option>
                        {templates.map(template => (
                            <option key={template.id}>{template.option}</option>
                        ))}
                    </select>
                    <div className="email-controls">
                        <div className="email-section">
                            <div className="email-section-label">To:</div>
                            <div className="email-section-input">
                                <input
                                    type="text"
                                    value={recipient}
                                    onChange={e => setRecipient(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="email-section">
                            <div className="email-section-label">Subject:</div>
                            <div className="email-section-input">
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <textarea
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </div>
                    <div className="button" onClick={handleSend}>Send</div>
                </div>
            </div>
            <div className="email-sent">
                <h2>Sent Items</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>Recipient</td>
                                <td>Date</td>
                                <td>Subject</td>
                                <td>Body</td>
                            </tr>
                        </thead>
                        <tbody>
                            {sentEmails.map(sentEmail => (
                                <tr>
                                    <td>{sentEmail.recipient}</td>
                                    <td>{sentEmail.timestamp}</td>
                                    <td>{sentEmail.subject}</td>
                                    <td>{sentEmail.body.slice(0, 40)}...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}