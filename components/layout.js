import Head from 'next/head'
import styles from '../styles/layout.module.css'
import Header from './header'
import Footer from './footer'

export default function Layout({ title, keywords, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: 'getTogether | Stay updated on your neighborhood events',
  description: 'Your local neighborhood event directory',
  keywords: 'neighborhood events, block party, neighborhood get togethers ',
}
