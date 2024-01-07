const { z } = require('zod');

const createShowtimeSchema = z.object({
    showtime: z.string().min(1),
    startDate: z.string().min(1),
    movieId: z.string().min(24),
    theatreId: z.string().min(24),
    status: z.string().regex(/active|inactive/)
})

module.exports = { createShowtimeSchema }