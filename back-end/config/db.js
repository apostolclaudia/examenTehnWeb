const Sequelize = require("sequelize");

// const db = new Sequelize("examenApostol", "root", "", {
// 	dialect: "mysql",
// 	host: "localhost",
// 	define: {
// 		timestamps: true,
// 	},
// 	port: 3307,
// });

const db = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	protocol: "postgres",
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	define: {
		timestamps: true,
	},
});

module.exports = db;
