import { deleteUser } from 'firebase/auth';
import { deleteUsers } from 'servicesMysql/changeUsers';

export const deleteAccount = async (auth, ActionFn) => {
  try {
    const user = auth.currentUser;

    await deleteUsers(user.uid);
    await deleteUser(user);

    auth.signOut();

    if (ActionFn) {
      ActionFn('EXIT_ACCOUNT', null);
    }

  } catch (error) {
    // Обработка ошибок, например, вывод в консоль или уведомление пользователю
    console.error('Произошла ошибка при удалении аккаунта:', error);
  }
};