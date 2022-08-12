import { Context } from "@azure/functions";
import { Respond } from "./HttpUtils";
import { verify } from "jsonwebtoken";
import { AuthObject } from "../Types/Core.type";
export const validateToken = async (context: Context, token: string): Promise<AuthObject> => {
  const privateKey = process.env["privateKey"];
  context.log("Private Key", privateKey, token);
  return new Promise((resolve, reject) => {
    verify(token, privateKey, function (err, authObject) {
      if (err) {
        context.log("TokenError", err);
        reject(new Error("Invalid token"));
      } else {
        resolve(authObject);
      }
    });
  });
};
