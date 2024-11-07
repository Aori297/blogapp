# Blog App - MERN Stack

A simple blog application built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). This application allows users to create, view, and manage blog posts. It includes basic authentication and CRUD operations for posts, making it an ideal starting point for understanding how to build full-stack web applications with the MERN stack.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely using **JWT (JSON Web Tokens)** for session management.
- **Post Management**: Users can create, read, update, and delete their blog posts.
- **Responsive UI**: The frontend is built with **React**, ensuring a smooth and responsive user experience.
- **RESTful API**: The backend is powered by **Express.js** and communicates with a **MongoDB** database, handling all CRUD operations for posts.
- **State Management**: **React's Context API** is used for global state management across components.

## Technologies Used

- **Frontend**:
  - **React.js**: JavaScript library for building user interfaces.
  - **Axios**: For making HTTP requests to the backend.
  - **React Router**: For handling client-side routing.
  - **React Hook Form**: For form handling and validation.

- **Backend**:
  - **Node.js**: JavaScript runtime environment for the server.
  - **Express.js**: Web framework for Node.js to handle routing and middleware.
  - **MongoDB**: NoSQL database to store blog posts and user data.
  - **Mongoose**: ODM (Object Data Modeling) library for MongoDB to define data models and handle database queries.
  - **bcrypt**: For securely hashing user passwords.
  - **JWT (JSON Web Tokens)**: For user authentication and authorization.

## Usage

- **Sign Up / Log In**: Use the provided forms to create a new user or log in if you already have an account.
- **Create Posts**: Once logged in, you can create new blog posts, edit them, or delete them.
- **View Posts**: View all blog posts or read individual posts.

## API Endpoints

- **POST /api/auth/signup**: Create a new user.
- **POST /api/auth/login**: Authenticate an existing user and generate a JWT.
- **GET /api/posts**: Get a list of all blog posts.
- **POST /api/posts**: Create a new blog post (requires authentication).
- **GET /api/posts/:id**: Get a specific blog post by ID.
- **PUT /api/posts/:id**: Update a blog post (requires authentication).
- **DELETE /api/posts/:id**: Delete a blog post (requires authentication).

## Future Enhancements

- **Comments System**: Allow users to comment on posts.
- **Post Categories**: Implement categories or tags to organize posts.
- **User Profiles**: Allow users to have personalized profiles and manage their own posts.
- **Rich Text Editor**: Integrate a rich text editor for creating and editing posts.
