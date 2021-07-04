import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/event-item.module.css'

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image : '/images/event-default.jpg'}
          width={170}
          height={100}
          alt="event-image"
        />
      </div>

      <div className={styles.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.title}</h3>
      </div>

      <div>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  )
}
