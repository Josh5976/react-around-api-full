const Card = require('../models/card');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message)}`))
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => new NotFoundError('Card ID not found'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError("You cannot delete someone else's card"));
      } else {
        Card.deleteOne(card).then(() => res.send({ data: card }));
      }
    });
};

const likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      err.name === 'DocumentNotFoundError'
        ? next(new NotFoundError('Could not find requested card'))
        : next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      err.name === 'DocumentNotFoundError'
        ? next(new NotFoundError('Could not find requested card'))
        : next(err);
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
