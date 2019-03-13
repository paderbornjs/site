import { useEffect, useState } from 'react'

const cache: { [url: string]: Promise<Event> } = {}

const useImageLoadingState = (urls: string[]) => {
  const [loading, setLoading] = useState(urls.length > 0)

  useEffect(() => {
    setLoading(urls.length > 0)
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

export default useImageLoadingState
