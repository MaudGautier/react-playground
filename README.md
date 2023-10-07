# Playground for React

This project is a small playground for me to experiment a bit.

## Getting started

```
# Install dependencies
npm install

# Run the application
npm run start

# Go to http://localhost:1234 in your web browser
```

References to create a minimal setup:

- [Getting started with a minimal project (React, JS, Parcel)](https://levelup.gitconnected.com/how-to-create-a-minimal-react-and-parcel-app-in-5-steps-2806fa09a371)
- [With React 18, use `createRoot` instead of ReactDOM.render which is not supported anymore](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis)

In brief, for a minimal setup with React, JS and Parcel, we need to
install `@babel/preset-env`, `@babel/preset-react`, `parcel-bundler` and create an HTML file (`index.html`) file
sourcing an entry file (`src/index.js`), itself rendering the React component implemented in `src/App.js`.







