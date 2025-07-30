const CHARSET = 'utf8';
const COLLATE = 'utf8_general_ci';

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
	throw new Error(
		`❌ Missing required database environment variables: ${missing.join(', ')}`
	);
}

// Проверка допустимого диалекта
const allowedDialects = ['mysql', 'postgres'];
const dialect = process.env.DB_DIALECT ?? 'mysql';
if (!allowedDialects.includes(dialect)) {
	throw new Error(`❌ Invalid DB_DIALECT: "${dialect}". Allowed: ${allowedDialects.join(', ')}`);
}

module.exports = {
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ?? '3306',
	dialect: dialect,

	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},

	charset: CHARSET,
	collate: COLLATE,
	timestamps: true,
	logging: false
};
