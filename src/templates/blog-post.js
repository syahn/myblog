import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import Link from '../components/Link'
import Tags from '../components/Tags'
import Bio from '../components/Bio'

import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <Tags list={post.frontmatter.tags || []} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
      </div>
    )
  }
}

export default BlogPostTemplate

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $path } }) {
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         tags
//       }
//     }
//   }
// `
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
