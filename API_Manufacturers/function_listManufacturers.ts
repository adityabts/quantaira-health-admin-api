import { Manufacturer } from "../Types/Manufacturer.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";

export default async (request, context) => {
  try {
    const query = `SELECT TOP (1000) [row_id]
    ,[manufacturer_code]
    ,[manufacturer_name]
    ,[addressline1]
    ,[addressline2]
    ,[city]
    ,[state]
    ,[zipcode]
    ,[country_code]
    ,[contact_no]
    ,[fax]
    ,[emailid]
    ,[website]
    ,[isactive]
    ,[isdeleted]
    ,[createdby]
    ,[createddate]
    ,[modifiedby]
    ,[modifieddate]
    ,[device_manufacturer_guid]
    FROM [Quantaira_Device_ChildDB].[device].[device_manufacturer]`;
    const rows = await runQuery(query);
    const manufacturers: Array<Manufacturer> = rows.map((row: any) => {
      const manufacturer: Manufacturer = {
        id: row.device_manufacturer_guid,
        name: row.manufacturer_name,
        code: row.manufacturer_code,
        address1: row.addressline1,
        address2: row.addressline2,
      };
      return manufacturer;
    });
    Respond(context)._200({ manufacturers });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
