const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser
} = require('../controllers/users');

const {
  validateProfile,
  validateObjId,
  validateAvatar,
  validateUserBody
} = require('../middleware/validations');

router.get('/me', validateUserBody, getCurrentUser);
router.get('/', getUsers);
router.get('/:id', validateObjId, getUser);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);
router.patch('/me', validateProfile, updateUserInfo);

module.exports = router;
