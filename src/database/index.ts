import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

class DbConnection {
	async connect() {
		try {
			await mongoose.connect(process.env.MONGO_DB_HOST)
			console.log('Connected to database')
		} catch (error) {
			console.log('Error to connect database')
		}
	}
}

export { DbConnection }
