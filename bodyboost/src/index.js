import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WorkoutProvider } from './contexts/WorkoutContext'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // load translations using http (default public/assets/locales)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng: "en", // use en if detected lng is not available
    debug: true,
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <ThemeProvider>
    <WorkoutProvider>
    <App />
    </WorkoutProvider>
    </ThemeProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
