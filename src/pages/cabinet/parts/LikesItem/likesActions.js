import { saveListing } from 'services/saveListing';
import { deleteListing } from 'services/getListings';

export const onRead = (like, uid) => {
  if (!like.read && like.interlocutors[0] !== uid) {
    like = { ...like, read: true }
    saveListing(like, like.id, 'likes');
  }
}

export const onDelete = (id, setLoading) => {
  setLoading(true)
  deleteListing('likes', id);
}