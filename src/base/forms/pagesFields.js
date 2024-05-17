
export const pagesFields = {
  title: { 
    name: "title", 
    placeholder: "Заголовок ", 
    type:"text",
    validate: ['required'],
    wrapClass: "input-box col-12" ,
  },
  content: {
    type: "editor", 
    name: "content",
    validate: ['required'],
    wrapClass: "input-box col-12" , 
  },

}