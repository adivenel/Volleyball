import React, { useState } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { useAuth } from '../../model/AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const { login, register } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    onClose();
  };

  const handleRegister = async (email: string, password: string) => {
    await register(email, password);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? 'Вход' : 'Регистрация'}>
      {mode === 'login' ? (
        <LoginForm
          onSubmit={handleLogin}
          onSwitchToRegister={() => setMode('register')}
          onClose={onClose}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          onSwitchToLogin={() => setMode('login')}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};