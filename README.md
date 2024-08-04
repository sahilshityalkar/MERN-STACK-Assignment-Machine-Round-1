# MERN-STACK-Assignment-Machine-Round-1

## Assignment: Building a Social Media Dashboard
You are tasked with building a complex social media dashboard using the MERN stack (MongoDB, Express, React, Node.js) along with Redux for state management and plain CSS for styling. The social media dashboard will allow users to register, log in, and interact with posts and comments.

## API Documentation

<details>
  <summary>Expand API Documentation</summary>

  ### Create Post
  - **Method**: `POST`
  - **Endpoint**: `/api/posts`
  - **Description**: Creates a new post with optional image upload.
  - **Use Case**: Allows users to add new posts to their feed.
  - **Body**:
    ```json
    {
      "userId": "your_clerk_user_id",
      "content": "This is a test post",
      "image": "image_file" // Optional
    }
    ```
  - **Tech Stack**: Utilizes Express for routing and handles file uploads using middleware.

  ### Get All Posts
  - **Method**: `GET`
  - **Endpoint**: `/api/posts`
  - **Description**: Retrieves all posts available in the system.
  - **Use Case**: Fetches a comprehensive list of posts to populate the dashboard or feed.
  - **Tech Stack**: Built with Express, querying the database to retrieve posts.

  ### Get Post by ID
  - **Method**: `GET`
  - **Endpoint**: `/api/posts/:id`
  - **Description**: Retrieves a specific post by its unique identifier.
  - **Use Case**: Provides detailed view of an individual post.
  - **Tech Stack**: Uses Express to handle routing and query the database for post details.

  ### Update Post
  - **Method**: `PUT`
  - **Endpoint**: `/api/posts/:id`
  - **Description**: Updates an existing post's content and optional image.
  - **Use Case**: Enables editing of post content and images.
  - **Body**:
    ```json
    {
      "content": "Updated content",
      "image": "updated_image_file" // Optional
    }
    ```
  - **Tech Stack**: Built with Express, handling updates via database queries.

  ### Delete Post
  - **Method**: `DELETE`
  - **Endpoint**: `/api/posts/:id`
  - **Description**: Deletes a post based on its unique identifier.
  - **Use Case**: Allows users to remove unwanted or outdated posts.
  - **Tech Stack**: Express-based implementation for handling deletions.

  ### Like/Dislike Post
  - **Method**: `PATCH`
  - **Endpoint**: `/api/posts/:id/like`
  - **Description**: Toggles the like/dislike status of a post.
  - **Use Case**: Enables users to interact with posts by liking or disliking them.
  - **Body**:
    ```json
    {
      "userId": "your_clerk_user_id"
    }
    ```
  - **Tech Stack**: Uses Express for routing and database updates.

  ### Save User Data
  - **Method**: `POST`
  - **Endpoint**: `/api/users/saveUserData`
  - **Description**: Saves or updates user data retrieved from Clerk authentication.
  - **Use Case**: Updates user profile data based on Clerk authentication.
  - **Body**:
    ```json
    {
      "userId": "your_clerk_user_id",
      "email": "user@example.com"
    }
    ```
  - **Tech Stack**: Leverages Clerk SDK for authentication and Express for routing.

  ### General Considerations
  - **Error Handling**: Implement robust error handling to provide meaningful feedback and ensure smooth user experiences.
  - **Authentication**: Ensure users are authenticated before performing sensitive operations like creating or deleting posts.
  - **Loading States**: Implement loading indicators to enhance user experience during data fetching or submission processes.
  - **Data Validation**: Validate user inputs to maintain data integrity and prevent erroneous submissions.
  - **Security**: Ensure proper authorization checks are in place to protect against unauthorized actions.

</details>

