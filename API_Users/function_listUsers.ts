import { User } from "../Types/User.type";
import { runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";

export default async (request, context) => {
  try {
    const query = "SELECT * from [web].[users]";
    const rows = await runQuery(query);
    context.log("Received Rows", rows);
    const users: Array<User> = rows.map((row: any) => {
      const user: User = {
        id: row.user_guid,
        name: row.name,
        email: row.email,
        role: row.typeofuser,
        isActive: row.isactive,
        createdBy: { id: row.createdby, timeStamp: row.createddate },
      };
      return user;
    });
    Respond(context)._200({ users });
  } catch (e) {
    Respond(context)._500(
      "There was a problem while serving your request. PLease try again after sometime!"
    );
  }
};
