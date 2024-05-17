import moment from 'moment';

export const calculateAge = (date)=>{

  if(date){
    // const birthDate = new Date(date);
    // const difference = Date.now() - birthDate.getTime();
    // const age = new Date(difference);
  
    // return Math.abs(age.getUTCFullYear() - 1970);

      const birthDate = moment(date, 'DD-MM-YYYY');
        // console.log('date 2', birthDate);
        const now = moment();
        const age = moment.duration(now.diff(birthDate)).years();
        return age;

  }else{
    return false}

}