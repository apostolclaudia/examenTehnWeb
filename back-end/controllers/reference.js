const referenceList = require("../models").Reference;

const controller = {
	getAll: async (req, res) => {
		try {
			const references = await referenceList.findAll();
			return res.status(200).json({ references });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	getReference: async (req, res) => {
		try {
			const id = parseInt(req.params.id);
			const reference = await referenceList.findByPk(id);
			if (!reference) {
				return res.sendStatus(404);
			}
			return res.status(200).json(reference);
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	getReferenceByAuthor: async (req, res) => {
		try {
			const articleId = parseInt(req.params.articleId);
			const offset = parseInt(req.params.offset);
			const reference = await referenceList.findAndCountAll({
				where: {
					articleId: articleId,
				},
				limit: 1,
				offset,
			});
			if (!reference) {
				return res.sendStatus(404);
			}
			return res.status(200).json(reference);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	},
	addReference: async (req, res) => {
		try {
			const { title, authors, articleId, date } = req.body;
			if (!title || !authors || !articleId || !date) {
				return res.sendStatus(400);
			}
			console.log(title, authors, articleId);
			let reference = await referenceList.create({
				title,
				authors,
				articleId,
				date,
			});
			console.log(reference);
			return res
				.status(201)
				.json({ message: "reference created!", reference });
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	},
	updateReference: async (req, res) => {
		try {
			const { title, authors, articleId, date } = req.body;
			const id = parseInt(req.params.id);
			let reference = await referenceList.findByPk(id);
			if (!reference) {
				return res.sendStatus(404);
			}
			reference.title = title;
			console.log(date);
			reference.authors = authors;
			reference.articleId = articleId;
			reference.date = date;
			await reference.save();
			return res
				.status(200)
				.json({ message: "Data updated succesfully!", reference });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
	deleteReference: async (req, res) => {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				return res.sendStatus(400);
			}
			const reference = await referenceList.findByPk(id);
			if (!reference) {
				return res.sendStatus(404);
			}
			await reference.destroy();
			res.statusCode = 200;
			return res.json({ message: "reference deleted!" });
		} catch (error) {
			return res.sendStatus(500);
		}
	},
};
module.exports = controller;
