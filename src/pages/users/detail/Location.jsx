import ClearYaMap from 'components/partInputCoords/ClearYaMap'

const Location = ({ user }) => {
  return (
    <div className="user-location">
      <h3>Текущее расположение</h3>
      <div className="user-location-info">
        <div className="user-location-place user-location-item">
          <i className="marker-ico"></i>
          <span>
            {user.currentLocation.address}
          </span></div>
        {/* <div className="user-location-date user-location-item"><i className="calendar-ico"></i><span>5 - 13 Авг</span></div> */}
        <ClearYaMap currentLocation={user.currentLocation.coords} />
      </div>
    </div>
  )
}

export default Location