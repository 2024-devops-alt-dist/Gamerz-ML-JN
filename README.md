git add server/src/controllers/channel.controller.ts server/src/routes/channel.routes.ts server/http/channel/getChannels.http
git commit -m "Add channel API endpoints and controller"# API Testing Requests

This directory contains HTTP request files for testing the API endpoints.

## Usage
1. Open the `.http` files in IntelliJ IDEA
2. Click the green play button next to each request
3. View response in the right panel

## Available Endpoints

### Auth
- `auth/register.http`: Register new user
- `auth/login.http`: Login user
- `auth/logout.http`: Logout user
- `user/delete-user.http`: Delete a user by id

## Environment
The base URL and content type are defined in `http-client.env.json`
