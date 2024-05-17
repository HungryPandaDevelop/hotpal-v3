export const input = {
  city: {
    type: "region",
    name: "city",
    label: "Город",
    placeholder: "Выбрать город",
    wrapClass: "input-box",
  },

  dateRange: {
    type: "dateRange",
    name: "dateRange",
    label: "Даты визита",
    wrapClass: "input-box",
  },
  personCount: {
    type: "select",
    name: "personCount",
    label: "Количество персон",
    placeholder: "Выбрать количество",
    wrapClass: "input-box",
    options: [
      { label: "1 гость", value: 1 },
      { label: "2 гостя", value: 2 },
      { label: "3 гостя", value: 3 },
      { label: "4 гость", value: 4 },
      { label: "5 гостей", value: 5 },
      { label: "6 гостей", value: 6 },
    ]
  },
  yaString: {
    type: "yaString",
    name: "yaString",
    label: "Поиск отелей по городам",
    wrapClass: "input-box",
    placeholder: "Ведите название города"
  },
  geoHotels: {
    type: "geo",
    name: "geoHotels",
    label: "На карте",
    wrapClass: "input-box geo-input-box",
  },
  hotelFind: {
    type: "autoHotel",
    name: "hotelFind",
    label: "Поиск по отелям",
    wrapClass: " search-select-box input-box col-3 col-md-6 col-xs-12",
    placeholder: "Ведите название отеля"
  },

}