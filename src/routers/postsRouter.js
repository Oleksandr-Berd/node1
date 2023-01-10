const express = require("express");
const router = express.Router();
const {
  addPostValidation,
  patchPostValidation,
} = require("../middlewares/validationMiddleware");

const {
  getPost,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPost);

router.get("/:id", getPostById);

router.post("/", addPostValidation, addPost);

router.put("/:id", addPostValidation, changePost);

router.patch("/:id", patchPostValidation, patchPost);

router.delete("/:id", deletePost);

module.exports = { postsRouter: router };
