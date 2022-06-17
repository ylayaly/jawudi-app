import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container flex flex-col mx-auto justify-center items-center p-24'>
      <h1 className='text-pink-600 font-bold text-4xl text-center'>Jawudi App</h1>
      <Link href="/home">
            <a className='mt-10 underline cursor-pointer'>Go to Home</a>
      </Link>
    </div>
  )
}
