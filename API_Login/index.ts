import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Respond } from "../Utils/HttpUtils";
import { isValidPassword, isValidUserName } from "../Utils/UserInput";
import { runQuery } from "../Utils/DatabaseConnection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const name = "Tejas Dadhe";
    const email = "tejas.dadhe1994@gmail.com";
    const pass = "password@123";

    context.log("Initializig New Connection");
    const query = `INSERT [web].[users] ([name], [email], [password], [typeofuser], [org_id], [isactive], [isdeleted],  [createddate],[modifieddate], [first_login]) 
    VALUES (N'${name}', N'${email}', N'${pass}',  NULL, '20CE0D36-750B-4057-9984-EAED270608CF', 1, 0, CAST(N'${new Date().toISOString()}' AS DateTime), CAST(N'${new Date().toISOString()}' AS DateTime), 0)`;
    await runQuery(query);
    context.log("Connection Established");
    const { username, password } = req.body;
    if (!isValidUserName(username) || !isValidPassword(password)) {
      Respond(context)._401("The username or password is incorrect!");
    } else {
      const user = {
        name: "Tejas Dadhe",
        permissions: [1, 2, 3, 4],
      };
      const token = "generate a token to be sent to user";
      Respond(context)._200({
        user,
        token,
      });
    }
  } catch (error) {
    context.log.error(
      "################### ERROR IN API_NEW_USER ################"
    );
    context.log.error(error);
    context.log.error(
      "##########################################################"
    );
    Respond(context)._500("There was a problem with this service execution");
  }
};

export default httpTrigger;
