import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import totalCountMessage from "blocks/controls-panel/parts/totalCountMessage";

const Tabs = ({ active, account, rooms, likes }) => {

  const countTotalMessage = account && totalCountMessage('rooms', account.uid, rooms);
  const countTotalLikes = account && totalCountMessage('likes', account.uid, rooms, likes);

  const allTabs = [
    ['Кабинет', '/cabinet'],
    ['Настройки', '/cabinet/settings'],
    ['Личные сообщения (' + countTotalMessage + ')', '/cabinet/chat'],
    ['Симпатии (' + countTotalLikes + ')', '/cabinet/likes'],
    ['Черный список', '/cabinet/dislikes'],
  ];

  return (
    <div className="border-tabs-container-outer border-tabs-container-cabinet">
      <div className="border-tabs-container">
        {allTabs.map((item, index) => (<Link
          key={index}
          className={`border-tab ${(index === active) ? 'active' : ''}`}
          to={item[1]}
        >{item[0]}</Link>))}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    account: state.account,
    rooms: state.globalState.rooms,
    likes: state.globalState.likes,
  }
}

export default connect(mapStateToProps)(Tabs);