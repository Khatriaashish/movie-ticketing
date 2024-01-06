const { z } = require('zod');

const createTheatreSchema = z.object({
    name: z.string().min(1),
    ticketPrice: z.string().regex(/^\d+$/).min(1),
    city: z.string().min(1),
    status: z.string().regex(/active|inactive/)
})

module.exports = { createTheatreSchema }