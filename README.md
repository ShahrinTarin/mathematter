# 📚🧪MathMatter♾️🌠

## Purpose
MathMatter is an interactive web application designed to make learning mathematics engaging, accessible, and intuitive. Whether you're a student strengthening core concepts or a math enthusiast solving advanced problems, MathMatter provides a dynamic platform with practice tools, problem sets, visualizations, and personalized progress tracking. With real-time feedback and a clean UI, it simplifies complex topics and fosters confident learning in a fun, gamified environment.


## Live URL
(https://mathmatter-by-shahrin-tarin.web.app/)

## Key Features
- **Responsive Design**: A clean, user-friendly layout with sections for a header, and footer.Seamless browsing with React and React Router.
- **Top Blogs** – Retrieve the top 10 blogs based on the word count of the long description.
- **Get All Blogs** – Filter blogs by `category` or `title` using query parameters.
- **Long Description's length Based Ranking**: Blogs sorted by length of long description  for easy discovery.
- **User-Generated Blogs**: Upload Blogs with images, description, and categories.
- **Interactive Blog Cards**:comment, edit, or delete Blogs with real-time updates.
- **Personalized Blog  Collections**: Filter Blogs by Blog's Title.
- **React-motion**:Motion increase the user experience.
- **Add Comment** – Post comments on individual blogs.
- **View Comments** – You can see all comments for a specific blog.
- **Add to Wishlist** – Add a blog to a user’s wishlist (duplicate prevention included).
- **Get Wishlist** – View all wishlist items for a specific user (requires JWT verification).
- **Delete Wishlist Item** – Remove a specific item from the wishlist by ID.


## NPM Packages Used
- **React**: Core library for building UI components.
- **React Router**: Enables single-page app routing for quizzes, profiles, etc.
- **react-dom**: Supports rendering React components in the DOM (included with Create React App).
- **sweet-alert2**: Provides a customizable, modern popup library for alerts and confirmations in web applications. Easily integrated with React to enhance user interactions with styled, animated dialogs, replacing basic browser alerts.
- **react-icons**: Offers a collection of popular icon libraries (e.g., Font Awesome, Material Icons) as React components. Simplifies adding scalable, customizable icons to React apps, enhancing UI with minimal setup.
- **Framer Motion**: Adds sleek transitions and UI animations.
- **styled-components:**: Facilitates reusable, scoped CSS styling for recipe cards and buttons, ensuring maintainable and consistent design (npm install styled-components).
---

## 📂 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── contexts/        # Context providers
├── hooks/           # Custom hooks
├── pages/           # Page components
├── routes/          # App routing
├── services/        # API service functions
├── styles/          # Global styles
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account
- Firebase project with Service Account

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project-directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** Create a `.env` file in root directory with
   these variables:

   ```
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   JWT_SECRET_KEY=your_jwt_secret
   FB_SERVICE_KEY=your_firebase_service_account_base64
   ```

4. **Run the server**

   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Test the server** The server should be running at:
   ```
   http://localhost:3000
   ```
   ---

   ## Live URL For Backend
(https://assignment-11-server-two-drab.vercel.app/)

## ⚙️ Tech Stack

| Tech           | Usage                        |
|----------------|------------------------------|
| Node.js        | Backend runtime              |
| Express.js     | Web server framework         |
| MongoDB        | Database (with collections: blogs, wishlist, comments) |
| Firebase Admin | JWT authentication & decoding |
| Cookie-Parser  | JWT cookie handling          |
| CORS           | Cross-origin resource sharing |

---

## 🔐 Middleware

- **`verifyJWT`**: Ensures requests have a valid Firebase ID token and attaches the decoded email to the request.
- Applies to secure endpoints like `GET /wishlist/:email` and `POST /blogs`.

---



## 📁 API Endpoints Overview

| Method | Route                     | Description                           |
|--------|---------------------------|---------------------------------------|
| GET    | `/blogs`                  | Get all blogs with optional filters   |
| GET    | `/blogs/:id`              | Get a single blog by ID               |
| POST   | `/blogs`                  | Add a new blog (JWT required)         |
| PUT    | `/blogs/:id`              | Update a blog                         |
| GET    | `/recentblogs`            | Get the 6 latest blogs                |
| GET    | `/topblogs`               | Get top 10 blogs (by description size)|
| GET    | `/wishlist/:email`        | Get user’s wishlist (JWT required)    |
| POST   | `/wishlist/:blogId`       | Add to wishlist (prevents duplicates) |
| DELETE | `/wishlist/:id`           | Delete wishlist item                  |
| POST   | `/comment/:blogId`        | Add a comment to a blog               |
| GET    | `/comment/:blogId`        | View all comments for a blog          |

---

