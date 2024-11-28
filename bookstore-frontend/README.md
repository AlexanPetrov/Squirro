# Bookstore App

This is the **Bookstore App**, a frontend application that lists the best-selling books for each bookstore, displaying bookstore details such as ratings, establishment date, and country flags. The app uses a JSON:API-based backend for fetching the data.

## Features

- Displays a list of bookstores.
- Shows top 2 best-selling books (if available) for each store.
- Bookstore ratings represented as stars.
- Bookstore establishment date displayed in **DD.MM.YYYY** format.
- Country flags fetched dynamically based on ISO 3166-1 country codes.
- Fully responsive layout following the provided wireframe.

## Requirements

- Node.js (v18 or above recommended)
- npm or yarn package manager

## Setup Instructions

Clone the repository and set up both the backend and frontend servers.

```bash
# Clone the repository
git clone https://github.com/AlexanPetrov/Squirro.git

# Backend Setup (API)
cd book-store-api
npm install
npm install express
npm run start
# The API will run at: http://localhost:3000/

# Frontend Setup
cd ../frontend-coding-challenge
npx create-react-app bookstore-frontend
cd bookstore-frontend
npm install axios
npm start
# Set the frontend to run at: http://localhost:3001/

# Usage
1. Make sure both the backend (`http://localhost:3000/`) and frontend (`http://localhost:3001/`) servers are running.
2. Open the frontend in a browser by navigating to `http://localhost:3001/`.
3. View the list of bookstores and their best-selling books, along with ratings, flags, and other details.

# Notes
- The email icon at the bottom-right corner of each store is purely decorative and has no functionality.
- Book names and authors are displayed but are not functional or interactive.
- The interface design setup, while reflecting the core concepts given by the requirements, accomodates some visual deviations.
- The only link that leads to an actual website is Squirro link.

# Project Details
- Built using **React** for the frontend.
- Backend adheres to the **JSON:API specification**.
- All CSS written from scratch (no libraries like Bootstrap or Material UI used).
- Responsive design implemented to work seamlessly across devices.
