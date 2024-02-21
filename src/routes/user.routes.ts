import { Router } from 'express'
import { UserController } from '../controllers/UserController'

class UserRoutes {
	private router: Router
	private userController: UserController
	constructor() {
		this.router = Router()
		this.userController = new UserController()
	}
	getRoutes() {
		/**
		 * @swagger
		 * /users:
		 *   post:
		 *     summary: Create a new user.
		 *     description: Create User
		 *     consumes:
		 *       - application/json
		 *     parameters:
		 *       - in: body
		 *         name: name
		 *         description: The user's name.
		 *         schema:
		 *           type: string
		 *           required:
		 *             - name
		 *       - in: body
		 *         name: email
		 *         description: The user's email.
		 *         schema:
		 *           type: string
		 *           required:
		 *             - email
		 *       - in: body
		 *         name: password
		 *         description: The user's password.
		 *         schema:
		 *           type: string
		 *           required:
		 *             - password
		 *     requestBody:
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               name:
		 *                 type: string
		 *               email:
		 *                 type: string
		 *               password:
		 *                 type: string
		 *             example:
		 *               name: Raiden Shogun
		 *               email: raiden@shogun.com
		 *               password: '10/10'
		 *     responses:
		 *       201:
		 *         description: Created
		 *       400:
		 *         description: Bad Request
		 *       401:
		 *         description: Unauthorized
		 */

		this.router.post('/', this.userController.store.bind(this.userController))
		this.router.get('/', this.userController.index.bind(this.userController))
		this.router.get('/:id', this.userController.show.bind(this.userController))
		this.router.put(
			'/:id',
			this.userController.update.bind(this.userController)
		)
		this.router.delete(
			'/:id',
			this.userController.delete.bind(this.userController)
		)
		return this.router
	}
}

export { UserRoutes }
