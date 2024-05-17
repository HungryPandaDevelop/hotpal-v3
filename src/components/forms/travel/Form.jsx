import RenderInput from 'components/input/RenderInput';
import { inputs } from './inputs';
import { reduxForm } from 'redux-form';


const RoomsSearchPanel = (props) => {

  const {
    waitAnsw,
    submitSuccess,
  } = props;


  const onSubmit = (e) => {
    e.preventDefault();

    submitSuccess();

  };


  return (
    <div className="travel-add-panel border-container">
      <div className="travel-add-panel-container">
        <div className="main-grid">
          <div className="col-4 col-xs-12"><h3>Буду в этом отеле</h3></div>
          <div className="col-4 col-xs-12">
            <RenderInput
              type="single"
              fields={inputs.dateTravelRange}
            />

          </div>
          <div className="col-4  col-xs-12">
            <div className="col-12 btn-container">
              <button className="btn - white btn" onClick={onSubmit} >
                {waitAnsw ? (<>Loading...</>) : (
                  <><i></i><span>Подверждаю</span></>
                )}
              </button>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}


export default reduxForm({
  form: 'usersSearch',
  enableReinitialize: true,
})(RoomsSearchPanel);