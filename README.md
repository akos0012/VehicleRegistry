# VehicleRegistry

## Technologies
- **Node.js** – development tooling and dependency management for frontend
- **React** – frontend framework for building the user interface
- **Java Spring Boot** – backend framework for REST API and business logic
- **Maven** – build and dependency management tool for the backend
- **PostgreSQL** – relational database used for storing application data

# Getting Started

## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Running the Application

```bash
cd ./client
npm start
```
This will start the development server on port 3000. Open your browser and navigate to http://localhost:3000 to view app.

## Server side

### Install dependencies

```bash
cd ./server
mvn clean install
```

### Running the code

```bash
cd ./server
mvn spring-boot:run
```

Alternatively, you can open the project in IntelliJ IDEA and run the ServerApplication class directly from the IDE.

## Database Configuration (PostgreSQL)

Before running the backend, make sure that PostgreSQL is installed
and a database is created.

Update your application.yml with the correct database credentials:

```bash
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/fav_car_service
    username: postgres
    password: password
```
Make sure the database fav_car_service exists, or adjust the URL accordingly.
