import Layout from '@/components/layout'
import EventItem from '@/components/event-item'
import { API_URL } from '@/config/index'

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events To Show</h3>}

      {events.map(evt => {
        return <EventItem key={evt.id} evt={evt} />
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}
