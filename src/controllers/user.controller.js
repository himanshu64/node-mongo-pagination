const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const pick = require('../utils/pick');

const getUsers = catchAsync(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const filter = pick(req.query, ['name', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

module.exports = {
  getUsers,
};
