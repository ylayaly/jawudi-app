import React, { useEffect } from 'react'
import { createClient } from '../prismicio'
import PageComponent from '../components/page';
import { useAppContext } from '../context/appContext';

export default function Homepage({ page, navigationHeader, navigationFooter, settings, legalPages }) {
  const { addLegalPages } = useAppContext();
  useEffect(() => {
      addLegalPages(legalPages);
  }, [legalPages, addLegalPages])

  if(!page || (page && !page.data) ){
    return <></>
  }
  
  return <PageComponent page={page} navigationHeader={navigationHeader} navigationFooter={navigationFooter} settings={settings} />
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID('page', 'home')
  const navigationHeader = await client.getSingle('HeaderNavigation')
  const navigationFooter = await client.getAllByType('FooterNavigation')
  const settings = await client.getSingle('Settings')
  const legalPages = await client.getAllByType('legalPage')

  return {
    props: { page, navigationHeader, navigationFooter, settings, legalPages },
  }
}