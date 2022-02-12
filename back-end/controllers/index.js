const referenceController = require("./reference");
const articleController = require("./article");
const dbController = require("./db");

const controllers = {
	reference: referenceController,
	db: dbController,
	article: articleController,
};

module.exports = controllers;
