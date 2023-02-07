import React from 'react'
import * as prismicH from '@prismicio/helpers';
import { SliceZone, PrismicLink } from '@prismicio/react'
import { components } from '../slices'
import Header from '../components/header';
import Footer from '../components/footer';
import Seo from '../components/seo';
import HeroComponent from './posts/Hero';
import Tags from './posts/Tags';
import SuggestPost from './posts/SuggestPost';

const PostComponent = ({ post, navigationHeader, navigationFooter, settings, posts }) => {
    post.data.minimalHeader = true
    post.data.logoColor = "Light"
    post.data.slices.map(slice => {
        slice.countSlices = post.data.slices.length
        if(slice.slice_type === "navigation_bar" || slice.slice_type === "hero_gradient" || slice.slice_type === "hero_video" || slice.slice_type === "hero_image"){
          slice.links = navigationHeader.data.Links
        }
        if(slice.slice_type === "hero_gradient"){
          slice.minimalHeader = post.data.minimalHeader
        }
        return slice
    })
    
    const seoData = {
        title : prismicH.asText(post.data.title),
        description : post.data.description,
        image : post.data.postImage.url
    }

    return ( 
    <div className='wrapper bg-white'>
        <Seo data={seoData} />
        <Header navigation={navigationHeader} settings={settings} page={post}  />
        <HeroComponent data={post.data} />
        <div className='w-full post'>
            <div className='max-w-max mx-auto'>
                <SliceZone slices={post.data.slices} components={components} navHeader={navigationHeader} />
            </div>
            <Tags data={post.data} />
            <SuggestPost posts={posts} />
        </div>

        <Footer navigation={navigationFooter} settings={settings} page={post} countSlices={post.data.slices.length} />
    </div>
    )
}

export default PostComponent