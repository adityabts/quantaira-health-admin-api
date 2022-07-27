import { Context } from "@azure/functions";
import { User } from "../Types/User.type";
import { runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request: any, context: Context) => {
  try {
    const response = await runQuery(Queries.listUsers);
    const users: User = response[0][Object.keys(response[0])[0]];
    Respond(context)._200(users);
  } catch (e) {
    Respond(context)._500("There was a problem while serving your request. PLease try again after sometime!");
  }
};
