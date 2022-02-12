const express = require("express");
const router = express.Router();
const referenceController = require("../controllers").reference;

router.get("/", referenceController.getAll);
router.get(
	"/byArticle/:articleId/:offset/",
	referenceController.getReferenceByAuthor
);
router.get("/:id/", referenceController.getReference);
router.post("/", referenceController.addReference);
router.patch("/:id/", referenceController.updateReference);
router.delete("/:id/", referenceController.deleteReference);

module.exports = router;
