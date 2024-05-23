import Tabs from 'pages/cabinet/parts/Tabs';
import LikesItem from 'pages/cabinet/parts/LikesItem'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Sympathy = ({ uid, likes }) => {

  console.log('likes', likes)


  return (
    <>
      <div className="stub"></div>
      <div className="main-full">
        <Tabs
          active={3}
        />
        <div className="border-container border-null-top account-main" >
          <div className="likes-all">
            {likes.length === 0 ? (<>
              <h3>Делайте больше поисков, ищите, вступайте в диалоги и Вас заметят!</h3>
              <Link to="/users-catalog" className="btn btn--blue">Начать поиск</Link>
            </>) : (<>

              {likes.map((like, index) => {

                // if (like) {
                return (
                  <LikesItem
                    key={index}
                    uid={uid}
                    like={like}
                    likes={likes}
                  // typeLike="in"
                  />
                )
                // }
              }
              )}




            </>)}

          </div>

        </div>
      </div>
    </>
  )
}


const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
    likes: state.globalState.likes,
  }
}

export default connect(mapStateToProps)(Sympathy);