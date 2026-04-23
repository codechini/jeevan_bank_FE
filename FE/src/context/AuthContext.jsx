import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getToken, getUser, setUser } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setToken] = useState(getToken() || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUserState(storedUser);
      setRole(storedUser.role || null);
    }
  }, []);

  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    if (response.token) {
      setToken(response.token);
      setUserState(response.user);
      setRole(response.user?.role || null);
      setUser(response.user);
      setIsAuthenticated(true);
    }
    return response;
  };

  const logout = () => {
    apiLogout();
    setUserState(null);
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;