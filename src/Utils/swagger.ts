import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
	definition: {
		info: {
			title: 'Book API',
			version: '1.0.0',
			contact: {
				name: 'Victor Baron',
			},
		},
	},
	apis: ['**/*.ts'],
}

export const SwaggerSpec = swaggerJsdoc(options)
