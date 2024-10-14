import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">スケジュール管理</Link>
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="mr-2" size={20} />
              {user}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
            >
              <LogOut className="mr-2" size={20} />
              ログアウト
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;