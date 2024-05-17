import BestHotels from 'blocks/BestHotels';
import BestUsers from 'blocks/BestUsers';

const BestPanel = () => {
  return (
    <div className="main-grid bests-panel">
      <div className="col-6 col-xs-12"><BestUsers /></div>
      <div className="col-6 col-xs-12"><BestHotels /></div>
    </div>
  )
}

export default BestPanel