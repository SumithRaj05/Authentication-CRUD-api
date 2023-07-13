# User-Backend-Api

<p>This is a CRUD (Create, Read, Update, Delete) API for user authentication and email verification, built using Express.js and MongoDB. The API provides endpoints to manage user accounts, including signup, login, email verification, JWT authentication and basic user profile operations.</p>

<h1>Features</h1>
<ul>
    <li>User Signup: Allows new users to create an account by providing a full name, unique email and password.</li>
    <li>verification mail is sent to user after signup</li>
    <li>User login: Authenticates users for subsequent requests.</li>
    <li>JWT token is sent after user login.</li>
    <li>On every request user must send token in header with key as "token".</li>
    <li>Update user profile: Enables users to update their profile information, such as name, email, mobile number, or password.</li>
    <li>Delete user account: Allows users to delete their account and associated data from the database.</li>
    <li>Email Authentication: Sends one time email verification link on Signup.</li>
    <li>Use an API testing tool ( Postman ) to interact with the API endpoints.</li>
    <li>Email verification html files are served by api.</li>
</ul>

<h1>API Endpoints</h1>
<p>The following API endpoints are available:</p>
<ul>
    <li>GET <bold>/profile/userdata</bold> : Featches user details from token provided.</li>
    <li>POST <bold>/profile/signup</bold> : Creates a new user account and sends verification link to provided email.</li>
    <li>POST <bold>/profile/login</bold> : Authenticates the user and provides JWT token.</li>
    <li>PATCH <bold>/profile/update</bold> : Updates the profile information for the user and returns updated token.</li>
    <li>DELETE <bold>/profile/delete</bold> : Deletes the account for the user.</li>
    <li>GET <bold>/verify/:id</bold> : Verification Link in email.</li>
</ul>

<h1>JsonWebToken Header Formatting</h1>

```json
{
    "token": "jwt-token"
}
```

<h1>Response and Request Body Formatting</h1>

## Signup
<ul>

<li>Request</li>

```json
{
    "fullname": "user full name",
    "email": "user@gmail.com",
    "password": "user password"
}
```

<li>Response</li>

```json
{
    "status": 200,
    "content": "Email verification link sent"
}
```
</ul>

## Login
<ul>

<li>Request</li>

```json
{
    "email": "user@gmail.com",
    "password": "user password"
}
```

<li>Response</li>

```json
{
    "status": 200,
    "token": "jwt-token"
}
```

</ul>

## Get User
<ul>

<li>Response</li>

```json
{
    "status": 200,
    "data": {
        // necessary data
    }
}
```

</ul>

## Update
<ul>

<li>Request</li>

<p>( "data" object may contain any information of username, email or password. )</p>

```json
{
    "data": {
        "fullname": "new-username",
        "email": "new-email",
        "password": "new-password"
    }
}
```

<li>Response</li>

```json
{
    "status": 200,
    "content": "User updated",
    "token": "new-updated-jwt-token"
}
```

</ul>

## Delete
<ul>

<li>Response</li>

```json
{
    "status": 200,
    "content": "User deleted"
}
```

</ul>

<h1>Contribution</h1>
<p>We value and appreciate contributions from the community, whether it's fixing a bug, adding a new feature, improving documentation, or suggesting enhancements. </p>

