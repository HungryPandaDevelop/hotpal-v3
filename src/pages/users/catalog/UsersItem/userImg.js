
export const userImg = (user) => {

  // if (!user) { return false; };

  // let img = [];

  // if (user.imgsAccount) {

  //   if (typeof user.imgsAccount === 'object') {
  //     img = user.imgsAccount
  //   } else if (user.imgsAccount !== 'Array') {
  //     console.log(user.imgsAccount)
  //     img = JSON.parse(user.imgsAccount);
  //   }

  //   img = img.length > 0 ? img[0].url : false;


  //   if (img) {
  //     const encodedUrl = img.replace(/\s/g, '%20');
  //     return { backgroundImage: `url(${encodedUrl})` }
  //   }
  // };
  if (user.imgsAccount) {
    let img = user.imgsAccount;

    if (typeof img === 'string') {
      try {
        img = JSON.parse(img);
      } catch (error) {
        // console.error('Error parsing user.imgsAccount:', error);
        console.log('err img');

      }
    }

    if (Array.isArray(img) && img.length > 0) {
      const encodedUrl = img[0].url.replace(/\s/g, '%20');
      return { backgroundImage: `url(${encodedUrl})` };
    }
  }
}


