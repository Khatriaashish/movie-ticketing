const {z} = require('zod');

registerSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    role: z.string().regex(/admin|boxoffice|customer/).default('customer')
})

passwordSchema = z.object({
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    confirmPassword: z.string()
}).refine((data)=>data.password===data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: 'confirmPassword'
})

loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

emailSchema = z.object({
    email: z.string().email().min(1)
})

module.exports = {registerSchema, passwordSchema, loginSchema, emailSchema}