import mongoose from 'mongoose'
import settings from '@settings/azure.settings'

export default ({
  configure
})

async function configure () {
  const mongoUrl = settings.cosmosDbConnectionString ?? 'mongodb://localhost:27017'

  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    autoReconnect: true,
    keepAlive: true,
    useFindAndModify: true
  })
    .catch(console.error)
}
