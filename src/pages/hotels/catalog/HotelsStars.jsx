
const HotelsStars = ({ starRating }) => {
  return (
    <div className="hotels-stars">
      {[...Array(5)].map((star, index) => {
        return (<div key={index} className={`star ${starRating > index ? 'active' : ''} `}></div>)
      })}
    </div>
  )
}

export default HotelsStars
