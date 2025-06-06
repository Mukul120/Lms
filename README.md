﻿# learning management system (lms)

a mern stack learning management system with role-based authentication for admin, educators, and students.  
admin can manage platform settings, educators can create and manage courses with videos, pdfs, and images via cloudinary, and students can browse, enroll, view content, and track their progress.

## 🚀 features
- role-based authentication (admin, educator, student)
- admin dashboard to manage platform
- educators can create and upload full courses
- students can enroll, view, and track course progress
- secure file uploads (images, videos, pdfs) via cloudinary
- real-time progress tracking
- responsive frontend built with react.js and tailwind css
- course search and detailed views
- video streaming and pdf downloading

## 🛠️ tech stack
- **frontend**: react.js, tailwind css, redux toolkit (optional)
- **backend**: node.js, express.js, mongodb
- **storage**: cloudinary (for videos, pdfs, images)
- **authentication**: jwt

## 📦 installation
```bash
# clone the repository
git clone https://github.com/Mukul120/Lms.git

# move into the project directory
cd your-lms-repo

# install frontend dependencies
cd client
npm install

# install backend dependencies
cd ../server
npm install

#### create a .env file inside /server folder and add the following:
#### mongodb_uri=your_mongodb_connection_string
#### cloudinary_cloud_name=your_cloudinary_name
#### cloudinary_api_key=your_cloudinary_api_key
#### cloudinary_api_secret=your_cloudinary_api_secret
#### jwt_secret=your_jwt_secret
#### port=5000

# run the backend server
npm run dev

# run the frontend client (in a second terminal)
cd ../client
npm start
```
```bash
lms-project/
├── client/                  # react frontend
│   ├── public/              # static files
│   ├── src/                 # source code for react app
│   │   ├── assets/          # images, icons
│   │   ├── components/      # reusable components (buttons, forms, etc.)
│   │   ├── pages/           # full pages (home, dashboard, etc.)
│   │   ├── redux/           # redux store and slices (if using)
│   │   ├── services/        # api calls (axios)
│   │   └── app.jsx          # root app component
│   │   └── index.js         # entry point for react
│   ├── package.json         # frontend dependencies
│
├── server/                  # node.js backend
│   ├── controllers/         # route handlers (for API)
│   ├── models/              # mongoose schemas
│   ├── middlewares/         # authentication, error handling
│   ├── routes/              # express routes for API
│   ├── utils/               # cloudinary upload helpers, jwt utilities
│   ├── config/              # db connection settings
│   ├── server.js            # entry point for backend server
│   └── package.json         # backend dependencies
│
├── .gitignore               # files/folders to ignore in git
├── README.md                # this file
```

## 🏷️ topics
- lms
- mern
- react
- nodejs
- express
- mongodb
- cloudinary
- course-management
- role-based-authentication
- admin
- educator
- student
- file-upload
- video-streaming
- pdf-download
- learning-platform
- full-stack-education
- student-portal
- educator-dashboard
- admin-dashboard
- progress-tracking
- web-app

## 🔗 live demo
https://lms-frontend-e4jp.onrender.com/

## 🙌 contributions
this project is private and not open for public contributions.

## 📄 license
this project is not open source.
all rights are reserved by the owner.

# built with ❤️ by mukulsinh rana
