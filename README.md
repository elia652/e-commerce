E-Commerce Backend (Node.js + Express + MongoDB)

 A professional backend API for an e-commerce platform, built with Node.js, Express, and
 MongoDB. Features include user authentication (JWT), product management, image uploads, and
 shopping cart functionality.
 
 Tech Stack:
 • Node.js, Express
 • MongoDB (Atlas or Local)
 • JWT Authentication
 • Multer for file uploads
 • CORS (configured for localhost:3000 & localhost:5173)
 
 Features:
 • User authentication with JWT (Signup & Login)
 • Product management: Add, Remove, List, Popular, New collection
 • Cart operations: Add, Remove, View per user
 • Image upload with Multer
 
 Installation & Setup:
 1. Clone the repository
 2. Install dependencies: `npm install`
 3. Start the server: `node server.js` (or `nodemon server.js`)
 4. Server runs on: `http://localhost:4000`
 API Reference (Main Endpoints)

 Auth:
 • POST /signup - Create new user, returns JWT
 • POST /login - Authenticate user, returns JWT
 
 Products:
 • GET /getProduct - Get all products
 • POST /addproduct - Add new product
 • POST /removeProduct - Remove product by ID
 • GET /popular - Get top 4 popular in women category
 • GET /newcollection - Get 8 newest products
 Cart (Protected, needs auth-token header)
 • POST /getcart - Fetch user cart
 • POST /addtocart - Add item to cart
 • POST /removeFromCart - Remove item from cart
 
 Uploads:
• POST /upload - Upload product image (FormData, key=product), returns image_url

 Troubleshooting:
 • 401 Unauthorized - Ensure you send 'auth-token' header with valid JWT.
 • CORS Error - Update allowed origins in server.js.
 • 500 Internal Server Error on /addproduct - Ensure correct body fields.
 • Uploads not showing - Verify 'upload/images' folder exists.
 
 Notes & Next Steps:
 • Use bcrypt to hash passwords (currently plain text).
 • Move Mongo URI and JWT secret to environment variables.
 • Add request validation using Joi/Zod.
 • Consider separating routes and models into modular files
