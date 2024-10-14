import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'ログインに失敗しました');
    }
    throw new Error('ログイン中にエラーが発生しました');
  }
};

export const logout = async () => {
  // クライアントサイドでのログアウト処理のみを行う
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const registerUser = async (username: string, password: string, role: string) => {
  try {
    const response = await api.post('/register', { username, password, role });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'ユーザー登録に失敗しました');
    }
    throw new Error('ユーザー登録中にエラーが発生しました');
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'ユーザー一覧の取得に失敗しました');
    }
    throw new Error('ユーザー一覧の取得中にエラーが発生しました');
  }
};

export const updateUser = async (id: number, userData: { username?: string; role?: string; password?: string }) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'ユーザー情報の更新に失敗しました');
    }
    throw new Error('ユーザー情報の更新中にエラーが発生しました');
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'ユーザーの削除に失敗しました');
    }
    throw new Error('ユーザーの削除中にエラーが発生しました');
  }
};