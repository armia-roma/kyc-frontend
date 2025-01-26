# kyc

This project is the frontend for a simplified KYC (Know Your Customer) system, built with Vue 3, Vite, and Vuetify. It allows users to register, submit KYC details, and view their status, while admins can manage KYC submissions and view a dashboard of key metrics.

## Features

- User authentication and role-based access (Admin/User).
- KYC submission form with file upload.
- Admin dashboard for managing user submissions and status updates.
- Key Performance Indicators (KPIs) displayed on the dashboard ( total users, pending/ approved/rejected submissions).

## Assumptions

### 1. State Management:

- Assumption: The application uses local component state.

- Reason: Since the project is small, global state management tools like Vuex are not required. If the application grows, Vuex could be integrated for scalability.

### 2. KYC Submission Status

- Assumption: Submission statuses (Pending, Approved, Rejected) are hardcoded on the frontend.

- Reason: simplifies testing, In the future, it can dynamically fetch the statuses from the backend.

### 3. Route guards

- Assumption : Route guards are implemented to restrict access to authenticated and authorized users.

- Reason: To ensure secure navigation and role-based access to pages like the admin dashboard.

## Project Setup

### Clone the repository

```sh
git clone https://github.com/armia-roma/kyc-frontend.git
```

```sh
cd kyc-frontend
```

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
