import { auth, metadata } from 'concava-adapter-mysql'
import { storage } from 'concava-adapter-mqtt'

var config = {
	host: 'mariadb',
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	timeout: 3000, // ms
}

export default {
	debug: true,
	port: 3000,
	payloadMaxSize: '512kb',
	auth: {
		enabled: true,
		header: 'Authorization',
		byToken: true,
		method: auth,
		config,
	},
	metadata: {
		method: metadata,
		config,
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
