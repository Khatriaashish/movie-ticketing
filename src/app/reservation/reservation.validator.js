const { z } = require('zod');

const createReservationSchema = z.object({
    showtimeId: z.string().min(24), 
    phone: z.string().min(10).max(10),
    selected: z.string().min(2)
})

module.exports = { createReservationSchema }