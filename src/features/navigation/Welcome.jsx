import { UserContext } from '../../contexts/UserContext';
import { useState, useContext } from 'react';
import './Welcome.css';

export default function Welcome({setAuthenticated}){
    const pw = 'Cathay';

    const { setUser } = useContext(UserContext);
    const [ nameInput, setNameInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordInput !== pw) {
            handleWrongPassword();
            return;
        }
        setUser(nameInput);
        setAuthenticated(true);
    }

    const handleWrongPassword = () => {
        const errorMsg = document.querySelector('.welcome-password-error');
        const submitBtn = document.querySelector('button.submit');
        errorMsg.classList.remove('hidden');
        submitBtn.disabled = true;
        setTimeout(() => {
            errorMsg.classList.add('hidden');
            submitBtn.disabled = false;
        }, 2000);
    }

    return(
        <form className="welcome" onSubmit={e => handleSubmit(e)}>
            <h1>Customer Contact Simulator</h1>
            <div className="welcome-credentials">
                <div className="welcome-section">
                    <label className="welcome-label">
                        Your Name
                        <div className="welcome-input">
                            <input
                                type="text"
                                autoComplete="username"
                                value={nameInput}
                                onChange={e => setNameInput(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className="welcome-section">
                    <label className="welcome-label">
                        Password
                        <div className="welcome-input">
                            <input
                                type="password"
                                autoComplete="current-password"
                                value={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
            </div>
            <div className="welcome-password-error hidden">
                Invalid password
            </div>
            <button
                type="submit"
                disabled={!nameInput || !passwordInput}
                className="submit">
                    Access
            </button>
        </form>
    );
}