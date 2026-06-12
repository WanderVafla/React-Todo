# React Todo List

## Setup

Clone reposetory
```bash
git clone git@github.com:WanderVafla/React-Todo.git
```

Move in folder
```bash
cd React-Todo
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

* **Core:** [React](https://react.dev/) (Functional Components & Hooks)
* **State Management:** [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction) (Clean, lightweight, and centralized global state)
* **Database / Backend:** [REST API](https://swagger.todos.in.jt-lab.ch/) using Async/Await (`api.ts`) with data persistence

## Project Structure

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
```

## Component Tree & Architecture

The diagram below maps out the complete component hierarchy, architectural wrappers, and nesting layouts based on the application's source code and live DOM state:

```text
                                  [ App.tsx ]
                                       │
           ┌───────────────────────────┼─────────────────────────────────────┐
           │                           │                                     │
    [ ErrorFrame ]                  [ main ] (HTML base component)  [ DeleteAllDialog ]
           │                           │
     [ ErrorItem ]                 ┌───┴───┐
                                   │  h1   │ (HTML base component)
                                   └───┬───┘
                                       │
                                 [ Suspense ] (fallback: <SpinnerLoading />)
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
             [ FormAddTask ]                       [ ErrorBoundary ] (fallback: <ErrorFallback />)
                                                          │
                                                    [ TodoList ]
                                                          │
                                                    [ TodoItem ]
                                                          │
                                                    [ EditModal ]
```

### Breakdown of what this shows:
* **The Global Layer:** `ErrorFrame` (and its children `ErrorItem`) handles global error toast alerts, while `DeleteAllDialog` handles overlay modal confirmations. Both live outside the primary layout container.
> #### Component Interactions & Modals:
> * **`EditModal`** is embedded inside each `TodoItem`. Clicking the edit button triggers a modal overlay that allows the user to update the specific task's details.
>  * **`DeleteAllDialog`** acts as a safety confirmation checkpoint. Clicking the "Delete All" button opens a dialog window asking the user to confirm before wiping the database store.

* **The Structural Layer:** The `<main>` HTML tags contain the core app layout.
* **The Async & Safety Layer:** `<Suspense>` catches loading states (rendering your `SpinnerLoading` component), while the `<ErrorBoundary>` isolates any runtime crashes inside the list without breaking the rest of the application.