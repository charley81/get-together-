import Link from 'next/link'
import styles from '@/styles/footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; getTogether {new Date().getFullYear()} </p>
      <p>
        <Link href="/about">
          <a>About This Project</a>
        </Link>
      </p>
    </footer>
  )
}
