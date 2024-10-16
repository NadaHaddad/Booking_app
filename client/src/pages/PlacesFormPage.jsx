import React,{useEffect, useState} from 'react'
import PhotoUploader from '../components/PhotoUploader';
import Features from '../components/Features';
import AccountNav from '../components/AccountNav';
import axios from "axios";
import { Navigate, useParams ,useNavigate} from 'react-router-dom';
export default function PlacesFormPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    console.log({id});
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [features,setFeatures] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice]=useState(100);
    const [redirect,setRedirect]=useState(false);
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get('/api/places/'+id).then(response=>{
        const {data}=response;
        setTitle(data.title);
        setAddress(data.address);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setDescription(data.description);
        setExtraInfo(data.extraInfo);
        setFeatures(data.features);
        setAddedPhotos(data.photos);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
    },[id])
    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
      }
      function inputDescription(text) {
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        );
      }
      function preInput(header,description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }
      async function savePlace(ev) {
        ev.preventDefault();
        const PlaceData={title, address, addedPhotos,
          description, features, extraInfo,
          checkIn, checkOut, maxGuests,price}
        if(id){//update
          await axios.put("/api/places", {
            id,...PlaceData
          }); 
        }
        else{//create 
          await axios.post("/api/places", PlaceData); 
        }
        setRedirect(true); 
      }
      async function handleDelete() {
        if (window.confirm('Are you sure you want to delete this place?')) {
          try {
            await axios.delete(`/api/places/${id}`);
            alert('Place deleted successfully!');
            navigate('/account/places'); 
          } catch (error) {
            console.error('There was an error deleting the place!', error);
            alert('Failed to delete the place. Please try again.');
          }
        }
      }
    
    
      if (redirect) {
        return <Navigate to={'/account/places'} />
      }

  return (
    <div>
      <AccountNav/>
    <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="title, for ex:my lovely appartement" />
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address" />
        {preInput('Photos','more = better')}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev=>setDescription(ev.target.value)}></textarea>  
        {preInput('Features','select all the features of your place')}
        <div className='grid mt-4 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <Features selected={features} onChange={setFeatures}/>
        </div>
        {preInput('Extra info','house rules, etc')}
        <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
            <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder="14:00"></input>
            </div>
            <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder="11:00"></input>
            </div>
            <div>
                <h3 className='mt-2 -mb-1'>Max guests</h3>
                <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}></input>
            </div>
            <div>
                <h3 className='mt-2 -mb-1'>Price per night</h3>
                <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)}></input>
            </div>
        </div>
        <div className='flex gap-4 mt-4'>
          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded w-1/2'>Save</button>
          {id && (
            <button
              type='button'
              onClick={handleDelete}
              className='bg-red-500 text-white py-2 px-4 rounded w-1/2'
            >
              Delete
            </button>
          )}
        </div>
        


        
    </form>
</div>
  )
}
