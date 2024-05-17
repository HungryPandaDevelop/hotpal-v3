import { 
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { toast } from 'react-toastify';



export const changePassword =  async (formData) => {

  const auth = getAuth();

  const user = auth.currentUser;

  const { checkPassword, changePassword, checkChangePassword } = formData;

  const credential = EmailAuthProvider.credential(
    user.email,
    checkPassword
  );



  if(checkPassword){

    await reauthenticateWithCredential(user, credential).then(() => {
      // toast.success('Обновили user');

      if(changePassword && changePassword.length > 4){
        if((changePassword === checkChangePassword)){
          updatePassword(user, changePassword).then(() => {
            toast.success('Вы обновили пароль');
          }).catch((error) => {});
        }else{
          toast.error('Пароли не совпадают');
        }
      }else{
        toast.error('Пароль должен быть больше 6 символов');
      }

    }).catch((error) => {
      console.log(error)
      toast.error('Не тот пароль');

    });
  }



}
export const changePasswordNoAuth =  async (formData, getUser) => {

  

  // const user = auth.getUser(getUser.uid);

  const { checkPassword, changePassword, checkChangePassword } = formData;

  try {
    if(changePassword !== checkChangePassword){
      toast.error('Не совпадают пароли');
      return false;
    }
    const auth = getAuth();

    const userCredential = await signInWithEmailAndPassword(auth, getUser.email, checkPassword);

    if (userCredential.user) {
      // toast.success('Авторизации успешна')
      console.log('user', userCredential)
      const user = auth.currentUser;
      updatePassword(user, changePassword).then(() => {
        toast.success('Вы обновили пароль');
        return true
      }).catch((error) => {
        return false
      });
    }

    return true;

  } catch (error) {
  
    if(error.code === 'auth/user-not-found'){
      toast.error('Пользователь не существует');
    }
    else if(error.code === 'auth/wrong-password'){
      toast.error('Неправильный пароль');
    }
    else{
      toast.error('Ошибка авторизации');
    }

    return false;
    
  }
}