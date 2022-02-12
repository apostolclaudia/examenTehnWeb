const db = require("../config/db");
const sequelize = require("sequelize");
const References = require("./Reference");

const Article = db.define("article", {
	title: {
		type: sequelize.STRING,
		allownull: false,
		validate: {
			len: [5, 100],
		},
	},
	summary: {
		type: sequelize.STRING,
		allownull: false,
		validate: {
			len: [10, 200],
		},
	},
});

Article.hasMany(References);
References.belongsTo(Article);

module.exports = Article;
