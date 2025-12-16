
# 📘 Detailed Explanations of All Frontend Components

## 🧰 Frontend Technologies Used

### **React**
Used to build dynamic UI, render components efficiently, and create a single-page application where navigation happens without page reloads.

### **React Router**
Allows instant navigation between pages such as `/cart`, `/orders`, `/product/:id` while maintaining app state.

### **Context API**
Used for global state management:
- user authentication
- profile data
- product list
- cart count
- UI notifications

### **TailwindCSS**
Provides fast styling without writing CSS files manually.  
Allows consistent theme (dark mode, gray-scale backgrounds, blue accents).

### **ShadCN UI**
Provides prebuilt Card, Button, Input components for quicker development and consistent design.

### **serve**
Needed in the Dockerfile to host the production build easily.

---

## 🖥 JavaScript Version Used

The frontend uses **ES2020+ JavaScript**, including:

- Arrow functions  
- Optional chaining  
- Array methods (map, filter, reduce)  
- React Hooks (useState, useEffect, useContext)  
- Template literals  
- Modules (import/export)  

---

## 🧠 1. AppContext.js — Global Application State

This file creates a shared React Context so components can access global app data without prop drilling.

### Provides Global Values:
- **token** – The user’s JWT token  
- **profile** – User account information  
- **cartCount** – Total items in cart  
- **products** – All product data  
- **searchedProducts** – Search results  
- **showNotif** – Add-to-cart notification state  
- **error** – API errors

### Provides Global Functions:
- `updateCart()` – Add product to cart  
- `fetchProducts()` – Load all products  
- `logOut()` – Clear session  
- `navigate()` – Router helper  

➡️ Serves as **application brain**, connecting all components.

---

## 🏛 2. Arabul.jsx — Main Application Controller & Router

Handles:

- Loading token from localStorage  
- Decoding JWT and fetching user profile  
- Initializing global context  
- Displaying routes  
- Handling notifications  
- Managing login state  

### Routes it manages:
| Path | Component |
|------|-----------|
| `/` | HomePage |
| `/login` | Login |
| `/register` | Register |
| `/product/:id` | Product |
| `/cart` | Cart |
| `/order` | Checkout |
| `/orders` | Orders |
| `/profile` | Profile |
| `/product/searched/:term` | SearchedProducts |

➡️ This is the **core app logic + navigation system**.

---

## 🛒 3. Cart.jsx — Manages User Cart

Features:

- Fetches cart items  
- Calculates total price  
- Allows removing items  
- Redirects to login if token missing  
- Displays list dynamically  

➡️ Full shopping-cart management UI.

---

## 💳 4. Checkout.jsx — Payment Submission

Steps:

1. Fetch cart from backend  
2. Validate credit card & customer info  
3. Send POST request to `/api/order`  
4. Clear cart afterwards  
5. Navigate to `/orders`

➡️ Handles complete order submission workflow.

---

## 🔗 5. env.js — Backend Configuration

Contains:

```
backendBaseUrl = "http://your-backend:8080"
backendStaticBaseUrl = "http://your-backend:8090"
```

➡️ Central place to change backend URLs without editing every component.

---

# 🧱 Dockerfile Summary

```
FROM node
RUN npm install -g serve
COPY ./build /home/build
CMD ["serve", "-p", "80", "-s", "/home/build"]
```

### What It Does:

1. Uses **Node** as base image.  
2. Installs `serve`, a small static file server.  
3. Copies React production build into `/home/build`.  
4. Hosts the app on **port 80** using `serve`