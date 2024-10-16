import React, { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        axios.get('/api/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);
    
    return (
        <div className="p-4">
            <AccountNav />
            <div className="grid gap-4 mt-4">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link 
                        key={booking._id} 
                        to={`/account/bookings/${booking._id}`} 
                        className="flex flex-col md:flex-row gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                    >
                        <div className="md:w-48 w-full">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-lg md:text-xl">{booking.place.title}</h2>
                            <div className="text-sm md:text-lg mt-2 md:mt-4 text-gray-500">
                                <BookingDates booking={booking} />
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="w-6 h-6 md:w-8 md:h-8"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" 
                                    />
                                </svg>
                                <span className="text-lg md:text-2xl">
                                    Total price: ${booking.price}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
