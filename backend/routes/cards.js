const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCardBody,
  validateObjId,
} = require('../middleware/validations');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:id', validateObjId, deleteCard);
router.put('/:id/likes', validateObjId, likeCard);
router.delete('/:id/likes', validateObjId, dislikeCard);

module.exports = router;
