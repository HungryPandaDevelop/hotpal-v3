import React from 'react';

import RangeSlider from 'components/input-base/RangeSlider';
import ChoiseTags from 'components/input-base/ChoiseTags';
import EditionTags from 'components/input-base/EditionTags';
import Invite from 'components/input-base/Invite';
import Text from 'components/input-base/Text'; // поле стандартное
import Date from 'components/input-base/Date'; // дата
import DateRange from 'components/input-base/DateRange'; // дата
import Phone from 'components/input-base/Phone'; // телефон
import Password from 'components/input-base/Password'; // пароля
import Textarea from 'components/input-base/Textarea'; // область текста
import Editor from 'components/input-base/Editor'; // область текста ????
import Message from 'components/input-base/RenderMessage'; // область текста
import Checkbox from 'components/input-base/Checkbox';  // чекбокс
import Radio from 'components/input-base/Radio';  // radio
import Select from 'components/input-base/Select'; // селект
import FileDropZoneAccount from 'components/input-base/FileDropZoneAccount'; // зона файлов
import Star from 'components/input-base/Star'; // звезды отзыв
import Switch from 'components/input-base/Switch'; // поле переключателя
import Complex from 'components/input-base/Complex'; // комлекс
import Coords from 'components/input-base/Coords'; // координаты
import City from 'components/input-base/City'; // выбор города
import AutocompleteHotel from 'components/input-base/AutocompleteHotel'; // выбор города
import GeoHotels from 'components/input-base/GeoHotels'; // выбор точки
import YaString from 'components/input-base/SearchYaString'; // выбор точки

import { createValidateArr } from './validator';


const RenderFields = ({ fields, checkErrorSubmit, type }) => {



  const choiseInputType = (obj) => {
    switch (obj.type) {
      case 'text': return <Text obj={obj} />
      case 'password': return <Password obj={obj} />
      case 'dropzoneAccount': return <FileDropZoneAccount obj={obj} />
      case 'switch': return <Switch obj={obj} />
      case 'radio': return <Radio obj={obj} />
      case 'checkbox': return <Checkbox obj={obj} />
      case 'textarea': return <Textarea obj={obj} />
      case 'phone': return <Phone obj={obj} />
      case 'select': return <Select obj={obj} />
      case 'date': return <Date obj={obj} />
      case 'dateRange': return <DateRange obj={obj} />
      case 'complex': return <Complex obj={obj} />
      case 'city': return <City obj={obj} />
      case 'coords': return <Coords obj={obj} />
      case 'autoHotel': return <AutocompleteHotel obj={obj} />
      case 'geo': return <GeoHotels obj={obj} />
      case 'yaString': return <YaString obj={obj} />

      case 'range': return <RangeSlider obj={obj} />
      case 'choiseTags': return <ChoiseTags obj={obj} />
      case 'tags': return <EditionTags obj={obj} />
      case 'invite': return <Invite obj={obj} />

      case 'editor': return <Editor obj={obj} />
      case 'message': return <Message obj={obj} />
      case 'star': return <Star obj={obj} />

      default: return 'Empty Field';
    }
  }


  return (
    <>
      {type !== 'single' ? (
        Object.keys(fields).map((item, index) => (
          <React.Fragment
            key={index} >
            {
              (
                choiseInputType({ ...fields[item], checkErrorSubmit, 'validate': createValidateArr(fields[item].validate) })
              )
            }
          </React.Fragment>
        ))
      ) : choiseInputType({ ...fields, checkErrorSubmit, 'validate': createValidateArr(fields.validate) })}
    </>
  )
}

export default RenderFields;
