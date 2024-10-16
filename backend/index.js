const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const UserModel = require('./models/UserModel');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const db = require('./database');
const app = express();
db()
const port = process.env.PORT ;
const jwtSecret=process.env.JWT_SECRET;
const cookieParser=require('cookie-parser');
const imageDownloader=require('image-downloader');
const multer=require('multer');
const path = require('path');
const fs=require('fs');
const PlaceModel = require('./models/PlaceModel');
const Booking = require('./models/BookingModel');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies.token;
    if (!token) {
      return reject(new Error('JWT must be provided'));
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return reject(err);
      }
      resolve(userData);
    });
  });
}

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const bcryptSalt = bcrypt.genSaltSync(10); 
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json({ error: e.message });
    }
});
app.post('/api/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await UserModel.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id,
         
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });
  app.get('/api/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const user=await UserModel.findById(userData.id)
        res.json(user);
      });
    } else {
      res.json(null);
    }
  });
  app.post("/api/logout",(req,res)=>{
    res.cookie('token','').json(true);
  })
  app.post("/api/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const destination = path.join(__dirname, 'uploads', newName);
    try {
      await imageDownloader.image({
        url: link,
        dest: destination,
      });
      res.json(newName);
    } catch (error) {
      console.error('Error downloading image:', error);
      res.status(500).json({ error: 'Failed to download the image' });
    }
  });
  const photosMiddleware=multer({dest: 'uploads/' });
  app.post("/api/upload-image", photosMiddleware.array('photos', 100), (req, res) => {
   const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
    const {path,originalname}=req.files[i];
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path + '.' +ext;
    fs.renameSync(path,newPath);
    const normalizedPath = newPath.replace(/\\/g, '/').replace('uploads/', '');
    uploadedFiles.push(normalizedPath);
   }
    res.json(uploadedFiles);
});
app.post("/api/places", async (req, res) => {
  try {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, features, extraInfo, checkIn, checkOut, maxGuests,price } = req.body;
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const placeDoc = await PlaceModel.create({
        owner:userData.id,title, address, photos:addedPhotos, description,
        features, extraInfo, checkIn, checkOut, maxGuests,price
      });
      res.json(placeDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/api/user-places',(req,res)=>{
  const {token}=req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await PlaceModel.find({owner:id}) );
  });
});
app.get('/api/places/:id',async(req,res)=>{
  const {id}=req.params;
  res.json(await PlaceModel.findById(id));
});
app.put('/api/places', async (req,res) => {
  const {token} = req.cookies;
  const {
    id, title,address,addedPhotos,description,
    features,extraInfo,checkIn,checkOut,maxGuests,price
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:addedPhotos,description,
        features,extraInfo,checkIn,checkOut,maxGuests,price
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
})
app.get('/api/places', async (req,res) => {
  res.json( await PlaceModel.find() );
});


app.post('/api/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const {
      place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    const booking = await Booking.create({
      place, checkIn, checkOut, numberOfGuests, name, phone, price,
      user: userData.id,
    });
    res.json(booking);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.delete('/api/places/:id', async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
      const placeDoc = await PlaceModel.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
          await PlaceModel.findByIdAndDelete(id);
          res.json({ message: 'Place deleted successfully' });
      } else {
          res.status(403).json({ message: 'Forbidden' });
      }
  });
});


app.get('/api/bookings', async (req,res) => {
 
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
