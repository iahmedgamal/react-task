import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface NotificationProviderProps {
  children: ReactNode;
}
const NotificationProvider = ({ children } : NotificationProviderProps) => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#4caf50',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#f44336',
              color: '#fff',
            },
          },
        }}
      />
      {children}
    </>
  );
};

export default NotificationProvider;