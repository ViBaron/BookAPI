import { NextFunction, Request, Response } from 'express'
import { BookRepository } from '../repositories/bookRepository'

class BookController {
	private bookRepository: BookRepository
	constructor() {
		this.bookRepository = new BookRepository()
	}
	async store(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, description, rate } =
			request.body
		const { user_id } = request
		try {
			const readVerify = read ? true : false
			const dateReadVerify = dateRead ? new Date(dateRead) : null
			const findBooksByUserId = await this.bookRepository.findByUserId(user_id)
			const filterBooks = findBooksByUserId.find((filter) => {
				return (
					filter.name &&
					StringFormatter.formatString(filter.name) ===
						StringFormatter.formatString(name)
				)
			})
			if (filterBooks) {
				throw new Error('Book alread exists.')
			}
			if (readVerify === false && rate) {
				throw new Error('You can grade only books that have been read.')
			}
			const result = await this.bookRepository.create({
				name,
				author,
				company,
				read: readVerify,
				dateRead: dateReadVerify,
				description,
				rate,
				user_id,
			})
			return response.status(201).json(result)
		} catch (error) {
			next(error)
		}
	}
	async index(request: Request, response: Response, next: NextFunction) {
		const { user_id } = request
		const { page, size } = request.query
		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 10
		try {
			const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE
			const sizeNumber = size ? parseInt(size as string, 10) : DEFAULT_SIZE
			const findBooksByUserId = await this.bookRepository.findPaginateByUserId({
				user_id,
				page: pageNumber,
				size: sizeNumber,
			})
			return response.json(findBooksByUserId)
		} catch (error) {
			next(error)
		}
	}
	async delete(request: Request, response: Response, next: NextFunction) {
		const { user_id } = request
		const { id } = request.params
		try {
			const findById = await this.bookRepository.findById(id, user_id)
			if (findById.length <= 0) {
				throw new Error('Book not found!')
			}
			const result = await this.bookRepository.delete(id)
			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
	async update(request: Request, response: Response, next: NextFunction) {
		const { rate } = request.body
		const { id } = request.params
		const { user_id } = request
		try {
			const findById = await this.bookRepository.findById(id, user_id)
			if (findById.length <= 0) {
				throw new Error('Book not found!')
			}
			if (!rate) {
				throw new Error('Rate not found!')
			}
			if (rate < 0 || rate > 5) {
				throw new Error('Only rate between 0 and 5.')
			}
			this.bookRepository.update({
				rate,
				dateRead: new Date(),
				read: true,
				id,
			})
			return response.json({ Message: 'Updated successfully' })
		} catch (error) {
			next(error)
		}
	}
}

class StringFormatter {
	static formatString(str: string) {
		str = str.toLowerCase()
		str = str.trim()
		str = str.normalize('NFD')
		return str
	}
}

export { BookController }
