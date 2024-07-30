
export const inputs = {
  message: {
    name: "message",
    placeholder: "Напишите сообщение... ",
    type: "message",
    validate: ['required'],
  },
  fileMessage: {
    type: "fileChat",
    name: "fileMessage",
    typeUpload: ".png, .jpg, .jpeg",
    maxSize: 5242880,
    textEmpty: "На данный момент фоно не выбрано",
    wrapClass: "chat-files",
  },
  invite: {
    type: "invite",
    name: "invite",
  },
}