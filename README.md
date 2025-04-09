# ZyneticBackend
Bookstore API
A RESTful API for a bookstore application with JWT authentication and CRUD operations for managing books.
Features

User authentication with JWT
CRUD operations for books
Advanced filtering and searching
Pagination and sorting
Input validation
Error handling
Dockerized for easy setup

Tech Stack

Node.js
Express.js
MongoDB (with Mongoose)
JWT for authentication
Express-validator for validation
Docker & Docker Compose (optional)

Prerequisites

Node.js (v14+)
MongoDB (local or Atlas)
npm or yarn

Installation & Setup
Option 1: Standard Setup

Clone the repository (or unzip the provided file)
Install dependencies

bashnpm install

Create a .env file in the root directory with the following variables:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

Start the development server

bashnpm run dev
Option 2: Docker Setup
If you have Docker and Docker Compose installed, you can run:
bashdocker-compose up
API Endpoints
Authentication

POST /api/users/signup: Register a new user

Body: { "email": "user@example.com", "password": "password123" }


POST /api/users/login: Login a user and get token

Body: { "email": "user@example.com", "password": "password123" }


GET /api/users/profile: Get user profile (protected route)

Headers: Authorization: Bearer YOUR_JWT_TOKEN



Books
All book routes are protected and require authentication header: Authorization: Bearer YOUR_JWT_TOKEN

POST /api/books: Create a new book

Body:

json{
  "title": "The Great Book",
  "author": "John Doe",
  "category": "Fiction",
  "price": 29.99,
  "rating": 4.5,
  "publishedDate": "2023-01-15"
}

GET /api/books: Get all books (with optional filters)

Query params:

page: Page number (default: 1)
limit: Number of results per page (default: 10)
author: Filter by author name
category: Filter by category
rating: Filter by minimum rating
title: Search by title (partial match)
sort: Sort by field(s), comma-separated (prefix with - for descending, e.g., -price,title)




GET /api/books/: Get book by ID
PUT /api/books/: Update book by ID

Body: (same as create book, all fields optional)


DELETE /api/books/: Delete book by ID

Postman Testing Guide

User Registration (Signup)

Method: POST
URL: http://localhost:3000/api/users/signup
Headers: Content-Type: application/json
Body:
json{
  "email": "test@example.com",
  "password": "password123"
}



User Login

Method: POST
URL: http://localhost:3000/api/users/login
Headers: Content-Type: application/json
Body:
json{
  "email": "test@example.com",
  "password": "password123"
}

Save the returned token!


Get User Profile

Method: GET
URL: http://localhost:3000/api/users/profile
Headers:

Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN




Create a Book

Method: POST
URL: http://localhost:3000/api/books
Headers:

Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN


Body:
json{
  "title": "The Great Novel",
  "author": "Jane Smith",
  "category": "Fiction",
  "price": 24.99,
  "rating": 4.7,
  "publishedDate": "2023-03-15"
}



Get All Books

Method: GET
URL: http://localhost:3000/api/books
Headers: Authorization: Bearer YOUR_JWT_TOKEN


Get Book by ID

Method: GET
URL: http://localhost:3000/api/books/BOOK_ID
Headers: Authorization: Bearer YOUR_JWT_TOKEN


Update Book by ID

Method: PUT
URL: http://localhost:3000/api/books/BOOK_ID
Headers:

Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN


Body:
json{
  "title": "The Great Novel (Updated)",
  "price": 29.99
}



Filter Books

Method: GET
URL: http://localhost:3000/api/books?category=Fiction&rating=4&sort=-price
Headers: Authorization: Bearer YOUR_JWT_TOKEN


Delete Book by ID

Method: DELETE
URL: http://localhost:3000/api/books/BOOK_ID
Headers: Authorization: Bearer YOUR_JWT_TOKEN
