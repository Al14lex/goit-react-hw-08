import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contacts/operations';
import Layout from "./components/Layout/Layout";
import { lazy, Suspense } from "react";
import { Route, Routes, Navigate  } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { selectIsLoggedIn, selectIsRefreshing } from './redux/auth/selectors';
import { persistor } from './redux/store';
import { refreshUser } from './redux/auth/operations';

const HomePage = lazy(() => import("./pages/HomePage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    persistor.persist(); 
  }, []);

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  if (isRefreshing) {
    return null;
  }
  
  return (
     <Layout>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/contacts" /> : <LoginPage />} />
          <Route path="/contacts" element={isLoggedIn ? <ContactsPage /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

