
import axios from 'axios';


export const sendEmail = async (account, location) => {
  try {
    const generateId = location.state?.verificationId;
    const response = await axios.get("https://hotpal.ru/api/mail.php", {
      params: {
        mail: account.email,
        name: account.name,
        verificationId: generateId,
        host: window.location.host
      }
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};