import { 
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';


import { toast } from 'react-toastify';


export const authorizationAccount =  async (formData) => {

    const { email, password } = formData;

    try {

      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        // toast.success('Авторизации успешна')
        console.log('user', userCredential)
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