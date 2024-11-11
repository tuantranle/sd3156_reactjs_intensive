# Demo Shop - React Web Application

## Overview

Demo Shop is a feature-rich, responsive e-commerce web application built with React, Redux, Redux Toolkit, and Redux Thunk. The application supports a dynamic product catalog, order management, and user profile management. The UI includes theme switching (light/dark mode), a protected route structure, and responsive design optimized for various screen sizes.

## Features

- **User Authentication**: Secure login and logout using JWT tokens.
- **Theme Switching**: Toggle between light and dark themes.
- **Product Catalog**: Browse available products, view details, and add to orders.
- **Order Management**: Create and complete orders, view order history.
- **User Profile**: Display and update user profile information.
- **Protected Routes**: Access control for admin-only pages.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tuantranle/sd3156_reactjs_intensive
   cd sd3156_reactjs_intensive

2. **Install Dependencies**:
    npm install

Running the Application
To start the app in development mode, run:
    npm start

The application will be available at http://localhost:3000.

Usage
    
    Login:
        Start with the login page for guest users.
        Navigate to the products page once logged in.

    Product Catalog:
        View the list of products, adjust quantities, and create orders.

    Order Management:
        View your orders and complete them through the order management page.

    Profile
        Access and view your user profile and manage account information.
        
    Additional Features
        Redux DevTools: For debugging Redux state in development mode.
        Axios Interceptors: Handles API token addition and error responses globally.
