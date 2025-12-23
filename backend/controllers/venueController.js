import Venue from "../models/venue.js";

// list 

export const getVenues = async (req, res) => {
  const venues = await Venue.find().populate("createdBy", "name email");
  res.json(venues);
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
