
# Dashboard backend

This is a project given as an assignment, its the backend part of the assignment made with framework "EXPRESS.js" using ts.
This backend is mostly a bunch of quality apis.

# Routers
There are 2 types of routers, get and post. Here's a briefly representation on al the routers.


## dashboard 
Get request
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| null | null |  |
- This api ` returns json ({ userLogs: logs, name:username }`  userLogs is an arry of the logs of the user, it extracts the userID from the data given by authentication (middleware we will discuss shortly)

## qrImage 
Get request
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| null | null | |
- This api ` returns json ({data:{image}}` , a qr code image for user to authentication , it extracts the userID from the data given by authentication (middleware we will discuss shortly) 

## login 
Post request
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **required** |
| `password` | `string` | **required** |
| `2FA_code` | `number` | **required** |
- A typical login api for user to login, it `returns json { message: "Successfully login as ${user.username}", tokens }` this token is a jwt token which client must include while making request to any endpoint which requires authentication.

## signup 
Post request
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **required** |
- A typical signup api for user to signup, it ` returns json { message: "Account created successfully", tokens } ` this token is a jwt token which client must include while making request to any endpoint which requires authentication.

## tfa 
Post request
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `code` | `number` | **required** |
- This api is to verify the authentication code, it `returns {message:"Valid code"}` for valid code, `{message:"Invalid code"}` otherwise.


## signout 
Post request
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `log` | `string` | **required** |
- This api is to signout from a give device, the "log" will contain the important data to signout from the desired device of a desired user.

# middlewares

This project contains three
- middlewares
- authentication
- validationChceck
- set_ip_agent

# Utility

Next we have Utility which contains some useful modules     
- crypto
- passwordVerification
- stringChecker
- tokenGenerator

# Real-time update
For real-time updates, this project uses socket.io. socket will launch an even each time a device login, signup or signout. Events are: 
- userLoggedIn
- userSignOut
signup uses the same event as login since they do the same job.

# Database
- Type of database: `Mysql`

- library used to interact with database: `prisma`

## Directory
```

root
  |
  |--dist
  |--node_modules
  |--prisma
    |--migrations
    |--modules
    |--schema.prisma
    |-script.ts
  |--src
     |--middlewares
       |-authentication
       |-set_ip_agent
       |-validationCheck
     |--routers
       |--get
         |-qrImage
         |-dashboard
       |--post
         |-login
         |-signout
         |-signup
         |-TFA
     |--utility
       |-crypto
       |-passwordVerification
       |-stringChecker
       |-tokenGenerator
     |-index.ts
  |-.env
  |-.gitignore
  |-package-lock-json
  |-package.json
  |-readme.md
  |-tscongfig.json