import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
})
const User = mongoose.model('User', userSchema)

const bookSchema = new mongoose.Schema({
	name: String,
	author: String,
	company: String,
	read: Boolean,
	dateRead: Date,
	description: String,
	rate: Number,
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
})
const Book = mongoose.model('Book', bookSchema)

export { User, Book }
