# MovieMuse

MovieMuse is a web application that offers users detailed information about movies, including titles, release dates, genres, taglines, overviews, and posters. Users can create accounts, log in securely, and store their favorite movies, watchlists, and personalized preferences. They can mark movies as favorites and add them to their watchlist to keep track of movies they love and intend to watch.

MovieMuse provides personalized movie recommendations based on the favorite movies selected by the user.MovieMuse suggests similar movies that align with the user's taste and preferences. This feature helps users discover new movies that they are likely to enjoy and enhances their movie-watching experience by offering tailored recommendations.

MovieMuse offers a diverse range of movie options, including now showing, upcoming, popular, and top-rated movies. Users can explore detailed information about each movie and conveniently add their favorites to a watchlist for easy access and future viewing.

## Tech Stack

**Client:** React, TypeScirpt, Sass,

**Server:** Node.js, Express, MySQL, JWT

## Installation

Install MovieMuse with npm

```bash
  npm install
  cd moviemuse-client
```

Start the React app:

```bash
  npm run dev
```

## API Reference

#### Api

```http
  http://localhost:8080
```

#### Get movies which can be selected

```http
  GET /api/movies
```

#### Get user favourite movies

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Post user favourite movies

```http
  POST /api/movies
```

#### Get user watchlist

```http
  GET /api/users/${id}/watchlist
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### post user watchlist

```http
  POST /api/movies/watchlist
```

#### Delete user favourite movies

```http
  DELETE /api/movies/${userId}/${movieId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Id of user to fetch |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `movieId` | `string` | **Required**. Id of movie to fetch |

#### Delete user watchlist

```http
  DELETE /api/movies/${userId}/watchlist/${movieId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Id of user to fetch |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `movieId` | `string` | **Required**. Id of movie to fetch |

## Features

- User login and signout
- Select favourite movies
- Add movies to watchlist
- Remove movies from favourite or watchlist
- Cross platform

## Lessons Learned

While building this project, I learned the importance of data integration and API usage in creating a comprehensive movie platform. I gained experience in handling user authentication, managing user preferences and lists, and leveraging my own database and external movie databases to provide accurate and up-to-date movie information. Additionally, I developed skills in designing responsive and visually appealing user interfaces to enhance the overall user experience.

During the project, one of the main challenges I faced was the learning curve of TypeScript. Adapting to the static typing and syntax requirements of TypeScript required some adjustment, especially when integrating external libraries and managing data flow between components. To overcome this challenge, I utilized the TypeScript documentation and resources available online to deepen my understanding of the language. I also made use of TypeScript's type inference and gradually added explicit type annotations to my codebase, which helped catch potential errors early on and ensure better code quality. Additionally, leveraging TypeScript's features such as interfaces helped in maintaining consistent and predictable data structures throughout the project. Overall, through perseverance, practice, and continuous learning, I was able to overcome the TypeScript learning curve and effectively utilize its benefits in the project.

## Screenshots

<img src="https://github.com/jingwei-zhao05/MovieMuse/assets/10520393/80e922e8-a16d-456e-8f9c-5875ec794ffd" width="800">
<img src="https://github.com/jingwei-zhao05/MovieMuse/assets/10520393/310eab95-2474-46c4-9198-dc3898ec3942" width="800">
<img src="https://github.com/jingwei-zhao05/MovieMuse/assets/10520393/c2addbd1-2f42-4cc9-9b93-0bbdeb07b6b2" width="800">
<img src="https://github.com/jingwei-zhao05/MovieMuse/assets/10520393/182ace5c-112c-4823-ae31-8446442d8eb3" width="800">
<img src="https://github.com/jingwei-zhao05/MovieMuse/assets/10520393/6dba9f4e-b782-4663-a0eb-f6aca7f7261f" width="800">
