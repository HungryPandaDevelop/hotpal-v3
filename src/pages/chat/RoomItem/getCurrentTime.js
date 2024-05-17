import moment from 'moment';

export const getCurrentTime = ({ entranceDate }) => {

  // let onlineUserTime = moment.unix(roomUserInfo.timestamp.seconds).format("DD.MM.YYYY HH:mm");

  // let calcDate = moment() - moment.unix(roomUserInfo.timestamp.seconds);
  // let minutes = moment.duration(calcDate).minutes();

  // if (minutes < 5) {
  //   return <div className="rooms-item-online">В сети</div>
  // }
  // else {
  //   return <>Был(а) {onlineUserTime}</>
  // }
  if (entranceDate) {
    // console.log('entranceDate', entranceDate);

    let calcDate = moment() - moment(entranceDate);
    // console.log('2', calcDate);
    // console.log('1', moment().format("DD.MM.YYYY HH:mm:ss"));
    let minutes = moment.duration(calcDate).minutes();

    // console.log('m', minutes);

    if (minutes < 5) {
      return <div className="rooms-item-online">В сети</div>
    }
    else {
      return <>Был(а) {moment(entranceDate).format("DD.MM.YYYY")}</>
    }
  }


  // var seconds = moment.duration(calcDate).seconds();
  // var hours = Math.trunc(moment.duration(calcDate).asHours());
}