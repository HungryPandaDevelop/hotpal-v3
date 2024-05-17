const RenderRead = ({ like, uid }) => {
  return (!like.read && like.interlocutors[0] !== uid) && <div className="status-new">new</div>
}

export default RenderRead
