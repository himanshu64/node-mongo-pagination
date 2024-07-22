require('dotenv').config('../../.env');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const { User } = require('../models');

mongoose.connect(
  'mongodb+srv://admin:qVH1tIAwzCWvNhyZ@pagination.d45fxng.mongodb.net/?retryWrites=true&w=majority&appName=pagination'
);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  // Clear existing users
  await User.deleteMany({});

  // Generate 200 users
  const users = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1000; i++) {
    users.push({
      userId: uuidv4(),
      name: faker.person.fullName,
      email: faker.internet.email(),
      avatar: faker.internet.emoji(),
    });
  }

  User.insertMany(users)
    .then(function (data) {
      console.log('200 users generated successfully', data);
      mongoose.connection.close();
      /* ... */
    })
    .catch(function (err) {
      /* Error handling */
      console.error('Error inserting users:', err);
      mongoose.connection.close();
    });
});
