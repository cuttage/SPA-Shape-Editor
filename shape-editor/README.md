# Matter.js Shape Editor

## React-based Physics Simulation with TypeScript and Redux Toolkit using Matter.js for Shape Editor

This project is a React application that allows the user to draw polygons, hexagons, and triangles on an HTML5 canvas. It is powered by Matter.js physics engine and leverages React's hooks for its interactivity. The design involves Matter.js world and the React library working together to handle canvas rendering, collision detection, and physics simulation.

In other words, this project is a web application for creating and editing shapes using Matter.js, a 2D physics engine, and React, a popular JavaScript library for building user interfaces. The project uses Redux Toolkit, a library for managing state in React applications, to manage the application's state.

### Design

The application is built as a single-page web application using React components. The user interface is designed to be intuitive and easy to use, with tools for creating, editing, and deleting shapes. The canvas is built using Matter.js, which provides physics simulation and collision detection for the shapes.

### Features

The application provides the user with the ability to draw polygons, hexagons, and triangles, which can interact with one another via physics simulation.

The user can select and drag shapes on the canvas.

The application provides a visual distance between shapes when they come within a certain range.

### Likes

The application uses the Matter.js physics engine, which provides a robust and stable physics simulation. The React library has also made the project more manageable and easier to maintain.

The code is readable and well-structured, with helpful comments that make it easy for other developers to understand.

### Dislikes

The use of any and as typecasts reduce the type safety of the codebase.

The use of intervals can cause issues with rendering on some devices, as the frame rate can vary depending on the device. A more performant approach like requestAnimationFrame can be used instead.

### More Likes and Dislikes

One of the things that I like about this solution is the use of Redux Toolkit for state management, which helps to keep the code organized and maintainable. The use of Matter.js also provides a robust physics engine for the application.

However, one of the drawbacks of this solution is that it may not be as performant as a native application. Additionally, while the user interface is designed to be easy to use, there may still be room for improvement in terms of user experience.

Overall, this project provides a solid foundation for building a shape editor application using React and Matter.js. With further development and optimization, it has the potential to be a powerful tool for creating and editing shapes.

# Notable Functions and Algorithms:

## Axis-Aligned Bounding Box (AABB):

### Description

This repository contains a function called isPointInsideAABB that determines if a point is inside an axis-aligned bounding box (AABB) in two-dimensional space. The function takes three parameters: the AABB, the x-coordinate of the point, and the y-coordinate of the point.

The AABB is represented by an object with two properties: min and max. Each property is an object with two properties of its own: x and y. The min object represents the bottom-left corner of the AABB, and the max object represents the top-right corner of the AABB.

### Design

The isPointInsideAABB function uses a simple algorithm to determine if a point is inside an AABB. The algorithm checks if the x-coordinate of the point is between the minimum and maximum x-coordinates of the AABB, and if the y-coordinate of the point is between the minimum and maximum y-coordinates of the AABB. If both conditions are true, then the point is inside the AABB.

### Pros and Cons

#### Pros

The function is simple and easy to understand.

The algorithm is efficient and does not require any complex calculations.

#### Cons

The function only works for axis-aligned bounding boxes, which may not be suitable for all applications.

The function assumes that the input is valid and does not perform any error checking.

## Digital Differential Analyzer (DDA) algorithm:

### Design

The code provided consists of two parts. The first part is the draw function which takes a shape parameter and draws it using the Digital Differential Analyzer (DDA) algorithm. The second part is the DDA algorithm itself which calculates the incremental changes in x and y to draw the shape.

### Likes

One of the things that I like about this solution is that it is using a well-known algorithm to draw shapes, which is the DDA algorithm. This algorithm is efficient and commonly used in computer graphics. Also, the draw function is modular, meaning it can draw different shapes depending on the input.

### Dislikes

One thing that could be improved in this solution is the naming of variables. The variables used in this code have short and unclear names which may make it difficult for others to understand the code. Additionally, the any type used in the function parameters and return types is not very specific and could be replaced with more precise types. Finally, looking at it in isolation it's not clear what the pointsArrayRect, pointsArrayHex, and pointsArrayTrian arrays are used for, so some comments or documentation about their purpose would be helpful.

Overall, the code provided is a good starting point for drawing shapes using the DDA algorithm. By improving the variable naming and adding more documentation, the code can be made more understandable and maintainable.

# Editor AppBar Design

The code includes an EditorAppBar component that renders a MUI Drawer with a list of buttons. The buttons are categorized into two groups: tools and shapes.

