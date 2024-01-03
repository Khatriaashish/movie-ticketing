const { z } = require('zod');

const createMovieSchema = z.object({
    title: z.string().min(1),
    language: z.string().min(1),
    genre: z.string().min(1),
    director: z.string().min(1),
    cast: z.string().min(1),
    description: z.string().min(1),
    duration: z.string().regex(/^\d+$/),
    // releaseDate: z.date(),
    status: z.string().regex(/active|inactive/)
})

module.exports = { createMovieSchema }