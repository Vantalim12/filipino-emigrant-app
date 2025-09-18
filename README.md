# Filipino Emigrants Database

A React web application for managing and visualizing Filipino emigrants data with Firebase integration.

## Features

- **CRUD Operations**: Add, view, edit, and delete emigrant records
- **Data Visualization**: Interactive bar charts showing emigrants by marital status
- **Authentication**: Secure login with email/password and Google sign-in
- **Real-time Database**: Firebase Firestore for data storage
- **Responsive Design**: Works on desktop and mobile devices

## Dependencies Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Required Packages

The following packages are automatically installed:

- `react` - UI framework
- `react-dom` - React DOM rendering
- `firebase` - Firebase SDK
- `react-firebase-hooks` - Firebase authentication hooks
- `recharts` - Data visualization library
- `vite` - Build tool and development server

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## Firebase Configuration

Make sure to configure your Firebase project with:

- Firestore Database (emigrants collection)
- Authentication (Email/Password and Google)
- Security rules for authenticated access

## Project Structure

```
src/
├── components/
│   └── Auth.jsx          # Authentication component
├── services/
│   └── emigrantsService.js # Firebase CRUD operations
├── App.jsx               # Main application component
├── firebase.js           # Firebase configuration
└── style.css            # Application styles
```

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Firebase (Firestore, Authentication)
- **Visualization**: Recharts
- **Styling**: CSS3
