import { useState, useContext } from 'react';
import { UserContext } from "./contexts/UserContext";
import Topbar from "./features/navigation/Topbar";
import Interaction from "./features/chat/Interaction";
import Sidebar from "./features/navigation/Sidebar";
import Booking from './features/systems/Booking';
import './App.css';
import Welcome from './features/navigation/Welcome';
import Case from './features/systems/Case';
import Email from './features/systems/Email';
import Membership from './features/systems/Membership';

export default function App() {
    // const { user, setUser } = useContext(UserContext);
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ activeScenario, setActiveScenario ] = useState('');
    const [ bookingData, setBookingData ] = useState({});
    const [ membershipData, setMembershipData ] = useState({});
    const [ activePage, setActivePage ] = useState('interaction');


    return <div className="app">
            {!authenticated && <Welcome setAuthenticated={setAuthenticated} />}
            {authenticated && <><Topbar setActivePage={setActivePage} />
            <div className="page">
                <Sidebar
                    className="sidebar"
                    setActiveScenario={setActiveScenario}
                    setActivePage={setActivePage}
                />
                <div className="systems">
                    <div hidden={activePage !== 'interaction'}>
                        <Interaction
                            key={activeScenario}
                            activeScenario={activeScenario}
                            setBookingData={setBookingData}
                            setMembershipData={setMembershipData}
                        />
                    </div>
                    <div hidden={activePage !== 'booking'}>
                        <Booking bookingData={bookingData} />
                    </div>
                    <div hidden={activePage !== 'case'}>
                        <Case />
                    </div>
                    <div hidden={activePage !== 'membership'}>
                        <Membership membershipData={membershipData} />
                    </div>
                    <div hidden={activePage !== 'email'}>
                        <Email />
                    </div>
                </div>
            </div></>}
    </div>
}