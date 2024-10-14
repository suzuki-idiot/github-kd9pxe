import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, UserPlus, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const isAdmin = true; // TODO: 実際の権限に応じて変更

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/schedule-registration"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Calendar size={48} className="text-blue-600 mb-4" />
          <span className="text-lg font-semibold">予定登録</span>
        </Link>
        {isAdmin && (
          <>
            <Link
              to="/user-registration"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <UserPlus size={48} className="text-green-600 mb-4" />
              <span className="text-lg font-semibold">ユーザー登録</span>
            </Link>
            <Link
              to="/user-list"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Users size={48} className="text-purple-600 mb-4" />
              <span className="text-lg font-semibold">ユーザー一覧</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;