// import { getSingleListing } from 'services/getSingleListing';
import { getUserSingle } from 'servicesMysql/getUserSingle';
import { useState, useEffect } from 'react'


import RenderUserBtn from 'pages/cabinet/parts/LikesItem/RenderUserBtn';
import RenderRead from 'pages/cabinet/parts/LikesItem/RenderRead';
import RemderImg from 'pages/cabinet/parts/LikesItem/RemderImg';

import { onDelete } from 'pages/cabinet/parts/LikesItem/likesActions'
import { onRead } from 'pages/cabinet/parts/LikesItem/likesActions'

import { Link } from 'react-router-dom';
const LikesItem = ({
  like,
  uid,
  // typeLike
}) => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  let userSide = uid === like.interlocutors[0] ? true : false;

  let userLoadId = userSide ? like.interlocutors[1] : like.interlocutors[0];

  useEffect(() => {

    getUserSingle(userLoadId).then((getuser) => {
      setUser(getuser);
      setLoading(false);
    });


  }, []);

  if (loading) { return 'Load user...' }


  // if ((typeLike === 'out' && !userSide) || (typeLike === 'in' && userSide)) { return false }

  if (!user) {
    return (
      <div

        className="like-item"

        onClick={() => { onRead(like, uid) }}
        onMouseEnter={() => { onRead(like, uid) }}
      >
        <RenderRead like={like} uid={uid} />

        <div>
          Пользователь удален
        </div>

        <div className="btn-container">
          <div
            className="like-status-btn trash-like-btn"
            onClick={() => { onDelete(like, setLoading) }}
            title="С глаз долой"
          ></div>
        </div>
      </div>
    );
  }

  if (userSide === true && like.status !== 'agree') {
    return false;
  }

  return (
    <div

      className="like-item"
      onMouseEnter={() => { onRead(like, uid) }}
      onClick={() => { onRead(like, uid) }}
    >
      <RenderRead like={like} uid={uid} />

      <Link to={`/users-catalog/${userLoadId}`} className="img-cover-info">
        <RemderImg user={user} />
        <h3>{user.name}</h3>
      </Link>

      <div className="btn-container">
        {userSide ? (<>

          <div className="like-hint">
            Симпатия взаимна
          </div>
          <div className="like-status-btn agree-like-btn active"></div>
        </>) : (
          <>
            {like.status === 'agree' && (<div className="like-hint">
              Симпатия взаимна
            </div>)}
            {/* <RenderUserBtn
              like={like}
              status="see"
              textBtn="Оцениваю"
            /> */}

            <RenderUserBtn
              like={like}
              status="agree"
              textBtn="Нравится"
            />
            {/* <RenderUserBtn
              like={like}
              status="disagree"
              textBtn="Не нравится"
            /> */}
          </>
        )}
        <div
          className="like-status-btn trash-like-btn"
          onClick={() => { onDelete(like, setLoading) }}
          title="С глаз долой"
        ></div>
      </div>
    </div>
  )
}

export default LikesItem;