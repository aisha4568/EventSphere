import { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';
import { connectSocket, disconnectSocket } from '../services/socket';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('es_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('es_token');
    if (!token) { setLoading(false); return; }
    API.get('/auth/me')
      .then((res) => {
        setUser(res.data.data);
        localStorage.setItem('es_user', JSON.stringify(res.data.data));
        connectSocket(res.data.data._id);
      })
      .catch(() => {
        localStorage.removeItem('es_token');
        localStorage.removeItem('es_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const { user, token } = res.data.data;
    localStorage.setItem('es_token', token);
    localStorage.setItem('es_user', JSON.stringify(user));
    setUser(user);
    connectSocket(user._id);
    return user;
  };

  const register = async (payload) => {
    const res = await API.post('/auth/register', payload);
    const { user, token } = res.data.data;
    localStorage.setItem('es_token', token);
    localStorage.setItem('es_user', JSON.stringify(user));
    setUser(user);
    connectSocket(user._id);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('es_token');
    localStorage.removeItem('es_user');
    disconnectSocket();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);