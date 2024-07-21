require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoute');
const repRouter = require('./routes/repRoute');
const contractRouter = require('./routes/contractRouter');
const productRouter = require('./routes/productRoute');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/representative', repRouter);
app.use('/contract', contractRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
