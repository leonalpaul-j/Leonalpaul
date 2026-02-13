Comprehensive project documentation is available in the /docs folder. The documentation is structured to provide a clear understanding of the system design, development process, and implementation details.

📐 1. System Architecture

The platform follows a modern MERN stack architecture:

Frontend: React with Tailwind CSS for responsive UI

Backend: Node.js with Express for REST API handling

Database: MongoDB for scalable data storage

Authentication: JWT-based secure authentication system

The architecture ensures modularity, scalability, and maintainability.

🗂 2. Database Design

The database schema includes structured collections such as:

Users (Authentication & Roles)

Vendors (Category, Pricing, Ratings)

Weddings (Event details & budget)

Guests (RSVP tracking)

Expenses (Budget tracking)

Checklist Tasks (Planning automation)

Each schema is designed with proper indexing and validation to ensure performance and data consistency.

🔐 3. Authentication & Security

Secure password hashing using bcrypt

JWT-based session management

Protected routes with middleware

Role-based access control (User / Planner / Vendor / Admin)

Environment variable protection for sensitive keys

Security best practices are followed to prevent unauthorized access.

🔄 4. API Documentation

The backend provides structured RESTful APIs including:

User authentication routes (Register/Login)

Vendor management routes

Budget and expense tracking APIs

Guest RSVP management APIs

Checklist generation endpoints

Each API endpoint includes proper validation, error handling, and standardized JSON responses.

📊 5. Feature Modules

The system is divided into modular components:

Vendor Marketplace Module

Budget Management Module

Guest Management Module

Wedding Checklist Module

Event Timeline Planner

Dashboard Analytics

This modular structure improves maintainability and future scalability.

🚀 6. Deployment & Environment Setup

The documentation includes:

Local development setup guide

Environment variable configuration

Production deployment steps

Database connection setup

Build and start scripts

The application is designed to be easily deployable on platforms like Vercel, Render, or other cloud providers.

📈 7. Future Scalability

The project is built with scalability in mind:

Easy integration of payment gateways

AI-powered vendor recommendation system

Email/SMS notifications

Mobile app extension

Real-time updates using WebSockets

This documentation ensures the project is well-organized, professionally structured, and easy for developers or reviewers to understand.
