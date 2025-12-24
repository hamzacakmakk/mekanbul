import Venue from "../models/venue.js";

// list 

export const getVenues = async (req, res) => {
  const venues = await Venue.find().populate("createdBy", "name email");
  res.json(venues);
};

// get by id

export const getVenueById = async (req, res) => {
  const venue = await Venue.findById(req.params.id).populate("createdBy", "name email");
  
  if (!venue) {
    return res.status(404).json({ message: "Mekan bulunamadı" });
  }
  
  res.json(venue);
};

//post

export const createVenue = async (req, res) => {
  const {
    name,
    description,
    address,
    location,
    latitude,
    longitude,
  } = req.body;

  if (
    !name ||
    !description ||
    !address ||
    !location ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return res.status(400).json({ message: "Tüm alanlar zorunlu" });
  }

  const venue = await Venue.create({
    name,
    description,
    address,
    location,
    latitude,
    longitude,
    createdBy: req.user._id, // admin
  });

  res.status(201).json(venue);
};

//update

export const updateVenue = async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    return res.status(404).json({ message: "Mekan bulunamadı" });
  }

  venue.name = req.body.name || venue.name;
  venue.description = req.body.description || venue.description;
  venue.address = req.body.address || venue.address;
  venue.location = req.body.location || venue.location;
  venue.latitude =
    req.body.latitude !== undefined ? req.body.latitude : venue.latitude;
  venue.longitude =
    req.body.longitude !== undefined ? req.body.longitude : venue.longitude;

  const updatedVenue = await venue.save();
  res.json(updatedVenue);
};

//delete

export const deleteVenue = async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    return res.status(404).json({ message: "Mekan bulunamadı" });
  }

  await venue.deleteOne();
  res.json({ message: "Mekan silindi" });
};


//comment 


export const addComment = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Yorum boş olamaz" });
  }

  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    return res.status(404).json({ message: "Mekan bulunamadı" });
  }

  const comment = {
    user: req.user._id,
    text,
  };

  venue.comments.push(comment);
  await venue.save();

  res.status(201).json(venue.comments);
};
