import './NextEvent.css'
import { useEffect, useState } from 'react'

interface Venue {
  city: string
  country: string
  lat: number
  lon: number
  name: string
  address_1: string
}

interface Event {
  link: string
  status: string
  time: number
  venue: Venue
  yes_rsvp_count: number
}

export default function NextEvent() {
  const [response, setResponse] = useState<Event[] | false | null>(false)
  useEffect(() => {
    fetch(`${window.location.origin}/api/meetup`)
      .then(result => result.json()).then(json => setTimeout(() => setResponse(json), 2000))
  }, [])

  if (response === false) {
    return (
      <div className="inner-section next-event loading-container">
        <h2>Next event</h2>
        <div className="loading" role="progressbar" aria-busy="true" aria-live="polite">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-message">Loading from Meetup</div>
      </div>
    )
  }

  const nextEvent = response ? response.sort((a, b) => a.time - b.time).shift() : undefined

  if (!nextEvent) {
    return (
      <div className="inner-section">
        <h2>Next event</h2>
        <p>
          No event planned.
          Join the
          {' '}
          <a href="https://www.meetup.com/paderborn-js/" rel="noopener">Meetup</a>
          {' '}
          group or check back at a later date!
        </p>
      </div>
    )
  }

  const { link, time, venue, yes_rsvp_count: going } = nextEvent

  const todayDate = new Date()
  const eventDate = new Date(time)

  const isEventToday
    = todayDate.getMonth() === eventDate.getMonth()
    && todayDate.getDate() === eventDate.getDate()

  const eventHour = eventDate.getHours() > 12 ? eventDate.getHours() - 12 : eventDate.getHours()
  const eventMinutes = eventDate.getMinutes() > 0 ? `:${eventDate.getMinutes()}` : ''
  const eventTime = eventDate.getHours() > 11 ? `${eventHour}${eventMinutes}pm` : `${eventHour}${eventMinutes}am`

  return (
    <div className="inner-section next-event">
      <h2>
        Next event on
        {' '}
        <em>
          {isEventToday
            ? `Today ${eventTime}`
            : `${eventDate.toLocaleString('en-us', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })} - ${eventTime}`}
        </em>
      </h2>
      <div className="venue">
        <a
          href={`https://www.google.com/maps/dir//${venue.name},${venue.address_1},${
          venue.city
        }/@${venue.lat},${venue.lon},14z`}
          rel="noopener"
          title="Plan your route"
        >
          <svg className="map" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 887.59 776.14">
            <defs>
              <linearGradient id="a" x1="148.9" x2="148.9" y1="776.1" y2="47.1" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="gray" stopOpacity=".3" />
                <stop offset=".5" stopColor="gray" stopOpacity=".1" />
                <stop offset="1" stopColor="gray" stopOpacity=".1" />
              </linearGradient>
              <linearGradient id="c" x1="446.7" x2="446.7" y1="776.1" y2="47.1" href="#a" />
              <linearGradient id="d" x1="741.6" x2="741.6" y1="776.1" y2="47.1" href="#a" />
              <linearGradient id="b" x1="889.9" x2="889.9" y1="282.7" y2="61.9" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#b3b3b3" stopOpacity=".3" />
                <stop offset=".5" stopColor="#b3b3b3" stopOpacity=".1" />
                <stop offset="1" stopColor="#b3b3b3" stopOpacity=".1" />
              </linearGradient>
              <linearGradient id="e" x1="733.7" x2="733.7" y1="87.3" y2="44.5" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopOpacity=".1" />
                <stop offset=".6" stopOpacity=".1" />
                <stop offset="1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path fill="url(#a)" d="M297.8 748.2L0 776.1v-701l297.8-28v701.1z" />
            <path fill="url(#c)" d="M297.8 748.2l297.8 27.9v-701l-297.8-28v701.1z" />
            <path fill="url(#d)" d="M887.6 748.2l-292 27.9v-701l292-28v701.1z" />
            <path fill="hsl(199, 38%, 98%)" d="M298.9 728.7L9.5 755.6V82l289.4-26.9v673.6z" />
            <path fill="hsl(199, 40%, 100%)" d="M298.9 728.7l289.3 26.9V82L298.9 55.1v673.6z" />
            <path fill="hsl(199, 38%, 98%)" d="M877.6 728.7l-289.4 26.9V82l289.4-26.9v673.6z" />
            <path fill="hsl(219, 80%, 68%)" d="M298.9 116.9l-219.8 7.8v101.1h186.6v-36.5l33.2-1.2 50.6 15.6v-71.1l-50.6-15.7zM298.9 682.9L52.2 706.6v-90.2l246.7-23.7v90.2z" opacity=".3" />
            <path fill="hsl(219, 70%, 50%)" d="M432.6 613.3l107 9.4-1.4 82.4-107-9.4z" opacity=".3" />
            <path fill="hsl(219, 80%, 68%)" d="M841 688.6l-167 20.1-3.8-109 167-20.2 3.8 109z" opacity=".3" />
            <g fill="none" stroke="hsl(54, 100%, 22%)" strokeMiterlimit="10" strokeWidth="11" opacity=".4" className="path">
              <path d="M175.5 649.6l4.7-3.7" />
              <path strokeDasharray="11.3 11.3" d="M188.9 638.7l100.9-82.3" />
              <path d="M294.2 552.8l4.7-3.8 5.8 1.3" />
              <path strokeDasharray="12.4 12.4" d="M316.9 552.9l115.5 24.6" />
              <path d="M438.5 578.8l5.8 1.3 1.7-5.8" />
              <path strokeDasharray="12.2 12.2" d="M449.4 562.6l113.3-391.5" />
              <path d="M564.4 165.2l1.7-5.8 5.5 2.5" />
              <path strokeDasharray="11.6 11.6" d="M582.2 166.6L704 221" />
              <path d="M709.3 223.4l5.5 2.4" />
            </g>
            <g transform="translate(0 110)">
              <path fill="url(#b)" d="M958.3 132.8c0 39-68.4 149.9-68.4 149.9s-68.4-110.8-68.4-150S852.1 62 890 62s68.4 31.7 68.4 70.9z" transform="translate(-156.2 -62)" />
              <ellipse cx="733.7" cy="65.9" fill="url(#e)" rx="20.7" ry="21.4" />
              <path fill="hsl(219, 80%, 68%)" d="M797 71c0 35-63.3 133.9-63.3 133.9s-63.3-99-63.3-134A63.3 63.3 0 1 1 797 71z" />
              <circle cx="733.7" cy="66.5" r="19.1" fill="#fff" />
            </g>
          </svg>
        </a>
        <div className="flex">
          <b>Location</b>
          <div>{venue.name}</div>
          <div>{venue.address_1}</div>
          {venue.city !== 'Paderborn' && <div>{venue.city}</div>}
          <a className="cta" href={link}>
            <div className="signup">Sign up</div>
            <div className="going">
              {going}
              {' '}
              people going
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
