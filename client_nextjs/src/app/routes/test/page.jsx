"use client"
import React from 'react';
import { ToastContainer } from 'sonner';
import ToastNotification from '@/app/utils/toastNotification';

function TestComponent() {
  const showToast = () => {
    ToastNotification(1, "This is a test success toast!");
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      </div>
  );
}

export default TestComponent;
