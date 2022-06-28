import { createClient } from '../prismicio'
import { SliceZone } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers';
import { components } from '../slices'
import Header from '../components/header';
import Footer from '../components/footer';
import Seo from '../components/seo';


export default function Homepage({ page, navigationHeader, navigationFooter, settings }) {
  if(!page || (page && !page.data) ){
    return <></>
  }
  page.data.slices.map(slice => {
    if(slice.slice_type === "navigation_bar"){
      slice.items = navigationHeader.data.Links
    }
    return slice
  })

  const seoData = {
    title : prismicH.asText(page.data.title),
    description : page.data.description,
    image : page.data.image.url
  }

  return ( 
  <>
    <Seo data={seoData} />
    <Header navigation={navigationHeader} settings={settings} />
    <div>
      <SliceZone slices={page.data.slices} components={components} navHeader={navigationHeader} />
    </div>
    <Footer navigation={navigationFooter} settings={settings} />
  </>
  )
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID('page', 'home')
  const navigationHeader = await client.getSingle('HeaderNavigation')
  const navigationFooter = await client.getAllByType('FooterNavigation')
  const settings = await client.getSingle('Settings')

  return {
    props: { page, navigationHeader, navigationFooter, settings },
  }
}