import moment from "moment";
import { updateInvite } from 'services/chatEvents';


const MessagesItem = ({ message, uid, roomId, index, setImageLoaded }) => {

  const whose = message.uid === uid;

  const dateMessage = moment(message.updatedAt).format("DD.MM.YYYY HH:mm");

  const changeInvite = (status, index) => {

    updateInvite(roomId, status, index)
  }


  const loadImg = () => {
    let loadImgId;
    clearTimeout(loadImgId)
    loadImgId = setTimeout(() => {
      setImageLoaded(true);

    }, 250);
  }

  return (
    <div
      className={`${!message.read ? 'messages--noanswer' : ''} ${whose ? 'messages-item' : 'messages-item--answer'}`}
    >
      <div className={`${whose ? 'messages-box' : 'messages-box--answer'}`}>

        {typeof message.message !== 'string' ? (<span dangerouslySetInnerHTML={{ __html: message.invite.text }}></span>) : message.message}

        {message.fileMessage.length > 0 ? (<div>
          {message.fileMessage.map((img, index) => (
            <img onLoad={loadImg} className="messages-img" src={img.url} key={index} alt={img} />
          ))}

        </div>) : loadImg()}
      </div>
      <div className="messages-date">{dateMessage}</div>
      {message.invite && (<>
        {message.invite.status === 'agree' && (<div><div className="invite-status invite-status--agree">Принято</div></div>)}
        {message.invite.status === 'disagree' && (<div><div className="invite-status invite-status--disagree">Отказ</div></div>)}
        {(message.invite.status === 'see' && message.uid !== uid) && (
          <div className="messages-invite-btns">
            <div className="btn-apply btn-invite" onClick={() => changeInvite('agree', index)}><i> </i><span>Принять</span></div>
            <div className="btn-dismiss btn-invite" onClick={() => changeInvite('disagree', index)}><i></i><span>Оклонить</span></div>
          </div>
        )}
      </>)}

    </div>
  )
}

export default MessagesItem
