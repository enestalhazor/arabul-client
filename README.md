# Arabul --- Full-Stack Shopping Application

A refined, elegant, fully functional e-commerce platform built with
**React** (frontend) and **Spring Boot + PostgreSQL** (backend).
Designed with a premium dark-lux UI and a clean, secure API layer.

## ✨ Features

### 🛒 Storefront & User Features

-   Beautiful dark-theme product catalog
-   Product browsing, detailed pages, and search
-   Add to cart, update quantity, remove items
-   Checkout with secure payment form
-   Order history view
-   Authentication: Register · Login · Logout
-   Profile data loading after JWT decode

## 🔐 Security & Auth

-   JWT-based authentication
-   Token stored in localStorage
-   Protected routes on both backend & frontend
-   Auto-redirect to login when token is missing

## ⚛️ Frontend (React)

-   Global state using custom AppContext
-   Dynamic cart count synced from backend
-   Routing with React Router
-   Full checkout workflow
-   Elegant UI with ShadCN + Tailwind CSS
-   Fetch-driven API interactions
-   Error handling with user feedback

## 📂 Project Structure

### Frontend (React)

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

## 🚀 How It Works

### 🔁 Global AppContext

All essential features---cart count, token, profile, product list---are
stored globally.

**User profile:** - Auth token - Global errors - Search results - Cart
total - Product data

## 🛒 Cart Logic

-   Adding → POST /api/cart
-   Removing → DELETE /api/cart/{id}
-   Total count always recalculated from backend

## 💳 Checkout Flow

1.  Load cart
2.  Gather payment + customer info
3.  Send product list + payment headers → /api/order
4.  If successful → clear cart & redirect to /orders
