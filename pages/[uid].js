import { createClient, linkResolver } from '../prismicio'
import * as prismicH from '@prismicio/helpers';
import Link from 'next/link';

export default function Homepage({ page }) {
  if(!page || (page && !page.data) ){
    return <> No data </>
  }
  
  const { title } = page.data

  return <div className='container flex flex-col mx-auto justify-center items-center p-24'>
    <h1 className='text-xl font-bold text-blue-600'>{title[0].text}</h1>
    <br/>
    <Link href="/" >
            <a className='mt-10'>Go to Index</a>
    </Link>
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