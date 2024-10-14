const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync();

const SECRET_KEY = 'your_secret_key';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'ユーザーが見つかりません' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'パスワードが正しくありません' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'ユーザーが正常に登録されました', userId: newUser.id });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'このユーザー名は既に使用されています' });
    }
    res.status(500).json({ message: 'ユーザー登録中にエラーが発生しました' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role']
    });
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ message: 'ユーザー一覧の取得中にエラーが発生しました' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, role, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    if (username) user.username = username;
    if (role) user.role = role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: 'ユーザー情報が更新されました' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'ユーザー情報の更新中にエラーが発生しました' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    await user.destroy();
    res.json({ message: 'ユーザーが削除されました' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'ユーザーの削除中にエラーが発生しました' });
  }
});

app.post('/logout', (req, res) => {
  res.json({ message: 'ログアウトしました' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Create initial admin user
(async () => {
  try {
    const adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({ username: 'admin', password: hashedPassword, role: 'admin' });
      console.log('Initial admin user created');
    }
  } catch (error) {
    console.error('Error creating initial admin user:', error);
  }
})();