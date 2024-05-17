export const getMaxListing = (arr, type) => {

  const sortArray = [];

  arr.forEach((obj) => {
    delete obj.interlocutors;
    delete obj.read;
    delete obj.status;
    delete obj.timestamp;
    delete obj.userRef;
    delete obj.id;


    const existingObject = sortArray.find((item) => item[type] === obj[type]);

    if (existingObject) {
      existingObject.count++;
    } else {
      obj.count = 1;
      sortArray.push(obj);
    }

  });


  return sortArray.sort((a, b) => b.count - a.count);

  // console.log('mergedArray', mergedArray)

}