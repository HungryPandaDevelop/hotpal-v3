import { Field } from 'redux-form';
import { useState, useEffect } from 'react';

const TempateInputStar = ({ input, label, className }) => {
  const [choisesIndex, setChoiseIndex] = useState('');



  useEffect(() => {

    input.onChange(choisesIndex + 1);
  }, [choisesIndex])

  const onChoiseStar = (i) => {

    setChoiseIndex(i);


  }


  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(<i
        key={i}
        className={`star-ico star-ico--gray ${choisesIndex >= i && 'active'}`}
        onClick={() => { onChoiseStar(i) }}
      ></i>)
    }

    return stars;
  }

  return (
    <div className={className}>
      <div className="reviews-stars">
        {label && <label>{label}</label>}
        <div className="reviews-stars-container">
          {renderStars()}
        </div>
      </div>

      <input
        {...input}
        type="hidden"
      // className="input-stars"

      />


    </div>
  );
}



const RenderInputStar = ({ name, label, className }) => {

  return <Field
    name={name}
    label={label}
    className={className}
    component={TempateInputStar}


  />;
}

export default RenderInputStar;