# EEST Flow · Mobile Forum

Mobile application developed as part of the **EEST Flow** final project for 7.º Programación at E.E.S.T. N.º 1 “República de México”.

This project is a mobile complement to the main EEST Flow web platform and focuses on providing access to the **institutional forum** from mobile devices.

The application is built with **React Native** and **Expo**, allowing it to be tested easily using **Expo Go**.

---

## About EEST Flow

EEST Flow is a private institutional platform designed to support the internal organization of the school.

The main web application includes features such as:

- User authentication
- Internal task management
- Kanban board
- Categories and sectors
- Institutional users
- Notifications
- Internal forum

This repository contains only the **mobile forum module**.

---

## Mobile App Scope

The first version of the mobile application will focus on the institutional forum.

Planned features include:

- View forum posts
- View post details
- Navigate between forum content
- Mobile-friendly interface
- Integration with the EEST Flow backend
- Authenticated access when required

Additional features may be added depending on the progress of the main project.

---

## Technologies

- React Native
- Expo
- JavaScript
- Expo Go

The application may also consume the existing **EEST Flow REST API** for forum data and authentication.

---

## Running the Project

Install the dependencies:

```bash
npm install

Start the Expo development server:
npx expo start

Then open the application using:
- Expo Go on Android or iOS
- Android Emulator
- iOS Simulator
- Expo development tools
Project Structure
The project structure will evolve as development progresses.
A possible initial organization is:
src/
├── components/
├── screens/
├── navigation/
├── services/
├── hooks/
├── utils/
└── assets/

Main Project
This mobile application is part of the broader EEST Flow ecosystem.
The main system is a private web application developed with technologies such as:
- React
- Vite
- Node.js
- Express
- MongoDB
The mobile application does not replace the web platform. Its purpose is to provide a simplified mobile experience for selected EEST Flow features.
Project Status
🚧 In development
Current focus:
- Initial React Native + Expo setup
- Mobile forum interface
- Navigation
- Integration with the EEST Flow backend
Team
Developed by the EEST Flow team:
- Segundo Del Giorgio
- Aimé Sananton
- Joaquín Cáceres
- Benicio Ruiz
- Raúl Bustamante
- Sebastián Galeano
E.E.S.T. N.º 1 “República de México”
7.º Programación · 2026
