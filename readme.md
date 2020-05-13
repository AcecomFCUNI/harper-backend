# Harper

This is the backend of the **Harper** project.

## Prerequisites

You need to have [`Node.js`](https://nodejs.org/) and [`yarn`](https://classic.yarnpkg.com/en/) installed.

You need an `.env` file in order to run this project. It looks like this:

```bash
EMAIL_SENDER=
EMAIL_RECEIVER_1=
EMAIL_RECEIVER_2=
EMAIL_RECEIVER_3=
EMAIL_RECEIVER_4=
ID=
MONGO=
PASSWORD=
PORT=
SECRETE_KEY=
```

## Setup

In order to install and use this project please run the following commands in your terminal:

```bash
yarn
yarn service
```

This will run the development server, so you will a message as follows:

```bash
yarn run v1.22.4
$ nodemon --exec babel-node -r dotenv/config src/index.js
[nodemon] 2.0.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): \*.\*
[nodemon] watching extension: js,mjs,json
[nodemon] starting `babel node -r dotenv/config src/index`
Server running at port 4000
We are connected to the database!
```

## Usage

- There are seven endpoints implemented:
  1. Home: `/home`, it has a get method. It is just decorative.
  2. Careers: `/api/careers`, it has a get and a post method. The get method is just decorative. The post method has three different functionalities, according to what payload you send, here are some examples:

      1. To store a new career in the database:
          ```json
          {
            "args": {
              "type": "store",
              "data": {
                "code": "N1",
                "name": "Física"
              }
            }
          }
          ```

      2. To get all the careers from the database:
          ```json
          {
            "args": {
              "type": "getAll",
              "data": null
            }
          }
          ```

      3. To get one career from the database:
          ```json
          {
            "args": {
              "type": "getOne",
              "data": {
                "code": "N1"
              }
            }
          }
          ```

      

  3. MemberStatus: `/api/memberStatus`, it has a get and a post method. The get method is just decorative. The post method has three different functionalities, according to what payload you send, here are some examples:

      1. To store a new memberStatus:
          ```json
          {
            "args": {
              "type": "store",
              "data": {
                "name": "Regular"
              }
            }
          }
          ```

      2. To get all the memberStatus:
          ```json
          {
            "args": {
              "type": "getAll",
              "data": null
            }
          }
          ```

      3. To get one of the memberStatus:
          ```json
          {
            "args": {
              "type": "getOne",
              "data": {
                "name": "Regular"
              }
            }
          }
          ```

  4. DataArea: `/api/dataArea`, it has a get and a post method. The get method is just decorative. The post method has four different functionalities, according to what payload you send, here are some examples:

      1. To store a new area:
          ```json
          {
            "args": {
              "type": "store",
              "data": {
                "abstract": "This is mandatory",
                "image": "This is optional",
                "name": "This is mandatory"
              }
            }
          }
          ```

      2. To get all the areas:
          ```json
          {
            "args": {
              "type": "getAll",
              "data": null
            }
          }
          ```

      3. To get one area:
          ```json
          {
            "args": {
              "type": "getOne",
              "data": {
                "name": "Desarrollo Web"
              }
            }
          }
          ```

      4. To update an area:
          ```json
          {
            "args": {
              "type": "update",
              "data": {
                "abstract": "This is optional",
                "image": "This is optional",
                "name": "Area to update"
              }
            }
          }
          ```

  5. DataArea: `/api/dataMembers`, it has a get and a post method. The get method is just decorative. The post method has five different functionalities, according to what payload you send, here are some examples:

      1. To store a new member:
          ```json
          {
            "args": {
              "type": "store",
              "data": {
                "area": "Area name",
                "birthday": "YYYY-MM-DD",
                "career": "N1 || N2 || N3 || N5 || N6",
                "code": "XXXXXXXXA",
                "email": "example@mail.com",
                "git": "Link to GitHub or GitLab profile",
                "key": "true || false",
                "lastName": "FirstLastName SecondLastName",
                "name": "Name1 Name2",
                "phone": "987654321",
                "photo": "Url to the member photo",
                "status": "Junta Directiva || Regular || Aspirante"
              }
            }
          }
          ```

      2. To get all the members:
          ```json
          {
            "args": {
              "type": "getAll",
              "data": null
            }
          }
          ```

      3. To get one member:
          ```json
          {
            "args": {
              "type": "getOne",
              "data": {
                "code": "XXXXXXXXA"
              }
            }
          }
          ```

      4. To get all the members per area:
          ```json
          {
            "args": {
              "type": "getMembersPerArea",
              "data": {
                "area": "Area name"
              }
            }
          }
          ```

      5. To update a member:
          ```json
          {
            "args": {
              "type": "update",
              "data": {
                "area": "New Area name",
                "birthday": "new birthday in format: YYYY-MM-DD",
                "career": "N1 || N2 || N3 || N5 || N6",
                "code": "current code: XXXXXXXXA",
                "email": "new email: example@mail.com",
                "git": "new Link to GitHub or GitLab profile",
                "key": "true || false",
                "lastName": "new FirstLastName SecondLastName",
                "name": "new Name1 Name2",
                "newCode": "XXXXXXXXA",
                "phone": "new phone: 987654321",
                "photo": "new Url to the member photo",
                "status": "Junta Directiva || Regular || Aspirante"
              }
            }
          }
          ```
          All the parameters shown before are optional, except the current code (code).

  6. Projects: `/api/projects`, it has a get and a post method. The get method is just decorative. The post method has four different functionalities, according to what payload you send, here are some examples:

      1. To store a new project:
          ```json
          {
            "args": {
              "type": "store",
              "data": {
                "area": "Area name",
                "description": "Project description",
                "name": "Project name",
                "participants": "XXXXXXXXA, YYYYYYYYB",
                "repo": "git.example.com, git.example2.com",
                "topic": "Project topic"
              }
            }
          }
          ```

      2. To get all the projects:
          ```json
          {
            "args": {
              "type": "getAll",
              "data": null
            }
          }
          ```

      3. To get one projects:
          ```json
          {
            "args": {
              "type": "getOne",
              "data": {
                "name": "Project name"
              }
            }
          }
          ```

      4. To update a project:
          ```json
          {
            "args": {
              "type": "update",
              "data": {
                "area": "New area name",
                "description": "New project description",
                "name": "Current project name",
                "newName": "New project name",
                "participants": "New participants: XXXXXXXXA, YYYYYYYYB",
                "repo": "New repo: git.example.com, git.example2.com",
                "topic": "New project topic"
              }
            }
          }
          ```
          All the parameters shown before are optional, except the current name (name).

  7. Contact us: `/api/contactUs`:  it has a get and a post method. The get method is just decorative. The post method has one functionality, here is the payload:

      1. To send a mail to contact ACECOM:
          ```json
          {
            "args": {
              "type": "mail",
              "data": {
                "lastName": "Person last name",
                "mail": "person@example.com",
                "messgage": "Bla bla bla...",
                "name": "Person name",
                "subject": "Mail subject"
              }
            }
          }
          ```
      This method will send an email to a ACECOM and to its web development team, in order to reply as soon as possible.

- Every post request requires an authorization header (it uses a bearer), so it should be supplied when a post request is performed. This is token is provided by the server, you must provide an email receiver int the `.env` file to get this token, also and ID must be provided too, in order to create a 'user'. Without this token you wont be able to perform any post request. Finally (and obviously) you need to provide the sender email and at least 4 receivers, this is because the first one is going to send the email, be aware of the email configuration (gmail is set as default, but feel free to change it), in development, the server will send an email to the first receiver, but once is deployed it will send an email to 3 different receivers.

## Authors:

-   **Anthony Luzquiños** - _Initial Work_ - _Database_ - _Development_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).
