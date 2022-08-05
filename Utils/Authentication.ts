import { Context } from "@azure/functions";
import { Respond } from "./HttpUtils";
export const validateToken = (context: Context, token: string): boolean => {
  if (token == undefined) {
    Respond(context)._401("No authorisation token provided");
    return false;
  }
  return true;
};
