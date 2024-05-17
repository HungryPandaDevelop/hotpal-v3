
import { calcUnreadMessage } from 'pages/chat/hooks/calcUnread';
import { calcUnread } from 'pages/chat/hooks/calcUnread';

const totalCountMessage = (type, uid, rooms, likes) => {


  if (type === 'rooms') {
    if (calcUnreadMessage(rooms, uid) === 0) return 0;

    return calcUnreadMessage(rooms, uid)
  }
  if (type === 'likes') {
    if (calcUnread(likes, uid) === 0) return 0;

    return calcUnread(likes, uid)
  }


}

export default totalCountMessage;
