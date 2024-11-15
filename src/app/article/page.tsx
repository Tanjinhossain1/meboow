import React, { Fragment } from 'react'
import ArticleList from './_components/ArticleDisplayer'
import Footer from '@/Component/HomePage/Footer'
import Navbar from '@/Component/Shared/Navbar'

export default function page() {
  return (
     <Fragment>
        <Navbar />
        <ArticleList />
        <Footer />
     </Fragment>
  )
}
