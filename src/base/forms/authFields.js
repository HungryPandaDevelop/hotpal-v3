

export const regFieldVertification = {
  vert: {
    name: "vert",
    type: "text",
    wrapClass: "input-box col-12",
  },
};


export const authFields = {
  email: {
    name: "email",
    label: "Почта",
    placeholder: "Введите почту",
    type: "text",
    validate: ['required', 'minLength', 'mailCheck'],
    wrapClass: "input-box  col-12",
  },
  password: {
    name: "password",
    label: "Пароль",
    placeholder: "Пароль",
    type: "password",
    validate: ['required', 'minLength'],
    wrapClass: "input-box  col-12",
  },
};

export const getPass = {
  email: {
    name: "email",
    label: "Почта",
    placeholder: "Введите почту",
    type: "text",
    validate: ['required', 'minLength', 'mailCheck'],
    wrapClass: "input-box  col-12",
  },
};

export const checkDate = {
  dateBerth: {
    name: "dateBerth",
    label: "Дата рождения",
    placeholder: "Дата рождения",
    type: "date",
    wrapClass: "input-box col-12",
    validate: ['minAge'],
  },
};

export const settingsPassword = {

  checkPassword: {
    name: "checkPassword",
    label: "Введите пароль",
    type: "password",
    wrapClass: "col-12 input-box",
    validate: ['required', 'minLength'],
  },
  changePassword: {
    name: "changePassword",
    type: "password",
    label: "Новый пароль",
    wrapClass: "col-12 input-box",
    validate: ['required', 'minLength'],
  },
  checkChangePassword: {
    name: "checkChangePassword",
    type: "password",
    label: "Подтвердить пароль",
    wrapClass: "col-12 input-box",
    validate: ['required', 'minLength'],
  },
}




export const regMail = {
  email: {
    name: "email",
    label: "Почта",
    placeholder: "Введите почту",
    type: "text",
    validate: ['required', 'minLength', 'mailCheck'],
    wrapClass: "input-box  col-12",
  },
  password: {
    name: "password",
    label: "Пароль",
    placeholder: "Пароль",
    type: "password",
    validate: ['required', 'minLength', 'checkRus'],
    wrapClass: "input-box  col-12",
  },
};