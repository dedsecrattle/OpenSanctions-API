import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sanctionsRoutes from './routes/sanctions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/sanctions', sanctionsRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});