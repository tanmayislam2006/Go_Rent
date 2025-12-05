import jwt from "jsonwebtoken";
import config from "../config";
export const generateAccessToken = async (payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.accessTokenSecret as string,
      { expiresIn: "6h" },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      }
    );
  });
};
