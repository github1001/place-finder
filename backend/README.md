# Place Finder Backend

Spring Boot REST API for saving and managing favourite Google Places.

The backend receives selected place information from the React frontend and persists it in Microsoft SQL Server.

## Features

- Save a favourite place
- Retrieve all favourite places
- Retrieve a favourite by database ID
- Retrieve a favourite by Google Place ID
- Check favourite status
- Delete by database ID
- Delete by Google Place ID
- DTO validation
- Duplicate-place protection
- Concurrent duplicate-request protection
- Global exception handling
- CORS support for the React frontend
- Existing-schema validation through Hibernate

## Technologies

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Hibernate
- Jakarta Bean Validation
- Microsoft SQL Server
- Microsoft JDBC Driver
- Maven
- JUnit and Mockito

## Project Structure

```text
src/main/java/com/logan/placefinder
├── config
│   └── CorsConfig.java
├── controller
│   └── FavouritePlaceController.java
├── dto
│   ├── CreateFavouriteRequest.java
│   └── FavouritePlaceResponse.java
├── entity
│   └── FavouritePlace.java
├── exception
│   ├── DuplicateFavouriteException.java
│   ├── FavouritePlaceNotFoundException.java
│   └── GlobalExceptionHandler.java
├── repository
│   └── FavouritePlaceRepository.java
├── service
│   └── FavouritePlaceService.java
└── PlacefinderApplication.java
```

## Prerequisites

- Java 21 or later
- Maven 3.9 or later
- Microsoft SQL Server
- TCP/IP enabled for SQL Server
- SQL Server listening on port `1433`
- A database named `place_finder`
- A SQL login with read and write access

## Database Schema

```sql
CREATE DATABASE place_finder;
GO

USE place_finder;
GO

CREATE TABLE dbo.favourite_places (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    place_id NVARCHAR(255) NOT NULL UNIQUE,
    name NVARCHAR(255) NOT NULL,
    address NVARCHAR(1000) NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
```

## Create an Application Login

Run while connected as a SQL Server administrator:

```sql
USE master;
GO

CREATE LOGIN [placefinder]
WITH PASSWORD = 'your_strong_password',
     DEFAULT_DATABASE = [place_finder];
GO

USE place_finder;
GO

CREATE USER [placefinder]
FOR LOGIN [placefinder];
GO

ALTER ROLE [db_datareader]
ADD MEMBER [placefinder];
GO

ALTER ROLE [db_datawriter]
ADD MEMBER [placefinder];
GO
```

## Application Configuration

The application reads database credentials from environment variables.

`application.properties`:

```properties
spring.datasource.url=${DB_URL:jdbc:sqlserver://localhost:1433;databaseName=place_finder;encrypt=true;trustServerCertificate=true}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Set variables in PowerShell:

```powershell
$env:DB_USERNAME="placefinder"
$env:DB_PASSWORD="your_strong_password"
```

## Build

```bash
mvn clean install
```

## Run

```bash
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/favourites` | Retrieve all favourites |
| GET | `/api/favourites/{id}` | Retrieve by database ID |
| GET | `/api/favourites/place/{placeId}` | Retrieve by Google Place ID |
| GET | `/api/favourites/place/{placeId}/status` | Check favourite status |
| POST | `/api/favourites` | Save a favourite |
| DELETE | `/api/favourites/{id}` | Delete by database ID |
| DELETE | `/api/favourites/place/{placeId}` | Delete by Google Place ID |

## Example POST Request

```json
{
  "placeId": "ChIJTestPlace123",
  "name": "KLCC",
  "address": "Kuala Lumpur City Centre, Kuala Lumpur",
  "latitude": 3.1578500,
  "longitude": 101.7123000
}
```

## Example Success Response

```json
{
  "id": 1,
  "placeId": "ChIJTestPlace123",
  "name": "KLCC",
  "address": "Kuala Lumpur City Centre, Kuala Lumpur",
  "latitude": 3.1578500,
  "longitude": 101.7123000,
  "createdAt": "2026-07-17T09:30:00"
}
```

## Error Responses

The API returns appropriate HTTP statuses:

```text
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

A duplicate Google Place ID returns:

```text
409 Conflict
```

The database unique constraint provides final protection when concurrent requests attempt to save the same place.

## CORS

The backend accepts requests from:

```text
http://localhost:5173
http://127.0.0.1:5173
```