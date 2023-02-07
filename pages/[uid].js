import React, { useEffect } from 'react'
import { createClient, linkResolver } from '../prismicio'
import * as prismicH from '@prismicio/helpers';
import PageComponent from '../components/page'
import { useAppContext } from '../context/appContext';

export default function Homepage({ page, navigationHeader, navigationFooter, settings, countries, goals, legalPages }) {
  const { addCountries, addLegalPages } = useAppContext();
    useEffect(() => {
        addCountries(countries);
        addLegalPages(legalPages);
    }, [countries, addCountries, legalPages, addLegalPages])

  if(!page || (page && !page.data) ){
    return <></>
  }
  
  return <PageComponent page={page} navigationHeader={navigationHeader} navigationFooter={navigationFooter} settings={settings} />
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
  const page = await client.getByUID('page', params.uid, {
    fetchLinks: 'goal-fund.id, goal-fund.title, goal-fund.image, goal-fund.description, goal-fund.detail, goal-fund.link, goal-fund.items, post.title, post.subtitle, post.shortDescription, post.publicationDate, post.postImage',
  })

  const navigationHeader = await client.getSingle('HeaderNavigation')
  const navigationFooter = await client.getAllByType('FooterNavigation')
  const settings = await client.getSingle('Settings')
  const fees = {"INTERNATIONAL" : {}, "LOCAL" : {}}
  const legalPages = await client.getAllByType('legalPage')

  if(params.uid === "fees" || params.uid === "fees--draft"){
    fees.INTERNATIONAL  = await client.getSingle('internationalFee')
    fees.LOCAL  = await client.getSingle('localTransfer')
    page.fees = fees
  }
  let hasFundGrid = page.data.slices.filter(s => s.slice_type === 'fund_grid').length
  
  if(hasFundGrid > 0){
    const goals = await client.getAllByType('goal-fund')
    page.goals = goals
  }
  const countries = await client.getSingle('Countries')
  
  return {
    props: { page, navigationHeader, navigationFooter, settings, countries, legalPages },
  }
}