Tools group buttons are used to toggle between selectable, clickable and closest point tools. When the button is clicked, the corresponding tool is selected, and if other tools were selected, they are deselected.

Shapes group buttons are used to add shapes (hexagons, squares, and triangles) to the world when clicked.

### What I like about my solution

The code is concise and easy to read. The component is structured and organized. It uses MUI icons that are easy to recognize, and the code applies a simple but effective styling to differentiate between the selected and non-selected tools.

### What I don't like about my solution

The code seems to assume that the world object exists and that it contains bodies, which may not always be the case. It could be improved by adding some checks to avoid potential errors in those cases.

Additionally, the code could be improved by defining constants for the button styles instead of inline styling. This would make the code more maintainable, especially if the styles need to be changed in the future.

# AddHexagonHook Design

This code is a React hook that generates and adds hexagon and circle shapes to a physics world using the Matter.js library. The hook generates random x and y coordinates for each shape and adds them to the world when a button is clicked.

The hook takes two props, width and height, which define the boundaries for placing the shapes. If the width and height are not provided, default values are used. The hook also uses a Redux store to keep track of the number of hexagons that have been added.

In terms of the implementation, the hook defines and returns a set of variables and functions that are used to add shapes to the world. The partC and partD variables hold references to the hexagon and circle shapes, respectively. The hexs and circsh variables hold arrays of hexagons and circles that have been added to the world.

When the handleAddHex function is called, a new hexagon and circle are created with updated IDs based on the number of hexagons that have been added. The new shapes are added to the world, and their references are updated in the partC and partD variables, as well as in the hexs and circsh arrays.

### What I like about my solution

I like how the hook is organized into clear and reusable functions that generate and add shapes to the physics world. The use of Redux to track the number of hexagons added is also a good implementation choice that keeps track of the state of the application.

### What I don't like about my solution

The hook generates random x and y coordinates for each shape, which may not be the best solution if the shapes need to be placed in a specific location. Additionally, the hook assumes that the boundaries for placing shapes are provided as props, which may not always be the case. It could be improved by adding some checks to avoid potential errors in those cases.

# UseAddSquare Hook

The useAddSquare hook is a custom hook in a React-Redux application that generates two different shapes (a rectangle and a circle) with random positions on the screen and adds them to a physics engine (matter-js). This hook takes two arguments, an engine and props which specify the width and height of the screen.

### Design

The hook generates two shapes with random positions, and adds them to the physics engine. The random positions are generated based on the screen size boundaries defined by minX, maxX, minY, and maxY. The positions of the shapes are stored in two useRef objects, partA and partB, which are then used to add the shapes to the physics engine using World.add(). The function handleAddSquare increments a counter in the Redux store and adds the newly created shapes to the respective arrays, rects and circs.

### Likes

The useAddSquare hook is a clean and efficient solution that generates and adds two shapes to a physics engine with random positions. The use of useRef objects to store the positions of the shapes allows easy access to the shapes later on. The implementation of the hook is well thought out, and it provides a simple way to add multiple shapes to the engine.

### Dislikes

The only potential issue with this implementation is that the random positions of the shapes can sometimes overlap, which could cause problems when working with the physics engine. Additionally, the hook is designed to work only with rectangles and circles. Adding support for other shapes may require significant changes to the code.

# React Redux MatterJS useAddTriangle Hook

This code is a custom hook called useAddTriangle which is used in a React Redux application to add triangles and circles to a MatterJS physics engine. The hook returns an object that contains the references to the bodies of the shapes and functions for adding more shapes to the engine.

### Design

The useAddTriangle hook generates random coordinates for the triangles and circles within the boundaries of the container. It creates two classes called PolyBody and CircBody which inherit from the Body class of MatterJS to create polygons and circles respectively. The hook then adds the shapes to the physics engine through the World.add method.

### Likes and Dislikes

I like how this hook makes it easy to add random shapes to a physics engine with minimal configuration required. The use of classes to create the shapes is a good abstraction and keeps the code modular. The only issue I see is that the boundaries for the shapes are hardcoded, which could limit its flexibility. This could be improved by making the boundaries configurable through the hook's props.

Overall, the useAddTriangle hook is a useful and flexible tool for adding shapes to a MatterJS engine in a React Redux application.

# UseShapeDistance Hook

This hook is a custom React hook that visualizes shapes in a Matter.js physics simulation based on the user's input. Specifically, it changes the stroke style of circular bodies in the simulation to either white or transparent based on whether isDistance is true or false.

