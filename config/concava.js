const adapter = require('concava-adapter-mysql')
const storage = require('concava-adapter-mqtt').storage

var config = {
	host: 'mariadb',
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	timeout: 3000, // ms
}

module.exports = {
	debug: true,
	// logFile: '/tmp/output.log',
	// logName: 'concava',
	// port: 3000,
	payloadMaxSize: '512kb',
	auth: {
		enabled: true,
		header: 'Authorization',
		byToken: true,
		method: adapter.auth,
		config: config,
	},
	metadata: {
		method: adapter.metadata,
		config: config,
	},
	storage: {
		method: storage,
		config: {
			port: 1883,
			backend: {
				type: 'mongo',
				url: 'mongodb://mongodb:27017/mqtt',
				pubsubCollection: 'concava',
				mongo: {},
			},
		},
	},
}
