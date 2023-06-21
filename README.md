# Dreamflow

# Getting Started with DreamFlow
This project is an implementation of a  Visual Website Builder [dreamFlow], front-end built on TypeScript, React, Redux.
Backend which is built on Node.js, Express, and Firebase, is in a different repository *.

* Some of the functionality like Command control, a tool using LLM for code generation, can only be accessed by serving the backend API at endpoint:
http://localhost:5001/typeflow/us-central1/api/[A-Za-z]+-(?i)openai|penn-teller|angelou|steven-hawking|aristotle|einstein

## Screenshot and GIFs
![image](https://github.com/abhaykvincent/dreamflow/assets/13717741/62b08a2b-1d9a-4693-98d4-a1225d47fc4c)
![Uploading image.png…]()

## Core Structure

The core structure of the project is as follows:
NB: Only the core structure is shown, the project is still in development and the structure is subject to change.

```
    Code
    │
    ├── flow (Frontend)
    │   ├── 📁 public
    │   │
    │   ├── 📁 src
    │   │   ├── 📁 app
    │   │   │   ├── hooks.ts
    │   │   │   └── store.ts
    │   │   ├── 📁 assets
    │   │   ├── 📁 components
    │   │   │
    │   │   ├── 📁 features
    │   │   │   ├── 📁 canvas
    │   │   │   ├── 📁 commandControl
    │   │   │   └── 📁 [...incomplete]
    │   │   │
    │   │   ├── App.jsx
    │   │   ├── App.scss
    │   │   ├── Index.scss
    │   │   └── index.jsx
    │   │
    │   └── package.json
    │
    ├── .gitignore
    └── README.md
```
## Read first

### `BUG Alert`

This is a work in progress.
This software/web-app is not ready for production use.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the React app [DreamFlow] in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app [Flow] for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

To learn more, check out  the [Project documentation]([https://reactjs.org/](https://apeiro.atlassian.net/wiki/spaces/FHOP/pages/2883847/DreamFlow)).
