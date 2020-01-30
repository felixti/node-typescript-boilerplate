import config from '@settings/azure.settings'
import { setup, defaultClient } from 'applicationinsights'

export default {
  configure: () => {
    const appInsightsConfig = setup(config.applicationInsightsApiKey)
    defaultClient.context.tags[defaultClient.context.keys.cloudRole] = config.cloudRoleName
    appInsightsConfig.setSendLiveMetrics(true)
    appInsightsConfig.setAutoCollectDependencies(true)
    appInsightsConfig.setAutoCollectExceptions(true)
    appInsightsConfig.setAutoCollectRequests(true)
    appInsightsConfig.setAutoDependencyCorrelation(true)
    appInsightsConfig.setAutoCollectConsole(true, true)
    appInsightsConfig.setAutoCollectPerformance(true, true)
    appInsightsConfig.start()
  }
}
