require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Проверка строки подключения
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri || (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://'))) {
  console.error('Invalid MongoDB URI. Please check your .env file.');
  process.exit(1);
}

// Подключение к MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Определение схемы и модели
const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Application = mongoose.model('Application', applicationSchema);

// Роуты
app.post('/apply', async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  
  try {
    const existingApplication = await Application.findOne({ email });
  
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'Application with this email already exists' });
    } else {
      const newApplication = new Application({ firstName, lastName, phoneNumber, email });
      await newApplication.save();
      return res.json({ success: true, message: 'Application submitted successfully', application: newApplication });
    }
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
