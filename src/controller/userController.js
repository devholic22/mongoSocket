import User from "../models/User";

export const getLogin = (req, res) => {
  return res.render("login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", {
      errorMsg: "π μ΄ μ΄λ©μΌμ λ±λ‘λμ§ μμ μ΄λ©μΌμ΄μμ"
    });
  }
  const isPasswordCorrect = Boolean(password == user.password);
  if (!isPasswordCorrect) {
    return res.render("login", { errorMsg: "π λΉλ°λ²νΈκ° λ¬λΌμ" });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const getRegister = (req, res) => {
  return res.render("register");
};

export const postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.exists({ email });
  if (exist) {
    return res.render("register", { errorMsg: "π μ΄λ―Έ λ±λ‘λ μ΄λ©μΌμ΄μμ" });
  }
  await User.create({
    name,
    email,
    password
  });
  return res.redirect("/login");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
