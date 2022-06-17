import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container flex flex-col mx-auto justify-center items-center p-24'>
      <h1 className='text-blue-600 font-bold text-xl text-center'>Helow world</h1>
      <Link href="/home">
            <a className='mt-10'>Go to Home</a>
      </Link>
    </div>
  )
}
