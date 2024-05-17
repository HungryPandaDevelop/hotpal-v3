export const inputs = {
  name: {
    name: "name",
    label: "Имя",
    placeholder: "Введите имя",
    type: "text",
    wrapClass: "input-box col-6",
    validate: ['required', 'minLength'],
  },
  email: {
    name: "email",
    label: "Почта",
    placeholder: "Почта",
    type: "text",
    validate: ['required', 'minLength', 'mailCheck'],
    wrapClass: "input-box  col-6",
  },

  dateBerth: {
    name: "dateBerth",
    label: "Дата рождения",
    placeholder: "Дата рождения",
    type: "date",
    wrapClass: "input-box col-6",
    validate: ['minAge'],
  },
  hotelFind: {
    name: "hotelFind",
    label: "Город",
    placeholder: "Выбрать город",
    type: "city",
    wrapClass: "input-box  col-6",
    validate: []
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
    minLengthText: 'Добавьте хотя бы одно фото!',
    validate: ['required']
  },
  gender: {
    type: "switch",
    name: "gender",
    label: "Пол",
    options: [
      { name: '<div class="man-ico"></div>', value: "man" },
      { name: '<div class="woman-ico"></div>', value: "woman" },
    ],
    wrapClass: "input-box  col-6",
    validate: []
  },
  password: {
    name: "password",
    label: "Пароль",
    placeholder: "Пароль",
    type: "password",
    validate: ['required', 'minLengthPass'],
    wrapClass: "input-box  col-6",
  },
};