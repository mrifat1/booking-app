# Booking App (React Native - Expo)

This is a simple **Booking Application** built with **React Native** and **Expo**.  
It features basic **authentication**, a **hospitals list**, and a **booking flow** using **mocked APIs**.

---

## 🚀 Tech Stack

- React Native (Expo)
- TypeScript
- Expo Router (navigation)
- Axios (API calls)
- Mocky (mock API)

---

## 📚 Features

- **Login Screen**:  
  User can log in using email and password (mocked API).

- **Hospitals List**:  
  Fetches and displays a list of hospitals.

- **Booking Flow**:  
  Allows booking simulation for hospital services.

---

## 🔗 Mock API (Mocky)

- **Login API**: POST call with `email` and `password`.
- **Hospitals API**: GET call to fetch a list of hospitals.
- **Mock Data**: There are a file in the project named mockData.
You can get the mock response of login api, hospitals list and booking status api response there.
Use mocky.io to generate your mock api with the provided data and place that in api.ts file in every api call.

---

## 🛠 Axios Setup

- Axios instance configured separately in `services/api.ts`.
- Easy to switch between different base URLs.

Example:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://run.mocky.io/v3', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

## 🛠 Get started

1. Install dependencies

   ```npm install```

2. Start the app

   ```npx expo start```
