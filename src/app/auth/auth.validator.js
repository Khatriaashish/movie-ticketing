const {z} = require('zod');

registerSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    role: z.string().regex(/admin|boxoffice|customer/).default('customer')
})

module.exports = {registerSchema}