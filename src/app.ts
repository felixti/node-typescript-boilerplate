import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import graphql from '@graphql/apollo-server.setup'
import applicationInsights from '@logging/appinsights.setup'
import database from '@database/database.setup'
import routes from '@routes/index'

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
}

applicationInsights.configure()
database.configure()

const app = express()
app.use(cors(options))
app.use(helmet())
app.use(bodyParser.json())
app.use(routes)

graphql.configure(app)

export default app
