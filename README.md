🌙 Arabul — Modern Full-Stack E-Commerce Platform
🌑 Arabul — Modern Full-Stack Shopping Application

A refined, elegant, and fully functional e-commerce platform built with React (frontend) and Spring Boot + PostgreSQL (backend).
Designed with a premium, dark-lux UI and a clean, secure API layer.

✨ Features
🛒 Storefront & User Features

- Beautiful dark-theme product catalog
- Product browsing, detailed pages, and search
- Add to cart, update quantity, remove items
- Checkout with secure payment form
- Order history view
- Authentication: Register · Login · Logout
- Profile data loading after JWT decode

🔐 Security & Auth

- JWT-based authentication
- Token stored in localStorage
- Protected routes on both backend & frontend
- Auto-redirect to login when token is missing

🗄 Backend (Spring Boot)

- Products API
- Cart API
- Order API
- Image file upload handling
- PostgreSQL persistence
- Clean Repository + Controller architecture
- Validation + safe request handling

⚛️ Frontend (React)

- Global state using custom AppContext
- Dynamic cart count synced from backend
- Routing with React Router
- Full checkout workflow
- Elegant UI with ShadCN + Tailwind CSS
- Fetch-driven API interactions
- Error handling with user feedback

📂 Project Structure
Frontend (React)
src/
 ├─ AppContext.js
 ├─ Arabul.jsx
 ├─ Cart.jsx
 ├─ Checkout.jsx
 ├─ Product.jsx
 ├─ Login.jsx
 ├─ Register.jsx
 ├─ Orders.jsx
 ├─ Profile.jsx
 ├─ SearchedProducts.jsx
 ├─ components/ui/*
 └─ env.js

🚀 How It Works
🔁 Global AppContext

All essential features—cart count, token, profile, product list—are stored globally:

const data = {
  setProfile,
  profile,
  token,
  cartCount,
  products,
  updateCart,
  fetchProducts,
  logOut,
  navigate
}
This lets any component access:

User profile

- Auth token
- Global errors
- Search results
- Cart total
- Product data

🛒 Cart Logic

- Adding sends a POST to /api/cart
- Removing sends DELETE to /api/cart/{id}
- Total count always recalculated from backend

💳 Checkout Flow

- Load cart
- Gather payment + customer info
- Send product list + payment headers to /api/order
- If successful → clear cart & redirect to /orders
- Backend validates:
- Card number format
- Expiration mm/yy
- CVV length
- First & last name

📦 Products Module

- Fetch all products
- Fetch by ID
- Image paths resolved via backendStaticBaseUrl
- Product photos uploaded by backend

⚙️ Environment Variables

- Inside env.js:
- export const backendBaseUrl = "http://your-server:8080"
- export const backendStaticBaseUrl = "http://your-server:8090"


You may adjust these for local development.

🧪 API Summary
Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/{id}	Get product by ID
GET	/api/products/search?term=	Search product
POST	/api/products	Create product
DELETE	/api/products/{id}	Delete product

Cart
Method	Endpoint	Description
GET	/api/cart	Get user cart
POST	/api/cart	Add product
DELETE	/api/cart/{id}	Remove product
DELETE	/api/cart	Clear cart

Orders
Method	Endpoint	Description
POST	/api/order?params	Create order
GET	/api/order	Get user's orders

🛠 Tech Stack
- Frontend
- React 18
- React Router
- Tailwind CSS
- ShadCN UI
- JWT Decode
- Context API
- Backend
- Spring Boot
- PostgreSQL
- JDBC Template
- Jakarta Validation
- REST API
- File Upload (product photos)

🎨 UI Style

Arabul uses a premium, deep-contrast dark theme:

- Shadowed cards
- Rounded corners
- Smooth transitions
- Accent blues + grayscale palette
- Mobile responsive layouts

Ensure PostgreSQL is running and tables exist (orders, products, order_products, cart…).

Run Project
- npm run start && npm run tw-watch (for tailwind)

Credits
Designed & built as a full-stack e-commerce example combining modern frontend UX with a clean Spring Boot backend.