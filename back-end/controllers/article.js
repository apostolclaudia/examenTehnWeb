const ArticleList = require("../models/Article");

const controller = {
	getAll: async (req, res) => {
		try {
			const article = await ArticleList.findAll();
			return res.status(200).json({ article });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	getArticle: async (req, res) => {
		try {
			const id = parseInt(req.params.id);
			const article = await ArticleList.findByPk(id);
			if (!article) {
				return res.sendStatus(404);
			}
			return res.status(200).json(article);
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	addArticle: async (req, res) => {
		try {
			const { title, summary } = req.body;
			if (!title || !summary) {
				return res.sendStatus(400);
			}
			const article = await ArticleList.create({
				title,
				summary,
			});

			return res
				.status(201)
				.json({ message: "Articles created!", article });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	updateArticle: async (req, res) => {
		try {
			const { title, summary } = req.body;
			const id = parseInt(req.params.id);
			let article = await ArticleList.findByPk(id);
			if (!article || !summary) {
				return res.sendStatus(404);
			}
			article.title = title;
			article.summary = summary;
			await article.save();

			return res
				.status(200)
				.json({ message: "Data updated succesfully!", article });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	deleteArticle: async (req, res) => {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				return res.sendStatus(400);
			}
			const article = await ArticleList.findByPk(id);
			if (!article) {
				return res.sendStatus(404);
			}
			await article.destroy();
			res.statusCode = 200;
			return res.json({ message: "Account deleted!" });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
};

module.exports = controller;
