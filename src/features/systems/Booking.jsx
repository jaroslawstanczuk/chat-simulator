import { useState } from 'react';
import './Booking.css';

const Booking = ({ bookingData }) => {
    const [ bookingSearched, setBookingSearched ] = useState('');
    const [ bookingFound, setBookingFound ] = useState(false);

    function handleSubmit(e){
        if (e.key !== 'Enter') return;
        if (!bookingData.pnr){
            setBookingFound(false);
            return;
        }
        setBookingSearched(e.target.value.toUpperCase());
        if (bookingData.pnr === e.target.value.toUpperCase().trim()){
            setBookingFound(true);
        } else {
            setBookingFound(false);
        };
    }

    return (
        <div className="booking">
            <h3>Booking System</h3>
            <div className="booking-controls">
                <input className="booking-search-input" onKeyDown={e => handleSubmit(e)} />
                <button>New booking</button>
            </div>

            {!bookingFound && bookingSearched && <div>BOOKING NOT FOUND</div>}
            {bookingFound && <Reservation bookingData={bookingData} />}
        </div>
    );
}

function Reservation({ bookingData }){
    const formatDate = (days) => {
        if (typeof days === 'string') return days;

        const date = new Date;
        
        date.setDate(date.getDate() + days);

        const day = String(date.getDate()).padStart(2, '0');
        const months = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];
        const month = months[date.getMonth()];

        const year = String(date.getFullYear()).slice(-2);

        return `${day}${month}${year}`;
    }

    return (
        <div className="reservation">
            <div className="reservation-section">
                <h4>Passengers</h4>
                <div className="passengers">
                    {bookingData.passengers.map((passenger, idx) => (
                        <div className="passenger">
                            {idx + 1}. {passenger.firstName} {passenger.lastName}
                        </div>
                    ))}
                </div>
            </div>
            <div className="reservation-section">
                <h4>Contact details</h4>
                <div className="contact-details">
                    {bookingData.contactDetails.map((contactDetail) => (
                        <div className="contact-detail">
                            <div><strong>{contactDetail.mean}:</strong></div>
                            <div>{contactDetail.contact}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="reservation-section">
                <h4>Flights</h4>
                <div className="flights">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Flt no</th>
                                <th>Date</th>
                                <th>Class</th>
                                <th>Orig</th>
                                <th>Dest</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.flights.map((flight, idx) => (
                                <tr className="flight">
                                    <td>{idx + 1}.</td>
                                    <td>{flight.number}</td>
                                    <td>{formatDate(flight.date)}</td>
                                    <td>{flight.class}</td>
                                    <td>{flight.origin}</td>
                                    <td>{flight.destination}</td>
                                    <td>{flight.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default Booking;