import { parseCookies } from '@/helpers/index'
import Layout from '@/components/layout'
import DashboardEvent from '@/components/dashboard-event'
import { API_URL } from '@/config/index'
import styles from '@/styles/dashboard.module.css'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

export default function DashboardPage({ events, token }) {
  const router = useRouter()

  const deleteEvent = async id => {
    if (confirm('Are You Sure')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.reload('/events')
      }
    }
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <ToastContainer />
        <h3>My Events</h3>

        {events.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: {
      events,
      token,
    },
  }
}
