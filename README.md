# React Todo List

## Setup

Clone reposetory
```bash
git clone git@github.com:WanderVafla/React-Todo.git
```

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
pnpm run dev
```

Build the app for production:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

## Features

This Todo List application comes packed with a variety of features designed to help users manage their daily tasks efficiently:

* **Full CRUD Operations:** Seamlessly **create, read, update, and delete** tasks. Editing a task happens inline for a smooth user experience.
* **Due Dates:** Set specific deadlines for each task to keep track of upcoming priorities.
* **Smart Filtering:** Quickly filter tasks by status—view **All**, **Completed**, or **Incomplete** tasks with a single click.
* **Advanced Sorting:** Organize your workspace by sorting tasks by **Name (A-Z)**, **Due Date**, or **Newest First**.
* **Robust Error Handling:** Real-time, user-friendly error messages to prevent empty submissions or invalid dates.
* **Modern Grid Layout:** A clean, responsive, and visually appealing grid interface that adapts beautifully to different screen sizes.
* **Bulk Actions:** Clean up your workspace instantly using the **"Delete All Tasks"** button.

## Tech Stack

* **Core:** React (Functional Components & Hooks)
* **State Management:** Zustand (Clean, lightweight, and centralized global state)
* **Database / Backend:** REST API using Async/Await (`api.ts`) with data persistence

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── errorsElements/  # Component(s) handling error messages
│   ├── todoList/        # Core task container and items
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   ├── DeleteAllButton.tsx
│   ├── FormAddTask.tsx
│   └── SpinnerLoading.tsx
├── hooks/               # Custom React hooks
    └── useFilter.ts     # Logic of the button for filtering (button with 3 states)
├── api.ts               # API service layer handling database CRUD requests Fetch interactions
├── App.css              # Main application styles (Grid layout)
├── App.tsx              # Main application wrapper
├── constants.ts         # Fixed configuration values and action types
├── index.tsx            # Application entry point
├── store.ts             # Zustand global state store
├── types.ts             # Shared TypeScript interfaces and types
└── utiles.ts            # Helper/utility functions