import app from './app'
import settings from '@settings/app.settings'

app.listen(settings.PORT || 3000, () => console.log(`Application running on port ${settings.PORT || 3000}`))
