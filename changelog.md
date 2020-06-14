# Harper

## Version 1.0.0

- Implemented:
  - Shell of the project.
  - Home route.

## Version 2.0.0

- Implemented:
  - Connection to our Mongo database.
  - Models for each collection.
  - One endpoint to store new careers or get them according to the [documentation](./readme.md).

## Version 2.1.0

- Implemented:
  - One endpoint to store new memberStatus or get them according to the [documentation](./readme.md).
- Updated:
  - [Documentation](./readme.md).
  - New rule for the [`eslint file`](./.eslintrc.json), `newline-before-return`.

## Version 2.2.0

- Implemented:
  - One endpoint to store new dataArea or get them according to the [documentation](./readme.md).
- Updated:
  - [Documentation](./readme.md).

## Version 2.3.0

- Implemented:
  - One endpoint to store new dataMembers or get them according to the [documentation](./readme.md).
- Updated:
  - [Documentation](./readme.md).

## Version 2.3.0a

- Fixed:
  - `key` as parameter to insert and update a member.

## Version 2.4.0

- Implemented:
  - One endpoint to store new projects or get them according to the [documentation](./readme.md).
- Updated:
  - [Documentation](./readme.md).

## Version 2.5.0

- Implemented:
  - `lib` folder. It is the folder that contains the project ready to deploy.
  - `.eslintignore` to ignore `lib` folder.

## Version 2.6.0

- Implemented:
  - `restify-cors-middleware` module, to allow request from everywhere.

## Version 2.7.0

- Implemented:
  - `getMembersPerArea` method, to return the members per area.
  - Now, the content is populated, and neither *_id* nor *__v* are delivered to the front.

## Version 2.8.0

- Implemented:
  - One endpoint to send a mail to ACECOM, according to the [documentation](./readme.md).
- Updated:
  - [Documentation](./readme.md).

## Version 2.9.0

- Implemented:
  - `Dockerfile`, `.dockerignore` and `heroku.yml` in order to deploy a container in `Heroku`.
- Updated:
  - [Documentation](./readme.md).
  - `lib` folder.

## Version 2.10.0

- Implemented:
  - `jsonwebtoken` in order to create a middleware. It verifies if who perform the request is authorized or not.
  - `functions` folder, it contains many files that helps the controllers and routes encapsulating repetitive task.
- Updated:
  - [Documentation](./readme.md).
  - `lib` folder.

## Version 2.11.0

- Implemented:
  - `keys` model, in order to store the token used to connect with the database.
  - `getKey` function, it obtains the key if there is someone in the database, if not, it generates a new key and send it to the developer or the team.
- Updated:
  - `keyGen` function, now it saves the token in the database before send it to the developer or the team.
  - `index`, now it will try to generates a key, before creating a new one and delivery it to the developer or the team.
  - [Documentation](./readme.md).
  - `lib` folder.

## Version 2.12.0

- Implemented:
  - Allow headers: `Authorization` and `Content-Type`.
- Updated:
  - [Documentation](./readme.md).
  - `lib` folder.

## Version 3.0.0

- Implemented:
  - Refactorized version of the project, now it is using [`TypeScript`](https://www.typescriptlang.org/).
