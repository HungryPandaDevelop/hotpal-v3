export const inputs = {
  dateBerth: {
    name: "dateBerth",
    label: "Дата рождения",
    placeholder: "Дата рождения",
    type: "date",
    wrapClass: "input-box col-6",
    validate: ['minAge'],
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
  },
  imgsAccount: {
    type: "dropzoneAccount",
    name: "imgsAccount",
    label: "Фото профиля",
    labelSecond: "(Изображение формата jpg,png не менее 150x150 px, не более 8Мб)",
    typeFile: "img",
    typeUpload: ".png, .jpg, .jpeg",
    maxSize: 52428800,
    minLengthText: 'Добавьте хотя бы одно фото!',
    textEmpty: "На данный момент фоно не выбрано",
    wrapClass: "col-12 input-photo-container account-item",
    validate: ['required']
  },
};