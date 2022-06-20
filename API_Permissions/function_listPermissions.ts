import { Permission } from "../Types/Permission.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";

export default async (request, context) => {
  try {
    const rows = await runProcedure(Procedure._LIST_PERMISSIONS);
    const permissions: Array<Permission> = rows.map((row: any) => {
      const permission: Permission = {
        id: row.permission_guid,
        name: row.permission_name,
      };
      return permission;
    });
    Respond(context)._200({ permissions });
  } catch (error) {
    context.log.error("################ ERROR IN API [GET] > Beds ##############");
    context.log.error(error);
    context.log.error("##########################################################");
    Respond(context)._500(error.message);
  }
};
