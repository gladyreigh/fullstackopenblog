
# Blog List Frontend

This project is a frontend application that allows users to log in, view a list of blogs, create new blogs, and log out. The application is built using React and interacts with a backend API to manage blogs and user authentication.

## Exercises Implementation

### 5.1: Blog List Frontend, Step 1
- **Objective:** Implement login functionality. The token returned from a successful login should be saved to the application's state. If the user is not logged in, only the login form is visible. If the user is logged in, their name and a list of blogs are shown.

- **Implementation:**
  - **Login Form:**
    - The `LoginForm` component is created to allow users to enter their credentials (username and password).
    - Upon submission, the `handleLogin` function in `App.jsx` is called, which interacts with the backend API to authenticate the user.
    - If successful, the returned token and user information are saved to the application's state, and the list of blogs is fetched and displayed.
  - **Conditional Rendering:**
    - If `user` state is `null`, only the login form is displayed.
    - If `user` is not `null`, the user's name and the list of blogs are displayed.

### 5.2: Blog List Frontend, Step 2
- **Objective:** Make the login "permanent" by using local storage. Implement a way to log out and ensure the browser does not remember the user's details after logging out.

- **Implementation:**
  - **Local Storage:**
    - The `useEffect` hook in `App.jsx` is used to check if a user is already logged in by reading from `localStorage`. If found, the user data is set to the state and the token is used to fetch the blogs.
  - **Logout Functionality:**
    - The `handleLogout` function is implemented to clear the user data from both the state and `localStorage`. The `clearFields` state is used to reset the login form fields when logging out.

### 5.3: Blog List Frontend, Step 3
- **Objective:** Expand the application to allow a logged-in user to add new blogs.

- **Implementation:**
  - **Add Blog Form:**
    - A form is provided for logged-in users to create new blogs. This form captures the blog's title, author, and URL.
    - Upon submission, the form calls `handleAddBlog`, which interacts with the backend to create the new blog.
  - **Updating Blog List:**
    - After a blog is successfully added, the list of blogs is updated in the state and re-rendered on the UI.

### 5.4: Blog List Frontend, Step 4
- **Objective:** Implement notifications that inform the user about successful and unsuccessful operations. Notifications must be visible for a few seconds.

- **Implementation:**
  - **Notification Component:**
    - A simple notification system is implemented using a piece of state in `App.jsx` that holds the notification message and type (success or error).
    - Notifications are displayed at the top of the page when the state is updated.
  - **Automatic Dismissal:**
    - Notifications automatically disappear after a few seconds using `setTimeout`.

## Running the Application

```bash
rm -rf .git
```

**Install Dependencies:**
```bash
npm install
```

**Start the Development Server:**
```bash
npm run dev
```

## Key Features

- **User Authentication:** Login and logout functionality with token management.
- **Persistent Login:** Users stay logged in across sessions using `localStorage`.
- **Blog Management:** Logged-in users can view and add blogs.
- **Notifications:** Feedback is provided for various operations like login, logout, and blog creation.

## Future Improvements

- **Error Handling:** Enhance error handling with more detailed messages and logging.
- **Styling:** Improve the user interface with better styling, including success and error colors in notifications.
- **Blog Editing:** Add the ability for users to edit or delete their blogs.
