const express = require("express");
const router = express.Router();
const referenceRouter = require("./reference");
const dbRouter = require("./db");
const articleRouter = require("./article");

router.use("/reference", referenceRouter);
router.use("/article", articleRouter);
router.use("/", dbRouter);

module.exports = router;
