import Toggler from '../../components/Toggler';
import Interaction from '../../features/chat/Interaction';
import './Topbar.css';


export default function Topbar({setActivePage}){
    const pages = [
        {
            id: 1,
            title: 'Interaction',
            page: 'interaction'
        },
        {
            id: 2,
            title: 'Reservation',
            page: 'booking'
        },
        {
            id: 3,
            title: 'Case Management',
            page: 'case'
        },
        {
            id: 4,
            title: 'Membership',
            page: 'membership'
        },
        {
            id: 5,
            title: 'Outbound Email',
            page: 'email'
        },
    ]

    return (
        <div className="topbar">
            <div className="topbar-title">
                <h1>Customer Care Department Simulator</h1>
                <Toggler caption="Immediate Feedback" />
            </div>
            <div className="topbar-navigation">
                {pages.map(page => (
                    <div key={page.id} className="topbar-page-link" onClick={() => setActivePage(page.page)} >
                        {page.title}
                    </div>
                ))}
            </div>
        </div>
    );
}