### Design

The hook takes in a world object as a prop, which is a Matter.js World instance. The handleVisualizeShapeDistance function is called every time the isDistance value changes or the world.bodies, whiteStroke, or transparentStroke variables change. It first checks if there are any circular bodies in the simulation, and if there are, it sets all non-static bodies to static. Then, it checks if any circular bodies have a white stroke style. If they do, it changes their stroke style to transparent, and if they don't, it changes their stroke style to white. Finally, it returns the handleVisualizeShapeDistance function to be used by the parent component.

### Pros and Cons

One of the benefits of this solution is that it is simple and easy to understand. It also makes use of the useEffect and useSelector hooks, which are built-in React hooks that make managing state and side effects easier. One potential drawback of this solution is that it relies on the world object being passed in as a prop, which could be problematic if the parent component does not pass it in correctly or if the world object is modified outside of this hook.

Overall, this solution is effective for its intended purpose, which is to visualize shapes in a Matter.js physics simulation. However, there may be room for improvement in terms of making the hook more flexible and easier to use in different contexts.

# useShapeDrag

This is a React Hook that allows you to drag a physics shape in a Matter.js world.

### Design

The design of this hook is simple and straightforward. It receives a world object and a foundPhysics object as arguments, and returns a function that can be called to handle the drag behavior.

The function checks if there are any physics bodies found in foundPhysics. If there are none, the function exits. If there is a body, the function checks if it is clickable, and if it has the limeStroke stroke style. If it is clickable and has the correct stroke style, the function sets all other non-static bodies in the world to static, and sets the selected body to non-static (allowing it to be dragged). If it is not clickable, the function sets all bodies to static.

The function returned by this hook can be called in a useEffect hook with appropriate dependencies to ensure that it is called when the appropriate state changes.

### Likes and Dislikes

I like the simplicity of this hook, as it is very easy to understand what it does and how it works. I also appreciate that it checks for the appropriate stroke style on the selected physics body, to ensure that only draggable bodies are affected.

However, one potential downside of this hook is that it sets all non-static bodies to static when a shape is dragged. Depending on the specific application, this could be undesirable behavior. Additionally, the use of world.bodies in the useEffect dependency array could potentially cause unnecessary re-renders if the bodies array changes frequently.

# useShapeSelect

This code exports a custom hook named useShapeSelect that is used to manage the selection of a shape in a physics simulation created using the Matter.js library.

### Design

The hook takes two arguments, world and foundPhysics, which are objects representing the Matter.js world and a mutable reference to an array of physics objects that are currently selected, respectively. The hook uses these arguments to implement the shape selection functionality.

The code first checks if there are any non-static bodies in the world, and if so, makes them all static except for the currently selected body. Then it sets the strokeStyle, fillStyle, and lineWidth properties of the selected body's render object to highlight it.

If no shape is currently selected, the code loops through all the bodies in the world and resets their render properties to their default values.

### Likes and Dislikes

One thing I like about this implementation is that it uses the map and filter functions to perform operations on arrays of bodies in a concise and readable way. I also appreciate that it checks whether a selected body is a wall before highlighting it, preventing walls from being selected.

One thing I'm not so fond of is that the code only allows for a single body to be selected at a time. This could be a limitation depending on the requirements of the project. Additionally, the logic for selecting and deselecting bodies is combined in a single function, which could make the code harder to reason about or modify.

Overall, the useShapeSelect hook is a simple and effective implementation of shape selection for a Matter.js simulation.

# useWorldToJsonPrinter Function

### Design Overview

The useWorldToJsonPrinter function takes in a World object from the matter-js library and returns a function that can be used to print the JSON representation of the world to the console. The function uses a circularReplacer helper function to handle circular references in the world object.

### Pros

The function is designed to be reusable and modular.

The function uses the World object from the matter-js library, which is a commonly used library for physics simulations.

The use of WeakSet to handle circular references is a good practice to avoid infinite loops in the JSON representation.

### Cons

The function only prints the JSON representation of the world to the console, and does not return the JSON object, which may be limiting in some use cases.

The function does not have any error handling for cases where the World object is invalid or null.

Overall, the useWorldToJsonPrinter function is a useful utility for printing the JSON representation of the World object in a physics simulation, but may need to be extended for more complex use cases.

# Redux Toolkit Code

