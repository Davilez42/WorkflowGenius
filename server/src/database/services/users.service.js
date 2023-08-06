


module.exports = userService = (userModel, haspassword) => ({
  getUser: async (username) => {
    const user = await userModel.findOne({ username });
    return user;
  },

  insertUser: async (data) => {
    const { username, email } = data;
    const user = await userModel.exists({ username });
    const user_email = await userModel.exists({ email });
    if (user) {
      return { succes: false, username: false, email: true };
    }
    if (user_email) {
      return { succes: false, email: false, username: true };
    }
    data["password"] = await haspassword(data["password"]);
    const user_created = await userModel.create(data);
    return { succes: true, user_created, username: true, email: true };
  }
})




