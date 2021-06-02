import jwt from "jsonwebtoken";
import AuthSchema from "../models/auth";

// Logout user
export async function refreshToken(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.sendStatus(401);
  }

  const session = await AuthSchema.findOne({ token });
  if (!session) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({
      accessToken,
    });
  });
}
