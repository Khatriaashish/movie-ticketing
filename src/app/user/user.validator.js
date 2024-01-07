const { z } = require('zod');

const createStaffSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    role: z.string().regex(/admin|kitchen|waiter/),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    confirmPassword: z.string().min(1), 
    status: z.string().regex(/active|inactive/)
}).refine((data)=>data.password===data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: "confirmPassword"
})

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    confirmNewPassword: z.string().min(1)
}).refine((data)=>data.newPassword===data.confirmNewPassword, {
    message: "New Password and confirm  new password doesn't match",
    path: "confirmNewPassword"
})

module.exports = { createStaffSchema, changePasswordSchema }