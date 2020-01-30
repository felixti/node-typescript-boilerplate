import mongoose from 'mongoose'
import settings from '@settings/azure.settings'

export const database = ({
  configure
})

async function configure () {
  await mongoose.connect(settings.cosmosDbConnectionString, {
    useNewUrlParser: true,
    autoReconnect: true,
    keepAlive: true,
    useFindAndModify: true
  })
    .catch(console.error)
}
