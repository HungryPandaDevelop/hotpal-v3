import { orientation } from "base/orientation"

export const settingsPrivateData = {

  email: {
    name: "email",
    label: "E-mail",
    placeholder: "e-mail",
    type: "text",
    disabled: true,
    wrapClass: "col-6 col-xs-12 input-box",
  },
  phone: {
    name: "phone",
    label: "Телефон",
    placeholder: "+7(   )    -  -",
    type: "phone",
    wrapClass: "col-6 col-xs-12 input-box",
  },
}

export const settingsPassword = {

  checkPassword: {
    name: "checkPassword",
    label: "Введите пароль",
    type: "password",
    wrapClass: "col-4 col-xs-12 input-box",
  },
  changePassword: {
    name: "changePassword",
    type: "password",
    label: "Новый пароль",
    wrapClass: "col-4 col-xs-12 input-box",
  },
  checkChangePassword: {
    name: "checkChangePassword",
    type: "password",
    label: "Подтвердить пароль",
    wrapClass: "col-4  col-xs-12 input-box",
  },
}

export const settingsPrivacy = {

  setting_invites: {
    type: "select",
    name: "setting_invites",
    label: "Кто может отправлять мне приглашения",
    placeholder: "Выбрать ориентацию",
    wrapClass: "col-6 col-xs-12 input-box",
    options: orientation
  },
  setting_likes: {
    type: "select",
    name: "setting_likes",
    label: "Кто может лайкать меня",
    placeholder: "Выбрать ориентацию",
    wrapClass: "col-6 col-xs-12 input-box",
    options: orientation
  },

  setting_messages: {
    type: "select",
    name: "setting_messages",
    label: "Кто может отправлять мне личные сообщения",
    placeholder: "Выбрать ориентацию",
    wrapClass: "col-6 col-12 input-box",
    options: orientation
  },
  setting_founds: {
    type: "select",
    name: "setting_founds",
    label: "Кто может видеть мой профиль",
    placeholder: "Выбрать ориентацию",
    wrapClass: "col-6  col-xs-12 input-box",
    options: orientation
  },
  setting_goals: {
    type: "select",
    name: "setting_goals",
    label: "Кто может видеть мои цели",
    placeholder: "Выбрать ориентацию",
    wrapClass: "col-6 col-xs-12 input-box",
    options: orientation
  },


}
