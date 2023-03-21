const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('./users/user.router');
const authRouter = require('./auth/auth.router');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

class CrudServer {
  constructor() {
    this.server = null;
    this._costFactor = process.env.SALT_ROUND;
  }
  async start() {
    this.initServer();
    this.initMiddleware();
    this.initRouters();
    this.startListener();
    await this.initDataBase();
    this.initErrorHandling();
  }

  initServer() {
    this.server = express();
  }
  initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    // this.app.use(morgan('combined'));
  }
  initRouters() {
    this.server.use('/users', userRouter);
    this.server.use('/auth', authRouter);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message,
      });
    });
  }

  async initDataBase() {
    const url = process.env.MONGODB_URL;

    if (!url) {
      throw new Error('Auth url must be defined');
    }
    try {
      await mongoose.connect(url);

      console.log('Server connected to MongoDb!');
    } catch (err) {
      throw new DbConnectionError();
    }
  }

  startListener() {
    this.server.listen(process.env.PORT, () => {
      console.log('Server was ran', process.env.PORT);
    });
  }
}

exports.crudServer = new CrudServer();
