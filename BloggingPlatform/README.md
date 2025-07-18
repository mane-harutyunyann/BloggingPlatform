Blogging Platform API Documentation

Base URL
http://localhost:<PORT>

Authentication
1. Register a User
Endpoint: POST /api/auth/register
Description: Registers a new user.
Request Body:
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}

2. Login a User
Endpoint: POST /api/auth/login
Description: Logs in a user and returns a JWT token.
Request Body:
{
  "email": "user1@example.com",
  "password": "password123"
}

3. Update User Profile
Endpoint: PUT /api/auth/profile
Description: Updates the user profile.
Headers:

Authorization: Bearer <jwt_token>

{
  "bio": "This is my bio",
  "avatar": "https://example.com/avatar.jpg"
}


Posts
1. Create a Post
Endpoint: POST /api/posts
Description: Creates a new post.
Headers:

Authorization: Bearer <jwt_token>