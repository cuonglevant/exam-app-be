import db from "../models/index.js";
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check Username
    let user = await User.findOne({ username: req.body.username }).exec();
    if (user) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use!" });
    }

    // Check Email
    user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (const element of req.body.roles) {
      if (!ROLES.includes(element)) {
        res.status(400).send({
          message: `Failed! Role ${element} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };
