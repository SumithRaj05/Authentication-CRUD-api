# Authentication-CRUD-api

<p>This is a CRUD (Create, Read, Update, Delete) API for user authentication and email verification, built using Express.js and MongoDB. The API provides endpoints to manage user accounts, including signup, login, email verification and basic user profile operations.</p>

<h1>Features</h1>
<ul>
    <li>User Signup: Allows new users to create an account by providing a unique username, email and password.</li>
    <li>User login: Authenticates users for subsequent requests.</li>
    <li>Update user profile: Enables users to update their profile information, such as name, email, or password.</li>
    <li>Delete user account: Allows users to delete their account and associated data from the database.</li>
    <li>Email Authentication: Sends one time email verification link on Signup.</li>
    <li>Use an API testing tool ( Postman ) to interact with the API endpoints.</li>
    <li>Email verification html files are served by api.</li>
</ul>

<h1>API Endpoints</h1>
<p>The following API endpoints are available:</p>
<ul>
    <li>POST /profile/signup: Creates a new user account.</li>
    <li>POST /profile/login: Authenticates the user.</li>
    <li>PATCH /profile/update: Updates the profile information for the authenticated user.</li>
    <li>DELETE /profile/delete: Deletes the account for the user.</li>
    <li>POST /verify/:id: Verification Link in email.</li>
</ul>

<h1>Request Operations Formatting</h1>

## Signup
<ul>

<li>Request</li>

```json
    {
        "username": "user name",
        "email": "example@gmail.com",
        "password": "user password"
    }
```

<li>Response</li>

```json
    {
        "status": "Email verification link sent"
    }
```
</ul>

## Login
<ul>

<li>Request</li>

```json
    {
        "email": "example@gmail.com",
        "password": "user password"
    }
```

<li>Response</li>

```json
    {
        "status": 200,
        "username": "user name"
    }
```

</ul>

## Update
<ul>

<li>Request</li>

<p>( "data" object may contain any information of username, email or password. )</p>

```json
    {
        "username": "current user name",
        "data": {
            "username": "new username",
            "email": "new email",
            "password": "new password"
        }
    }
```

<li>Response</li>

```json
    {
        "status": 200
    }
```

</ul>

## Delete
<ul>

<li>Request</li>

```json
    {
        "username": "user name"
    }
```

<li>Response</li>

```json
    {
        "status": 200
    }
```

</ul>