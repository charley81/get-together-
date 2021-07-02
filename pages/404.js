import Layout from '@/components/layout'
import styles from '@/styles/404.module.css'
import Link from 'next/link'
import { FaExclamationCircle } from 'react-icons/fa'

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationCircle />
          404
        </h1>
        <h4>You Must Be Lost</h4>
        <Link href="/">
          <a>Back Home</a>
        </Link>
      </div>
    </Layout>
  )
}
