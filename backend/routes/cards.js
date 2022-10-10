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
  validateUniqueId,
} = require('../middleware/validations');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:id', validateUniqueId, deleteCard);
router.put('/:id/likes', validateUniqueId, likeCard);
router.delete('/:id/likes', validateUniqueId, dislikeCard);

module.exports = router;
