import 'source-map-support/register'
import api from './api'

const port = process.env.PORT

api.listen({ port }, () =>
  console.log(`🚀  Server ready at http://localhost:${port}`)
)
