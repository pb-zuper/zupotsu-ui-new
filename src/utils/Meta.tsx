import React from 'react'
// import { Helmet } from 'react-helmet-async'

const Meta = ({ title = "Zuper", description, keywords }: any) => {
  return (
    <>
       {/* <Helmet> */}
        <title>{title || 'Zuper'}</title>
        {/* <meta name="description" content="Discover a world of literary treasures at BookBucket.in. Shop for new and used books, explore an extensive collection of Marathi and English books, and enjoy lightning-fast 2-day delivery. Buy, sell, and trade your books with ease." />
        <meta name="keywords" content="Bookstore, New Books, Used Books, Marathi Books, English Books, Fast Delivery, Book Selling, Affordable Books, Online Bookshop, Reading Adventures, Literature, Best Book Prices, Book Deals, Book Lovers, Buy and Sell Books, Secondhand Books, Discounted Books, Quick Book Delivery, Reading Community, Bookworm's Paradise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.google.com/" /> */}
       {/* </Helmet> */}
    </>
  )
}

export default Meta
