
import { interests } from "base/interests"
import { goals } from "base/goals"
import { zodiac } from "base/zodiac"
import { orientation } from "base/orientation"
import { typeWork } from "base/typeWork"

export const fields = {
  gender: {
    type: "switch",
    name: "gender",
    label: "Выберите Пол",
    options: [
      { name: '<div class="man-ico"></div>', value: "man" },
      { name: '<div class="woman-ico"></div>', value: "woman" },
    ],
    wrapClass: "input-box col-2 col-md-6 col-xs-6",
  },
  rangeBerth: {
    type: "range",
    name: "rangeBerth",
    label: "Выберите возраст",
    range: [18, 75],
    wrapClass: "input-box box-range col-2 col-lg-3 col-md-6 col-xs-6",
  },

  hotelFind: {
    type: "autoHotel",
    name: "hotelFind",
    label: "Tекущее расположение",
    wrapClass: " search-select-box input-box col-3 col-md-6 col-xs-12 search-users-parts",
  },
  goals: {
    type: "choiseTags",
    name: "goals",
    label: "Выберите Цели",
    options: goals,
    wrapClass: "col-8 col-lg-7 col-md-12  input-box col-xs-12 search-users-parts",
  },
  interests: {
    type: "choiseTags",
    name: "interests",
    label: "Интересы",
    options: interests,
    wrapClass: "col-3  col-md-6 col-xs-12 input-box search-users-parts",
  },
  zodiac: {
    type: "select",
    name: "zodiac",
    label: "Зодиак",
    placeholder: "Выбрать зодиак",
    wrapClass: "col-3 col-md-6 search-select-box input-box col-xs-12 search-users-parts",
    options: zodiac
  },
  work: {
    type: "select",
    name: "work",
    label: "Работа",
    placeholder: "Выбрать работу",
    wrapClass: "col-3  col-md-6  search-select-box input-box col-xs-12 search-users-parts",
    options: typeWork
  },
  orientation: {
    type: "select",
    name: "orientation",
    placeholder: "Выбрать ориентацию",
    label: "Ориентация",
    wrapClass: "col-3  col-md-6 search-select-box input-box col-xs-12 search-users-parts",
    options: orientation
  },


}

export const usersSearchFieldsMini = {
  gender: {
    type: "switch",
    name: "gender",
    label: "Выберите Пол",
    options: [
      { name: '<div class="man-ico"></div>', value: "man" },
      { name: '<div class="woman-ico"></div>', value: "woman" },
    ],
    wrapClass: "input-box col-4 col-sm-6 col-xs-6",
  },
  rangeBerth: {
    type: "range",
    name: "rangeBerth",
    label: "Выберите возраст",
    range: [18, 75],
    wrapClass: "input-box box-range col-8  col-sm-6 col-xs-6",
  },

  goals: {
    type: "choiseTags",
    name: "goals",
    label: "Выберите Цели",
    options: goals,
    wrapClass: "col-12 input-box col-xs-12",
  },



}