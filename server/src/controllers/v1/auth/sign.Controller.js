const loginUser = (
  { userService },
  { validateHash, generateToken },
  { passwordIncorrect, userNotExist }) =>

  async (req, res) => {
    //?  controller for loguin users
    try {
      const { username, password } = req.body;

      const user_db = await userService.getUser(username);

      if (!user_db) {
        return res.status(200).json(userNotExist());
      }

      if (!(await validateHash(user_db.password, password))) {
        return res.status(200).json(passwordIncorrect());
      }

      const token = generateToken({ _id: user_db.id });

      res.cookie("token", token, {
        httpOnly: false,
      });

      return res.status(200).json({
        success: true,
        csrftoken: token,
        data: {
          id_user: user_db._id,
          username: user_db.username,
          id_avatar: user_db.id_avatar,
          first_name: user_db.first_name,
          last_name: user_db.last_name,
          password: true,
        },
      });
    } catch (e) {
      res.status(500).json({ messageError: e.message });
    }
  };

module.exports = loginUser;
