import api from './api'

const port = 4000
api.listen({ port }, () =>
  console.log(`🚀  Server ready at http://localhost:${port}`)
)
