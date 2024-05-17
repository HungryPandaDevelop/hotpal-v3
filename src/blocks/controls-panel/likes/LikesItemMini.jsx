// import { getSingleListing } from 'services/getSingleListing';
// import { useState, useEffect } from 'react'

// import { renderStatus } from 'pages/cabinet/parts/LikesItem/renderStatus';

// import RenderRead from 'pages/cabinet/parts/LikesItem/RenderRead';
// import RemderImg from 'pages/cabinet/parts/LikesItem/RemderImg';

// import { onDelete } from 'pages/cabinet/parts/LikesItem/likesActions'
// import { onRead } from 'pages/cabinet/parts/LikesItem/likesActions'

// const LikesItemMini = ({
//   like,
//   uid
// }) => {


//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState([]);

//   let userSide = uid === like.interlocutors[0] ? true : false;


//   useEffect(() => {



//     let userLoadId = uid === like.interlocutors[0] ? like.interlocutors[1] : like.interlocutors[0];

//     getSingleListing('users', userLoadId).then((getuser) => {

//       setUser(getuser);
//       setLoading(false);
//     });


//   }, [like]);

//   if (loading) { return 'Loading...' }

//   return (
//     <div className="col-4 col-xs-6">
//       <div
//         className="like-item-mini"
//       // onMouseEnter={() => { onRead(like, uid) }}
//       >
//         {/* <RenderRead like={like} uid={uid} /> */}
//         <RemderImg user={user} />
//         <div className="btn-container">
//           <h3>{user.name}</h3>

//           {userSide ? renderStatus(like) : (
//             <>
//               <div class="like-hint">Ваш ответ на симпатию</div>
//               <div className="like-status-btn see-like-btn" title="Еще посмотрю"></div>
//               <div className="like-status-btn agree-like-btn" title="Ниче так"></div>
//               <div className="like-status-btn disagree-like-btn" title="Неее"></div>
//             </>
//           )}
//           <div className="like-status-btn trash-like-btn" title="С глаз долой"> </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default LikesItemMini
