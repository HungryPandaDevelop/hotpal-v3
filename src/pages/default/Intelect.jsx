import React from 'react'
import { getSingleListing } from "services/getSingleListing"
import { useState, useEffect } from 'react'
const Page = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    getSingleListing('pages', '9d85ebc3-6822-44f2-bf42-53fb940dc6d1').then((res) => {

      setListings(res);
      setLoading(false);
    })
  }, []);

  if (loading) { return 'Loading...' }

  return (
    <div className='main-full'>
      <div className="stub"></div>
      <h1>{listings.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: listings.content }}></div>
    </div >
  )
}

export default Page