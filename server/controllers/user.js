import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user";
import AuthSchema from "../models/auth";

/**
 * register new user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function register(req, res) {
  const body = req.body;

  // check if form data is complete
  if (!(body.username && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  // checks if username already exists
  if (await UserModel.findOne({ username: body.username }))
    return res
      .status(400)
      .send({ error: "Username already taken", username: body.username });

  // creating a new mongoose doc from user data
  const user = new UserModel(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
}

/**
 * Login user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function login(req, res) {
  const body = req.body;
  const user = await UserModel.findOne({ username: body.username });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      const accessToken = jwt.sign(
        {
          username: user.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
      );
      const refreshToken = jwt.sign(
        {
          username: user.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
      );

      // save tokens to db
      await new AuthSchema({
        username: user.username,
        token: refreshToken,
      }).save();

      res.status(200).json({ user: user.username, accessToken, refreshToken });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
}

/**
 * Logout user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function logout(req, res) {
  const { user, token } = req.body;

  // delete refresh token from db
  const session = await AuthSchema.deleteOne({ username: user, token });
  if (session) {
    res.status(200).json({ success: true });
  } else res.status(401).json({ error: "Session expired" });
}
