# DogMart

DogMart is a web application for purchasing dog care products. This is a single-page Angular application with client-side routing and authentication.

## Table of Contents
- [Project Overview](#project-overview)
- [Available Routes (Endpoints)](#available-routes-endpoints)
- [Route Details](#route-details)
- [Setup & Installation](#setup--installation)
- [Authentication](#authentication)
- [License](#license)

## Project Overview
DogMart allows users to browse dog care products, register and log in, add items to a cart, and view their cart. Some routes are protected and require authentication.

## Available Routes (Endpoints)
| Path         | Component         | Protected | Description                      |
|--------------|------------------|-----------|----------------------------------|
| `/`          | HomeComponent     | No        | Home page, product overview      |
| `/haircare`  | HaircareComponent | No        | Browse haircare products         |
| `/login`     | LoginComponent    | No        | User login page                  |
| `/register`  | RegisterComponent | No        | User registration page           |
| `/cart`      | CartComponent     | Yes       | View cart (requires login)       |

## Route Details
### `/` (Home)
- Displays the main landing page and product overview.

### `/haircare`
- Shows a list of dog haircare products.
- Allows adding products to the cart.

### `/login`
- User login form.
- Redirects to home on successful login.

### `/register`
- User registration form.
- Redirects to login on successful registration.

### `/cart`
- Displays the user's cart and total price.
- Only accessible if the user is logged in (protected by AuthGuard).
- Redirects to `/login` if not authenticated.

## Authentication
- Authentication is handled client-side using localStorage.
- The AuthGuard protects the `/cart` route and redirects unauthenticated users to `/login`.