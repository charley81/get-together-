import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddEventPage() {
  const [values, setValues] = useState({
    title: '',
    familyName: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()

    // validation
    const hasEmptyFields = Object.values(values).some(element => element === '')

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>Go Back</a>
      </Link>
      <h1>Add Event</h1>
      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="familyName">Family Name</label>
            <input
              type="text"
              id="familyName"
              name="familyName"
              value={values.familyName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  )
}
