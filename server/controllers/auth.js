import jwt from "jsonwebtoken";
import AuthSchema from "../models/auth";

/**
 * Generate new accessToken using refreshToken
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function refreshToken(req, res) {
  const { user, token } = req.body;

  if (!token || !user) {
    return res.sendStatus(401);
  }

  const session = await AuthSchema.findOne({ username: user, token });
  if (!session) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    res.status(200).json({
      accessToken,
    });
  });
}
