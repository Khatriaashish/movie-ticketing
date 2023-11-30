const { z } = require('zod');

bannerSchema = z.object({
    title: z.string().min(2),
    url: z.string().url(),
    status: z.string().regex(/active|inactive/).default('inactive')
})

module.exports = {bannerSchema}