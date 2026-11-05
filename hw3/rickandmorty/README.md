# HW3: Full Stack Frameworks and Libraries

This homework includes the React tic tac toe tutorial, the Socket.IO chat
tutorial, and a React application that uses the Rick and Morty API.

## Requirements

- Node.js 22.12 or newer
- npm
- Internet access for installing packages and using the Rick and Morty API

Run each project from its own folder. Stop a running server with Ctrl + C.

## React Tutorial

From the repository root:

```bash
cd hw3/react
npm install
npm run dev
```

Open the local URL printed in the terminal.

Features:
- Alternating X and O turns
- Prevention of moves in occupied squares
- Winner and draw detection
- Move history with the ability to revisit earlier turns

To check the project:

```bash
npm run build
npm run lint
```

Tutorial: https://react.dev/learn/tutorial-tic-tac-toe

## Socket.IO Tutorial

From the repository root:

```bash
cd hw3/socketio
npm install
npm start
```

Open http://localhost:3000 in two browser tabs.

Send a message from each tab. Both tabs should display both messages
without refreshing.

Features:
- Express serves the chat page
- Socket.IO sends messages to all connected clients
- Empty messages are ignored
- Connections and disconnections are logged in the terminal

Messages are not stored permanently. Refreshing a tab clears its displayed
message history.

Tutorial: https://socket.io/get-started/chat

## Rick and Morty Application

From the repository root:

```bash
cd hw3/rickandmorty
npm install
npm run dev
```

Open the local URL printed in the terminal.

Routes:
- `/home`: Welcome message and application description
- `/characters`: First 100 characters with names, pictures, species, and statuses
- `/species`: All characters grouped by species with counts and names
- `/locations`: All locations counted by type

The characters page requests IDs 1 through 100. The species and locations
pages follow the API pagination links to include all available results.

The application displays loading and error messages. Blank species and
location types are grouped under Unknown.

To check the project:

```bash
npm run build
npm run lint
```

API documentation: https://rickandmortyapi.com/documentation

## Setup Notes

The React projects use Vite for local development.

The original Node.js 16 installation was updated because it did not meet
the current Vite requirements.

Dependencies and generated build folders are excluded from Git.