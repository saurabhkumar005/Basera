# 🏠 Basera - Rental Listing Platform

**Basera** is a modern MERN stack web application designed to help users find and rent properties like rooms, flats, and hostels. It provides a seamless experience for property owners to list their spaces and for tenants to find their next home.

## ✨ Features

* **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
* **Property Listing**: Users can list properties with details like rent, amenities, and rules.
* **Image Upload**: Integrated with **Cloudinary** for seamless multi-image uploads.
* **Direct Contact**: "Chat on WhatsApp" feature to instantly connect tenants with owners.
* **Responsive UI**: Built with **React** and **Tailwind CSS** for a mobile-friendly experience.
* **Smart Search**: Filter properties by city, type (Flat, Room, PG), and price.
* **Favorites/Wishlist**: Save properties to view later (In Progress).

## 🛠️ Tech Stack

**Frontend:**

* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Lucide React (Icons)

**Backend:**

* Node.js & Express.js
* MongoDB (Mongoose)
* Multer, Cloudinary (Image Storage)
* JWT & Bcrypt (Auth & Security)



## 📂 Project Structure

```
basera/
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Full pages (Home, ListingDetails, etc.)
│   │   ├── context/    # Auth Context API
│   │   └── utils/      # Helper functions (ChatOnWhatsapp, etc.)
│
└── server/             # Node.js Backend
    ├── models/         # Mongoose Schemas (User, Listing)
    ├── routes/         # API Routes
    ├── controllers/    # Route Logic
    └── utils/          # Cloudinary config

```

## 🔮 Future Improvements

* [ ] Integration of Basera Chat system, so user and owner can directly contact each other on basera.
* [ ] Add map integration to show property locations. 
* [ ] Implement a review and rating system for listings.
* [ ] Admin dashboard for managing users and listings.
* [ ] Advance token payment system to book the property. 


## ⚖️ Copyright & License

**Copyright (c) 2026 Saurabh Kumar. All Rights Reserved.**

This project, **Basera**, including all of its source code, database architecture, and UI/UX design, is the exclusive intellectual property of Saurabh Kumar. 

This is **not** an open-source project. You may not use, copy, distribute, modify, or sell any part of this software without explicit written permission from the owner.

---

*Made with ❤️ by Saurabh Kumar*



