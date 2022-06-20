import { Permission } from "../Types/Permission.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { TYPES } from "tedious";
import { parseBody } from "../Utils/UserInput";

export default async (request, context) => {
  try {
    console.log("RESETING PASSWORD");
    const authorId = "4AA38157-9B07-4102-846E-C2F04E6B6924";
    const params: { userId } = parseBody(request.body, ["userId"]);
    const { userId } = params;
    const password = "Password@123";

    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];
    // parameters.push({ name: "author_id", value: authorId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "userid", value: userId, type: TYPES.NVarChar });
    parameters.push({ name: "password", value: password, type: TYPES.NVarChar });

    await runProcedure(Procedure._RESET_PASSWORD, parameters);
    Respond(context)._200({ newPassword: password });
  } catch (error) {
    context.log.error("################ ERROR IN API [POST] > RESET PASSWORD ##############");
    context.log.error(error);
    context.log.error("##########################################################");
    Respond(context)._500(error.message);
  }
};
