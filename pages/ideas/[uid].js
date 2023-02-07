import * as prismic from '@prismicio/client'
import { createClient, linkResolver } from '../../prismicio'
import * as prismicH from '@prismicio/helpers';
import PostComponent from '../../components/post'

export default function PostPage({ post, navigationHeader, navigationFooter, settings, posts }) {
  if(!post || (post && !post.data) ){
    return <></>
  }
  
  return <PostComponent post={post} navigationHeader={navigationHeader} navigationFooter={navigationFooter} settings={settings} posts={posts} />
}

export async function getStaticPaths() {
    const client = createClient()
    const documents = await client.getAllByType('post')
    return {
      paths: documents.map((doc) => prismicH.asLink(doc, linkResolver)),
      fallback: true,
    }
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })
  const post = await client.getByUID('post', params.uid, {
    fetchLinks: 'post-tag.uid, post-tag.name, author.name',
  })
  const navigationHeader = await client.getSingle('HeaderNavigation')
  const navigationFooter = await client.getAllByType('FooterNavigation')
  const settings = await client.getSingle('Settings')
  const posts = await client.getAllByType('post', { 
    predicates: [
      prismic.predicate.not( "my.post.uid", params.uid )
    ]
  })

  return {
    props: { post, navigationHeader, navigationFooter, settings, posts },
  }
}