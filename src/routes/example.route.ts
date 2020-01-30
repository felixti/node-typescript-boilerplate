import { Router } from 'express'
import { controller } from '@controllers/example.controller'

const router = Router()

router.get('/api/example', controller.readAll)
router.get('/api/example/:id', controller.readOne)
router.post('/api/example', controller.createOne)
router.patch('/api/example/:id', controller.updateOne)

export default router
