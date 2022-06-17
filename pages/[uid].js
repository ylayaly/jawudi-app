import { createClient, linkResolver } from '../prismicio'
import * as prismicH from '@prismicio/helpers';
import Link from 'next/link';

export default function Homepage({ page }) {
  if(!page || (page && !page.data) ){
    return <> No data </>
  }
  
  const { title } = page.data

  return <div className='container flex flex-col mx-auto justify-center items-center p-24'>
    <div className='text-center'>
      <h1 className='text-4xl font-bold text-blue-600'>{title[0].text}</h1>
      <p className='text-base text-gray-400 mt-4'>Welcome to {title[0].text}</p>
      <br/>
      <Link href="/" >
              <a className='mt-10 underline cursor-pointer'>Go to Index</a>
      </Link>
    </div>
  </div>
}

export async function getStaticPaths() {
    const client = createClient()
    const documents = await client.getAllByType('page')
    return {
      paths: documents.map((doc) => prismicH.asLink(doc, linkResolver)),
      fallback: true,
    }
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID('page', params.uid)

  return {
    props: { page },
  }
}