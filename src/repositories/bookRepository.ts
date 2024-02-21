import { Book } from '../models'

interface ICreateBook {
	name: string
	author: string
	company: string
	read: boolean
	dateRead: Date | null
	description: string
	rate: number
	user_id: string
}
interface IBookPaginate {
	user_id: string
	page: number
	size: number
}
interface IUpdate {
	rate: number
	dateRead: Date
	read: boolean
	id: string
}
class BookRepository {
	async create({
		name,
		author,
		company,
		read,
		dateRead,
		description,
		rate,
		user_id,
	}: ICreateBook) {
		const result = await Book.create({
			name,
			author,
			company,
			read,
			dateRead,
			description,
			rate,
			user_id,
		})
		return result
	}
	async findByUserId(user_id: string) {
		const result = await Book.find({ user_id })
		return result
	}
	async findPaginateByUserId({ user_id, page, size }: IBookPaginate) {
		const result = Book.find({ user_id })
			.skip((page - 1) * size)
			.limit(size)
			.exec()
		return result
	}
	findById(id: string, user_id: string) {
		return Book.find({ _id: id, user_id }).exec()
	}
	async delete(id: string) {
		const result = await Book.findByIdAndRemove(id)
		return result
	}
	update({ rate, dateRead, read, id }: IUpdate) {
		Book.findById(id).updateMany({ rate, dateRead, read }).exec()
	}
}

export { BookRepository }
