import { interests } from "base/interests"
import { goals } from "base/goals"
import { zodiac } from "base/zodiac"
import { orientation } from "base/orientation"
import { typeWork } from "base/typeWork"


export const fields = {

  name: {
    type: "text",
    name: "name",
    label: "Имя",
    placeholder: "Имя",
    wrapClass: "input-box",
  },
  dateBerth: {
    type: "date",
    name: "dateBerth",
    label: "Дата рождения",
    placeholder: "Дата рождения",

    // validate: ['required'],
  },
  gender: {
    type: "switch",
    name: "gender",
    label: "Пол",
    options: [
      { name: '<div class="man-ico"></div>', value: "man" },
      { name: '<div class="woman-ico"></div>', value: "woman" },
    ],
    wrapClass: "input-box gender-input-box",
  },
  goals: {
    type: "tags",
    name: "goals",
    label: "Цели",
    placeholder: "Цели",
    text: "Добавьте ваши цели.",
    textSecond: "Данные цели будут использоваться, как приглашения, для большего совпадения пар.",
    options: goals,
  },

  hotelFind: {
    type: "autoHotel",
    name: "hotelFind",
    label: "Tекущее расположение",
    wrapClass: "input-find-hotel input-box",
  },
  hotelDate: {
    type: "dateRange",
    name: "hotelDate",
    label: "Даты",
    wrapClass: "input-box",
  },
  interests: {
    type: "tags",
    subType: "lite",
    name: "interests",
    label: "Интересы",
    placeholder: "Интересы",
    options: interests,
    text: "Добавьте ваши интересы.",
    textSecond: "Введите ваши интересы вручную.",
    className: "special col-8 col-sm-6 col-xs-12",
  },
  work: {
    type: "select",
    name: "work",
    placeholder: "Выбрать работу",
    options: typeWork
  },
  zodiac: {
    type: "select",
    name: "zodiac",
    placeholder: "Выбрать зодиак",
    options: zodiac
  },
  tripPoint: {
    type: "select",
    name: "tripPoint",
    placeholder: "Выбрать цель",
    options: [
      { label: "Очистить", value: null },
      { label: "Отдых", value: "Отдых" },
      { label: "Командировка", value: "Командировка" },
      { label: "Загар", value: "Загар" },
      { label: "Кураж", value: "Кураж" },
    ]
  },
  orientation: {
    type: "select",
    name: "orientation",
    placeholder: "Выбрать ориентацию",
    options: orientation
  },
  description: {
    type: "textarea",
    name: "description",
    label: "О себе:",
    placeholder: "Описание",
    wrapClass: "input-box ",
  },

  imgsAccount: {
    type: "dropzoneAccount",
    name: "imgsAccount",
    label: "Фото профиля",
    labelSecond: "(Изображение формата jpg,png не менее 150x150 px, не более 8Мб)",
    typeFile: "img",
    typeUpload: ".png, .jpg, .jpeg",
    maxSize: 52428800,
    textEmpty: "На данный момент фоно не выбрано",
    wrapClass: "col-12 input-photo-container account-item",
  },
}