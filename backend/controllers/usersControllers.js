const { fetchAllUsers, fetchUserById, insertUser } = require("../models/usersModels");

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  fetchUserById(req.params.user_id)
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  insertUser(req.body)
    .then((user) => res.status(201).send({ user }))
    .catch(next);
};

module.exports = { getAllUsers, getUserById, createUser };
