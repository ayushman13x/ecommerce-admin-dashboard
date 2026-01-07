Deployment

The application is optimized for Vercel.
Live URL: https://ecommerce-admin-dashboard-ebwh.vercel.app/

Demo Credentials:

Email: admin@test.com
Password: password123

E-commerce Admin Dashboard (Full-Stack)

This project is a high-performance, Server-Side Rendered (SSR) admin management system designed for modern e-commerce operations. It provides a secure, centralized interface for managing product inventories, visualizing sales data through interactive charts, and handling multi-media assets.The focus of this project is to demonstrate a robust Full-Stack architecture using Next.js 14, integrating secure authentication, real-time database management, and cloud-based image processing.

Project Overview

Managing an e-commerce backend requires more than just a database; it requires a secure, intuitive way to interact with data. This dashboard replaces manual database entries with a streamlined visual workflow.
Key features include:

>Secure Authentication: Protected routes and session management using NextAuth.js.

>Product Lifecycle Management: Full CRUD (Create, Read, Update, Delete) capabilities for store inventory.

>Data Visualization: Real-time insights into store metrics using dynamic charts.
>Cloud Image Integration: Automated image handling and storage via Cloudinary.

Tech Stack
Layer                Technology
Framework            Next.js 14 (App Router)Language             TypeScript
Authentication       NextAuth.js
Database             MongoDB Atlas (Mongoose ODM)Styling              Tailwind CSS
Images               CloudinarY  API 
Deployment           Vercel 

Repository Structure

ecommerce-admin-dashboard/

│
├── app/                  
│   ├── api/              
│   ├── dashboard/        
│   ├── login/            
│   ├── product/          
│   │   ├── add/          
│   │   └── page        
│   ├── layout.tsx        
│   └── page.tsx        
│
├── models/               
│   ├── Product.ts        
│   └── ProductSchema         
│
├── lib/                  
│   ├── mongodb.ts              
│
├── components/Sidebar          
│
├── public/               
│
├── middleware.ts         
├── next.config.js        
├── package.json          
└── .env.local             

Core Features Implemented

1. Secure Authentication & Middleware

The application implements a strict security layer. Access to any internal route (like /dashboard or /products) is restricted using Next.js Middleware.

>Unauthenticated Access: Unauthorized users are automatically redirected to the Login page.

>Session Persistence: Users remain logged in across browser refreshes via encrypted JWT tokens.

>Hard Redirect Logic: Resolves common NextAuth "hanging" issues by forcing a clean session refresh upon login.

2. Product Management System

A comprehensive suite for handling complex product data.

>Dynamic Forms: Built with client-side validation for name, description, price, and stock levels.

>Image Handling: Integrates the Cloudinary upload widget, allowing admins to upload and preview product images before saving to MongoDB.

>Data Integrity: Uses Mongoose schemas to ensure every product entry meets strict data requirements.

3. Interactive Analytics

The dashboard transforms raw MongoDB data into actionable insights.

>Overview Charts: Visualizes stock distribution and category-wise product counts.

>Real-time Updates: Data is fetched server-side to ensure the dashboard reflects the most current state of the database.

 Key Findings & Takeaways

Middleware Utility: Centralizing authentication in middleware.ts significantly simplifies route management compared to page-by-page checks.

Deployment Synchronization: Production environments (Vercel) require careful alignment of NEXTAUTH_URL and MongoDB Network Access (0.0.0.0/0) to ensure 24/7 availability.

UX Improvements: Forcing a browser refresh during the login phase ensures security tokens are properly loaded, creating a smoother user experience.