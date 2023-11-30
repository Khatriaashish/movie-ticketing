const { z } = require('zod');

const movieSchema = z.object({
    title: z.string().min(1).trim().toLowerCase(),
    language: z.string().min(1).trim().toLowerCase(),
    genre: z.string().min(1).trim().toLowerCase(),
    director: z.string().min(1).trim().toLowerCase(),
    cast: z.string().min(1).trim().toLowerCase(),
    description: z.string().min(1).trim().toLowerCase(),
    // duration: z.number().min(1),
    // releaseDate: z.date(),
    status: z.string().regex(/active|inactive/).default('inactive')
})

module.exports = {movieSchema}