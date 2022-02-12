const express = require("express");
const router = express.Router();
const articleController = require("../controllers").article;

router.get("/", articleController.getAll);
router.get("/:id", articleController.getArticle);
router.post("/", articleController.addArticle);
router.patch("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
