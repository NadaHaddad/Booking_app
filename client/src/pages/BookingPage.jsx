import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../components/AdressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/api/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <h1 className="text-3xl font-bold">{booking.place.title}</h1>
    <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
    <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between flex-wrap">
      <div className="flex-1 mb-4 lg:mb-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Your booking information:</h2>
        <BookingDates booking={booking} />
      </div>
      <div className="bg-primary p-4 sm:p-6 text-white rounded-2xl flex-shrink-0">
        <div className="text-sm sm:text-base md:text-lg">Total price</div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold">${booking.price}</div>
      </div>
    </div>
    <PlaceGallery place={booking.place} />
  </div>
    
   
  );
}