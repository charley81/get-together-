import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import EventMap from '../../components/event-map'
import { API_URL } from '@/config/index'
import styles from '@/styles/event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EventPage({ evt }) {
  const router = useRouter()

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.title}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
              alt="event image"
            />
          </div>
        )}
        <h3>Family:</h3>
        <p>The {evt.familyName} family</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Address:</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href="/events">
          <a>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map(evt => ({
    params: {
      slug: evt.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
