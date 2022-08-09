import { Context } from "@azure/functions";
import { Respond } from "./HttpUtils";
import { verify } from "jsonwebtoken";
import { AuthObject } from "../Types/Core.type";
export const validateToken = async (context: Context, token: string): Promise<AuthObject> => {
  const privateKey = process.env["privateKey"];
  return new Promise((resolve, reject) => {
    verify(token, privateKey, function (err, authObject) {
      if (err) {
        reject(new Error("Invalid token"));
      } else {
        resolve(authObject);
      }
    });
  });
};
