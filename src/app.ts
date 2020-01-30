import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from '@routes/index'
import applicationInsights from '@logging/appinsights.setup'
import { database } from '@database/database.setup'

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
}

const app = express()
applicationInsights.configure()
database.configure()
app.use(cors(options))
app.use(helmet())
app.use(express.json())
app.use(routes)

export default app