The code contains a few files that demonstrate how to use Redux Toolkit. The toolkit provides an opinionated, yet flexible, approach to managing state in a React application.

### Design

The code uses Redux Toolkit to define four reducers and a store. Each reducer is created using createSlice, which provides a simple way to create a slice of state with a set of actions. The actions are functions that are used to modify the state. The store combines the reducers and creates a single state tree.

### Likes

One advantage of this approach is that it provides a clear separation of concerns. Each reducer is responsible for managing a specific piece of state, and the store combines them into a single source of truth. This makes it easy to reason about the state of the application and update it in response to user interactions. Additionally, Redux Toolkit provides many useful features such as built-in immutability, Redux DevTools integration, and simplified action syntax.

### Dislikes

One potential downside of this approach is that it can be a bit verbose, especially when defining a large number of actions or complex reducers. Additionally, because Redux Toolkit is an opinionated framework, it may not be suitable for all use cases or projects. Finally, since Redux can be used to manage global state, it can be challenging to reason about how changes to the state in one part of the application may affect other parts.

Overall, Redux Toolkit provides a powerful and flexible way to manage state in a React application. The approach used in this code can be a good starting point for building more complex applications that require a scalable, maintainable approach to state management.

# Matter.js Physics Engine - Body Classes

This repository contains three classes that represent different types of bodies in Matter.js physics engine.

### Design

Each class is implemented with TypeScript, and uses Matter.js library to create physical bodies. The classes are structured to encapsulate the Matter.js Body object and its properties inside the classes, and expose them only through getter methods. Each class uses different parameters to create the bodies based on their shape, size, and label.

### CircBody

Creates a circular body with a given position, size, and label. The properties of the body are set such that the body has no collision with other bodies in the simulation.

### PolyBody

Creates a polygonal body with a given position, number of faces, size, and label. The properties of the body are set such that the body is static, i.e., it does not move during simulation, and has infinite inertia.

### RectBody

Creates a rectangular body with a given position, size, and label. The properties of the body are set such that the body is static, i.e., it does not move during simulation, and has infinite inertia.

### Likes and Dislikes

One of the advantages of the implementation is that the classes are easy to use and abstract the complexity of the Matter.js Body object from the user. The implementation also ensures that the properties of the bodies are set consistently across different instances of the same body class.

One of the disadvantages of the implementation is that the properties of the bodies are hardcoded into the class constructors. This means that if a user needs to change the properties of a body, they would have to modify the class itself. A better approach would be to allow the user to pass in parameters to the class constructors that would override the default properties of the bodies.

# PointsArrayPoly Class

### Design

The PointsArrayPoly class is designed to represent an array of points with their corresponding shapes. The push method is used to add a new point with its x and y coordinates and its shape. The getPoints method returns an array of all the added points with their shapes, and the clear method empties the points array.

### Likes

The class is simple and straightforward, which makes it easy to use and understand. It serves the purpose of storing points and their corresponding shapes well.

### Dislikes

The points array is defined as any type, which may cause problems if the wrong type of data is added to the array. Additionally, the shape parameter in the push method is defined as a string, which may not be descriptive enough in some cases. Finally, the class does not provide any additional functionality beyond storing points, which may limit its usefulness in more complex applications.

Overall, the PointsArrayPoly class is a simple and useful tool for storing points and their corresponding shapes.

# Dependencies in package.json

- "@mui/icons-material": "^5.11.11"

This package provides icons for use with the Material UI library.

- "@mui/material": "^5.11.14"

This package provides components for use with the Material UI library, such as buttons, text fields, and menus.

- "@reduxjs/toolkit": "^1.9.3"

This package is a library for managing state in Redux applications. It provides utilities for defining slices of state, which are self-contained pieces of the application's state, and for creating Redux store instances.

- "matter-js": "^0.19.0"

This package provides a 2D physics engine for use in web applications. It provides physics simulation and collision detection for objects on a canvas.

- "react": "^18.2.0"

This package is a JavaScript library for building user interfaces. It provides a declarative syntax for defining UI components and managing state changes.

- "react-dom": "^18.2.0"

This package provides the ReactDOM library, which is used to render React components to the browser.

- "react-redux": "^8.0.5"

This package provides bindings for using Redux with React. It provides a higher-order component for connecting React components to the Redux store, and a hook for accessing the store from within a React component.

- "redux": "^4.2.1"

This package provides a predictable state container for JavaScript applications. It provides a single source of truth for the application's state, and provides utilities for updating that state in a predictable way.

