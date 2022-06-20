import { Role } from "../Types/Role.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";

export default async (request, context) => {
  try {
    const roles: Array<Role> = [
      { id: "6459C80D-49B6-4197-A448-502C446193F0", name: "Hospital Admin" },
      { id: "93A23C14-560E-4CC6-962C-3F8E2B2333CE", name: "Doctor" },
      // { id: "364B5903-554A-4B05-823A-1E52A7680D59", name: "Quantaira Staff" },
      { id: "777C2F17-5C12-4679-AD53-F64AA6287FD7", name: "Nurse" },
      { id: "46E7682C-2CB6-472E-B16C-8286D62D8C1F", name: "Clinician" },
    ];
    Respond(context)._200({ roles });
  } catch (error) {
    context.log.error("################ ERROR IN API [GET] > Roles ##############");
    context.log.error(error);
    context.log.error("##########################################################");
    Respond(context)._500(error.message);
  }
};
