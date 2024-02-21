import { Router } from 'express'
import { AuthMiddlewere } from '../middlewares/AuthMiddleware'
import { BookController } from '../controllers/BookController'

class BookRoutes {
	private router: Router
	private authMiddlewere: AuthMiddlewere
	private bookController: BookController
	constructor() {
		this.router = Router()
		this.authMiddlewere = new AuthMiddlewere()
		this.bookController = new BookController()
	}
	getRoutes(): Router {
		this.router.post(
			'/',
			this.authMiddlewere.auth.bind(this.authMiddlewere),
			this.bookController.store.bind(this.bookController)
		)
		this.router.get(
			'/',
			this.authMiddlewere.auth.bind(this.authMiddlewere),
			this.bookController.index.bind(this.bookController)
		)
		this.router.delete(
			'/:id',
			this.authMiddlewere.auth.bind(this.authMiddlewere),
			this.bookController.delete.bind(this.bookController)
		)
		this.router.put(
			'/:id',
			this.authMiddlewere.auth.bind(this.authMiddlewere),
			this.bookController.update.bind(this.bookController)
		)
		return this.router
	}
}

export { BookRoutes }
