import { useState } from 'react'

const useImageLoader = (urls: string[]) => {
  const [loading, setLoading] = useState(true)

  if (urls.length > 0) {
    Promise.all<Event>(
      urls.map(
        url =>
          new Promise(resolve => {
            const img = new Image()
            img.onload = resolve
            img.src = url
          })
      )
    ).then(() => setLoading(false))
  }

  return loading
}

export default useImageLoader
