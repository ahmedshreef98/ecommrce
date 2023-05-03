const { signUp, signIn } = require("./user.auth");
const { createUser, getUsers, getUser, updateUser, deleteUser, changePassword, ProtectRoutes } = require("./user.service");

const router = require("express").Router();

router.route("/")
    .post(createUser)
    .get(getUsers);


router.route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.post('/signup', signUp)
router.post('/signin', signIn)

router.patch('/changePassword/:id', changePassword)

module.exports = router;