# devDependencies in package.json

- @types/matter-js: This package provides type definitions for Matter.js, a physics engine library that is used in the project. By installing this package, the developer can use TypeScript to check that the types of the code are correct.

- @types/react: This package provides type definitions for React, a JavaScript library for building user interfaces. By installing this package, the developer can use TypeScript to check that the types of the code that use React are correct.

- @types/react-dom: This package provides type definitions for ReactDOM, the entry point for using React in web browsers. By installing this package, the developer can use TypeScript to check that the types of the code that use ReactDOM are correct.

- @vitejs/plugin-react: This package provides a plugin for Vite, a build tool for web applications. The plugin adds support for compiling and bundling React components in a Vite project.

- typescript: This package provides TypeScript, a language that adds static type-checking to JavaScript. By installing this package, the developer can use TypeScript to write type-safe code.

- vite: This package provides Vite, a build tool for web applications. Vite is used in the project to build and serve the application during development.

# Shape Editor - New technologies I used

Shape Editor is a web application built with React and Redux that allows users to draw and manipulate shapes on a canvas using the Matter.js physics engine. In this project, I used three new technologies/approaches: Matter.js, the Axis-Aligned Bounding Box (AABB), and the Digital Differential Analyzer (DDA) algorithm.

### Matter.js

Matter.js is a 2D physics engine library for the web. It provides a way to simulate physical interactions between bodies and allows for realistic motion and collision detection. In Shape Editor, Matter.js is used to handle the physics of the shapes on the canvas. This was a new experience for me, and I enjoyed learning how to use it effectively.

### Axis-Aligned Bounding Box (AABB)

In Shape Editor, I also learned about the Axis-Aligned Bounding Box (AABB). The AABB is a rectangular box that can completely contain an object in 2D space. It is used for collision detection in the Matter.js physics engine. This was a new concept for me, and I found it interesting to learn how it is used in practice.

### Digital Differential Analyzer (DDA) algorithm

The Digital Differential Analyzer (DDA) algorithm is used for rendering lines on the canvas. It determines which pixels to color in order to create a straight line between two points. This algorithm was also new to me, and I enjoyed learning about it and seeing how it is used in practice.

Overall, working on Shape Editor was a great learning experience for me. I was able to explore new technologies and approaches, and I gained valuable experience working with the Matter.js physics engine, the AABB, and the DDA algorithm.

# To work with this code

## Installation

---

1.  Clone this repository to your local machine.
2.  Install Node.js and npm if not already installed. (Recommended Node.js version is v18.13.0)
3.  Run `npm install` to install dependencies.

## Development

---

To start a development server, run the following command:

`npm run dev`

This will start a Vite development server and open the application in your default browser. (Tested and stable on Google Chrome Version 111.0.5563.110 (Official Build) (x86_64))

## Build

---

To create a production build of the application, run the following command:

`npm run build`

This will create an optimized production build of the application in the `dist/` directory.

## Preview

---

To preview the production build, run the following command:

`npm run preview`

This will start a Vite preview server and open the production build of the application in your default browser.

## Dependencies

---

- `@mui/icons-material`: ^5.11.11
- `@mui/material`: ^5.11.14
- `@reduxjs/toolkit`: ^1.9.3
- `matter-js`: ^0.19.0
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-redux`: ^8.0.5
- `redux`: ^4.2.1

## Dev Dependencies

---

- `@types/matter-js`: ^0.18.2
- `@types/react`: ^18.0.28
- `@types/react-dom`: ^18.0.11
- `@vitejs/plugin-react`: ^3.1.0
- `typescript`: ^4.9.3
- `vite`: ^4.2.0

## License

---

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

# Final Notes

The only intentional difference from the original project requirements is the way the closest point tool works for each shape category. For the first shape added to the matter.js world in each category (triangle, hexagon, and rectangle), the closest point tool works as intended. However, for any subsequent shapes in the same category, the closest point tool behaves differently.

When the mouse pointer is outside of any shape in the category, the closest point tool detects the closest point among all shapes in the category and displays it. When the mouse pointer is inside a shape, the tool displays two points: one that follows the pointer and another on the closest outer edge of the shape.

This implementation in the application specific design pattern was chosen to avoid supercharging the computations that keep track of the closest point, which could result in a performance loss. This way, the simulation can run smoothly and efficiently.

Overall, this project is an excellent showcase of the capabilities of matter.js in handling complex physics simulations and demonstrates how small design choices can have a significant impact on performance.
