const Reference = require("./Reference");
const ArticleList = require("./Article");

ArticleList.hasMany(Reference);
Reference.belongsTo(ArticleList);

module.exports = {
	Reference: Reference,
	ArticleList: ArticleList,
};
