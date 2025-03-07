const { insertSignup, removeSignup } = require("../models/signupsModels");

const signupUser = (req, res, next) => {
  insertSignup(req.body)
    .then((signup) => res.status(201).send({ signup }))
    .catch(next);
};

const deleteSignup = (req, res, next) => {
  removeSignup(req.params.signup_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = { signupUser, deleteSignup };
