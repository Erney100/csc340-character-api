# CSC 340 Character Gallery Web Application

## Project Description

This project is a dynamic Character Gallery website built for CSC 340. It combines my Assignment 2 static Character Gallery with my Assignment 3 Character REST API.

The website features a Sanrio-inspired design with a pink color scheme, rounded character cards, and character images.

Users can browse fictional characters, search by name and universe, view character details, and add, edit, or delete characters.

Character information is stored in a Neon PostgreSQL database and accessed through a Java Spring Boot REST API.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

**Backend**
- Java 25
- Spring Boot
- Spring Data JPA
- Maven

**Database and Deployment**
- PostgreSQL
- Neon
- Docker
- Render

## Website Features

- Dynamic gallery that displays characters from the database
- Character images and GIFs
- Search by character name and universe
- Individual character details pages
- Add Character form
- Edit Character form
- Delete Character with confirmation
- Shared navigation across all pages
- Loading, error, and empty-state messages
- Success messages after adding, editing, and deleting characters
- Placeholder images for characters without an image

## Live Website

**Character Gallery:** https://csc340-character-api-ri3d.onrender.com/

**REST API:** https://csc340-character-api-ri3d.onrender.com/api/characters

The application is hosted on Render using its free web service tier. The service may take about a minute to wake up after being inactive.

## Website Pages

| Page | Route | Description |
|---|---|---|
| Home / Gallery | `/` | Displays all characters and provides name and universe search |
| Character Details | `/details.html?id={id}` | Displays a character's information and provides Edit and Delete actions |
| Add Character | `/new-character-form.html` | Form for creating a new character |
| Edit Character | `/edit.html?id={id}` | Pre-filled form for updating an existing character |
| About | `/about.html` | Explains the website, design, and application architecture |

## Application Architecture

This project uses Track B: Vanilla JavaScript.

The frontend is built with HTML, CSS, and JavaScript. The HTML files provide the page structure, CSS controls the appearance, and JavaScript handles user interactions and dynamically displays character information.

The frontend uses the Fetch API to communicate with the Spring Boot backend through REST endpoints.

The backend uses a layered architecture:

1. **Controller Layer:** Receives HTTP requests and returns API responses.
2. **Service Layer:** Handles application logic and character operations.
3. **Repository Layer:** Uses Spring Data JPA to communicate with the database.
4. **Database:** Neon PostgreSQL stores the character records.

All frontend API requests are centralized in `api.js`.

Character data is retrieved from the database rather than hardcoded into the gallery.

## Character Attributes

Each character contains the following attributes:

| Attribute | Description |
|---|---|
| `characterId` | Unique database-generated identifier |
| `name` | Character name |
| `description` | Character description |
| `universe` | Character universe or franchise |
| `role` | Character role |
| `species` | Character species |
| `imageUrl` | URL or local path to a character image |

The API requires nonblank `name` and `description` values.

## API Endpoints

All endpoints use the `/api/characters` base path.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/characters` | Retrieve all characters |
| GET | `/api/characters/{id}` | Retrieve a character by ID |
| POST | `/api/characters` | Create a character |
| PUT | `/api/characters/{id}` | Update an existing character |
| DELETE | `/api/characters/{id}` | Delete a character |
| GET | `/api/characters?universe=Sanrio` | Filter characters by universe |
| GET | `/api/characters/search?name=hello` | Search characters by name |

## Example POST Request

**Endpoint:** `POST /api/characters`

```json
{
  "name": "Hello Kitty",
  "description": "A friendly character who loves making friends.",
  "universe": "Sanrio",
  "role": "Main character",
  "species": "Cat",
  "imageUrl": "/images/hellokitty.gif"
}
```

A successful request returns `201 Created` with the saved character.

## Example PUT Request

**Endpoint:** `PUT /api/characters/1`

```json
{
  "name": "Hello Kitty",
  "description": "A friendly character who enjoys spending time with friends.",
  "universe": "Sanrio",
  "role": "Main character",
  "species": "Cat",
  "imageUrl": "/images/hellokitty.gif"
}
```

Replace `1` with the ID of the character being updated.

A successful update returns `200 OK`. An unknown ID returns `404 Not Found`.

## Validation and Error Handling

The backend rejects requests with missing or blank required fields.

The frontend provides:
- Required form field validation
- Error messages when requests fail
- Loading messages while retrieving characters
- A "No characters found" message when searches have no matches
- Friendly messages for unknown character IDs
- Confirmation before deleting a character
- Success messages after database changes

Successful form submissions redirect to another page to prevent duplicate submissions when refreshing.

## Running Locally

1. Install Java 25.
2. Clone the GitHub repository.
3. Configure the `SPRING_DATASOURCE_URL` environment variable with a valid Neon PostgreSQL JDBC connection string.
4. Open a terminal in the project directory.
5. Run the application using the Maven wrapper.

**Windows:**

```powershell
.\mvnw.cmd spring-boot:run
```

**macOS/Linux:**

```bash
./mvnw spring-boot:run
```

6. Open the website at:

`http://localhost:8080/`

7. Access the REST API at:

`http://localhost:8080/api/characters`

Database credentials must be stored in environment variables and must not be committed to GitHub.

## Deployment

The application is deployed on Render using Docker.

The frontend and backend are hosted together in the same Spring Boot application.

The frontend files are located in `src/main/resources/static`, and Spring Boot serves them alongside the REST API.

**Live website:** https://csc340-character-api-ri3d.onrender.com/

Free Render services may take approximately one minute to respond after being idle.

## Repository

https://github.com/Erney100/csc340-character-api
