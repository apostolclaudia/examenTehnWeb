const db = require("../config/db");
const sequelize = require("sequelize");

const Reference = db.define("reference", {
	title: {
		type: sequelize.STRING,
		validate: {
			len: [5, 200],
		},
		allownull: false,
	},
	authors: {
		type: sequelize.STRING,
		allownull: false,
	},
	date: {
		type: sequelize.DATEONLY,
		allownull: false,
	},
});
module.exports = Reference;
