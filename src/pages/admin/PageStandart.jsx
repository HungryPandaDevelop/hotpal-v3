import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getSingleListing } from "services/getSingleListing"


const PageStandart = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);


  const params = useParams();


  useEffect(() => {
    getSingleListing('pages', params.pageId).then((res) => {

      setListings(res);
      setLoading(false);

    })
  }, []);

  if (loading) { return 'Loading...' }


  return (
    <div>
      <div className="stub"></div>
      <div className="main-full">
        <h1>{listings.title}</h1>
        <div>
          {listings.content}

        </div>
      </div>
    </div>
  )
}

export default PageStandart
