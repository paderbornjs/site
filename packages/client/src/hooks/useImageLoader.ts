import { useEffect, useState } from 'react'

const cache: { [url: string]: Promise<Event> } = {}

const useImageLoader = (urls: string[]) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (urls.length > 0) {
      Promise.all<Event>(
        urls.map(url => {
          if (!cache[url]) {
            cache[url] = new Promise(resolve => {
              const img = new Image()
              img.onload = resolve
              img.src = url
            })
          }
          return cache[url]
        })
      ).then(() => setLoading(false))
    }
  }, [urls])

  return loading
}

export default useImageLoader
