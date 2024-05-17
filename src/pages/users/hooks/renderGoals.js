export const renderGoals = (el) => {

  el = el.toLowerCase()

  if (el.indexOf('бокал в лобби') >= 0) {
    return <i className="bokal-ico"></i>
  }
  if (el.indexOf('бассейн или море') >= 0) {
    return <i className="plag-ico"></i>
  }
  if (el.indexOf('свидание в номере') >= 0) {
    return <i className="padushka-ico"></i>
  }
  if (el.indexOf('поход в ресторан') >= 0) {
    return <i className="pribor-ico"></i>
  }

}