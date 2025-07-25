# Lumina Staff Suite - Backend

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Tech Stack](https://img.shields.io/badge/tech-NestJS%20%7C%20TypeScript%20%7C%20PostgreSQL-blueviolet)

This repository contains the backend API for Lumina Staff Suite. It's a modern, scalable server-side application built with NestJS, focusing on SOLID principles, a clean modular architecture, and data persistence with PostgreSQL and TypeORM.

---

### 🔗 Live API Endpoint

The API is hosted on Render: **[https://your-backend-api-url.onrender.com/](https://your-backend-api-url.onrender.com/)**

*(Note: The first request might take up to 30 seconds as the free-tier service spins down after inactivity.)*

---

### 🚀 Features

* **📦 Modular Architecture:** The application is structured into logical modules (e.g., `EmployeesModule`) for better organization and scalability, following NestJS best practices.
* **🛡️ Robust RESTful API:** A complete set of endpoints for managing employees (`GET`, `POST`, `PATCH`, `DELETE`).
* **✅ Data Validation:** Automatic validation of incoming data using DTOs (Data Transfer Objects) with `class-validator` and a global `ValidationPipe`.
* **🐘 PostgreSQL Database:** Uses a powerful relational database for data persistence.
* **🔄 TypeORM Integration:** Leverages TypeORM for elegant and type-safe database interactions.
* **🔧 Service-Oriented:** A clean separation of concerns with a "Thin Controller, Fat Service" approach, where all business logic is encapsulated in services.
* **🔒 Environment-Based Configuration:** Securely manages configuration for different environments (development, production) using a `.env` file.

---

### 🛠️ Tech Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Data Validation:** class-validator, class-transformer

---

### 🏁 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/toyo12312/lumina-staff-suite-backend.git](https://github.com/toyo12312/lumina-staff-suite-backend.git)
    cd lumina-staff-suite-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Open the new `.env` file and configure your `DATABASE_URL` and `PORT`. The `DATABASE_URL` should follow this format:
    `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

4.  **Set up the database:**
    Ensure you have a running PostgreSQL instance and that the database specified in your `.env` file exists. TypeORM will synchronize the schema automatically on startup.

5.  **Run the development server:**
    ```bash
    npm run start:dev
    ```
    The API will be available at `http://localhost:3000` (or the port you specified).

---

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
