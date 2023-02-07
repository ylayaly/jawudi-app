import React from 'react'
import * as prismicH from '@prismicio/helpers';
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'
import Header from '../components/header';
import Footer from '../components/footer';
import Seo from '../components/seo';
import DetailFundComponent from './detailFund';
import LegalPage from './legalPage';

const PageComponent = ({ page, navigationHeader, navigationFooter, settings }) => {

    page.data.slices.map(slice => {
        slice.countSlices = page.data.slices.length
        if (slice.slice_type === "navigation_bar" || slice.slice_type === "hero_gradient" || slice.slice_type === "hero_video" || slice.slice_type === "hero_image") {
            slice.links = navigationHeader.data.Links
        }
        if (slice.slice_type === "hero_gradient") {
            slice.minimalHeader = page.data.minimalHeader
        }
        if (slice.slice_type === "fees") {
            slice.fees = page.fees
        }
        if (slice.slice_type === "store_buttons_cta") {
            slice.settings = settings
        }
        if (slice.slice_type === "fund_grid") {
            slice.goals = page.goals
        }
        return slice
    })

    const seoData = {
        title: prismicH.asText(page.data.title),
        description: page.data.description,
        image: prismicH.asImageSrc(page.data.image)
    }

    const hasFundGrid = page.data.slices.filter(s => s.slice_type === 'fund_grid')


    return (
        <>         
        <div className='relative max-w-max mx-auto bg-white overflow-hidden'>
            <Seo data={seoData} />
            <Header navigation={navigationHeader} settings={settings} page={page} />
            <div id='content-body'>
                <SliceZone slices={page.data.slices} components={components} navHeader={navigationHeader} />
            </div>
            <Footer navigation={navigationFooter} settings={settings} page={page} countSlices={page.data.slices.length} />
            {hasFundGrid && <DetailFundComponent />}
            <LegalPage />
        </div>
        </>
    )
}

export default PageComponent