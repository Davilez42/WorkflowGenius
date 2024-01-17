const userNotExist = (message) => {
  return {
    success: false,
    status: "USERNAME_NOT_EXIST",
    message: "user not found",
  };
};

const passwordIncorrect = (message) => {
  return {
    success: false,
    status: "PASSWORD_INCORRECT",
    message: "The password is incorrect",
  };
};

const emailAlreadyExist = (message) => {
  return {
    success: false,
    status: "EMAIL_ALREADY_EXIST",
    message: "The email already use",
  };
};
const userNameAlreadyExist = (message) => {
  return {
    success: false,
    status: "USERNAME_ALREADY_EXIST",
    message: "The username already use",
  };
};

module.exports = {
  userNotExist,
  passwordIncorrect,
  emailAlreadyExist,
  userNameAlreadyExist,
};
