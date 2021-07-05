import Layout from '@/components/layout'
import EventItem from '@/components/event-item'
import { API_URL } from '@/config/index'
import { useRouter } from 'next/router'
import qs from 'qs'
import Link from 'next/link'

export default function SearchPage({ events }) {
  const router = useRouter()

  return (
    <Layout title="Search Results">
      <Link href="/events">
        <a>Go Back</a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events To Show</h3>}

      {events.map(evt => {
        return <EventItem key={evt.id} evt={evt} />
      })}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { title_contains: term },
        { familyName_contains: term },
        { description_contains: term },
        { address_contains: term },
      ],
    },
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: { events },
  }
}
