
# User backend Service

This is a backend service that allows users to create and manage their own accounts, as well as retrieve information about other users. The service is built using Node.js and TypeScript, and connects to a PostgreSQL database.
## Tech Stack


**Server:** Node JS, Express JS

**Database:**  PostgreSQL
  


## Run Locally

Clone the project

```bash
  git clone https://github.com/geekychandan/user_backend.git
```



Install dependencies

```bash
  npm install
```


Start the server

```bash
  npm run dev
```

  
# Endpoints

### post api/user/register
Register a new account by providing a unique username, email, and password.


### post api/user/login
Login by providing your email and password. The service returns a JWT token if the login is successful.


### post api/user/update
Update your own information by providing your JWT token and the updated information.

### post api/user/userinfo/:username
Retrieve information about a user by providing their username.


## Made By

- [@geekychandan](https://github.com/geekychandan)

  
