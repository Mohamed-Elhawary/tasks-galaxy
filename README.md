# Tasks Galaxy

Tasks Galaxy is a smart task management dashboard App that allows you to organize and add your daily tasks including other features, like drag &amp; drop and changing task status from to-do status to in-progress, pending, or done status. It depends on the mock API of JSON Placeholder website for data persistence.

## Requirements

> Runtime Server Environment:
* [Node.js](https://nodejs.org/en/) v20.9.0 

> Packages Manager:
* [npm](https://www.npmjs.com/) v8.1 or higher


## Instructions & Installation Guide

- Fork, clone or download this repository to your local device.
- Open your terminal and be sure that you are inside the right destination in the root folder.
- Install Dependencies
```
npm i
```

- Add Environment Variables
Copy the `.env.example` file content to a new file called `.env` and add the values that match with each key and description. All variables must be loaded in .env to be able to run the project.

> Value for env variable [REACT_APP_BACKEND_DOMAIN] is `https://jsonplaceholder.typicode.com`, as the App depends on the mock API of JSON Placeholder website for data persistence. Please add this value for the env variable `REACT_APP_BACKEND_DOMAIN` in the `.env` file to be able to run the project.

- Run in Development Mode
```
npm run dev
```

- Build the Project
```
npm run build
```

- Run in Production Mode
```
npm run start
```

## Language Framework

* [React.js](https://reactjs.org/) 

## Design Frameworks 

* [Material UI](https://mui.com/)
* [Styled Components](https://styled-components.com/)

You can also take a look at [package.json](package.json) to know more about the App dependencies.
