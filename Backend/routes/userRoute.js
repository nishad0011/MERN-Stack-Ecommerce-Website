const express = require('express');
const router = express.Router();

const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../middleware/authentication');

const { registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateUserData,
    getSingleUser,
    getAllUsers,
    updateUserRole,
    deleteUser
} = require('../controllers/userController');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateUserData);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/users/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router;