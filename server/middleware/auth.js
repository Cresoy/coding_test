import jwt from "jsonwebtoken";

/**
 * Checks if accessToken is valid
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  } else res.sendStatus(401);
};
