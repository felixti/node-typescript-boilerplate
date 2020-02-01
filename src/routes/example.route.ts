import { Router } from 'express'
import { controller } from '@controllers/example.controller'

const router = Router()

router.get('/api/examples', controller.readAll)
router.get('/api/examples/:id', controller.readOne)
router.post('/api/examples', controller.createOne)
router.patch('/api/examples/:id', controller.updateOne)

export default router
