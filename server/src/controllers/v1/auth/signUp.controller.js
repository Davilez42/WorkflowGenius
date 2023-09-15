const registerUser = (
  { userService },
  { generateToken },
  { userNameAlreadyExist, emailAlreadyExist }) =>

  async (req, res) => {
    //?  controller for register users
    try {
      const { success, email, username, user_created } =
        await userService.insertUser(req.body);

      if (!success) {
        if (!email) {
          return res.status(200).json(emailAlreadyExist());
        }
        if (!username) {
          return res.status(200).json(userNameAlreadyExist());
        }
      }
      const token = generateToken({ _id: user_created.id });

      res.cookie('token', token)

      return res.status(200).json({
        success,
        data: {
          _id: user_created._id,
          username: user_created.username,
          first_names: user_created.first_names,
          last_names: user_created.last_names,
          id_avatar: user_created.id_avatar,
          password: true,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ messageError: e.message });
    }
  };
module.exports = registerUser;
