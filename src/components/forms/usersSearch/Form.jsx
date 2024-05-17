import RenderInput from 'components/input/RenderInput';

// import Tabs from 'components/forms/formSearch/Tabs';

import { fields } from './fields';

import { reduxForm } from 'redux-form';


const UsersSearchPanel = ({
  waitAnsw,
  submitSuccess,
  reset,
  resetForm,
}) => {


  const onSubmit = (e) => {
    e.preventDefault();

    submitSuccess();
  };

  const resetAll = () => {
    reset();
    resetForm();
  }


  return (
    <div className="border-container border-container-search border-null-left">

      <div className="main-grid">
        <RenderInput
          type="single"
          fields={fields.gender}

        />
        <RenderInput
          type="single"
          fields={fields.rangeBerth}
        />


        <RenderInput
          type="single"
          fields={fields.goals}
        />
        <RenderInput
          type="single"
          fields={fields.hotelFind}
        />

        <RenderInput
          type="single"
          fields={fields.zodiac}
        />

        <RenderInput
          type="single"
          fields={fields.work}
        />
        <RenderInput
          type="single"
          fields={fields.orientation}
        />
        <div className="col-12">
          <div className="btn-container">
            <div className="btn btn--blue" onClick={(e) => { onSubmit(e) }}>{waitAnsw ? (<>Loading...</>) : 'Поиск'}</div>
            <div className="btn btn--blue-border" onClick={resetAll}>Сбросить</div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default reduxForm({
  form: 'usersSearch',
  enableReinitialize: true,
})(UsersSearchPanel);