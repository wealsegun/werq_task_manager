"use client";
import { Component } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
// import '../styles/globals.css';

export default function Home() {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
