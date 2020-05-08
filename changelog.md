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