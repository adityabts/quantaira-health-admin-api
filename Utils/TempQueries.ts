const editDevice = `INSERT INTO [device].[device]
([device_serial_no]
,[fda_device_id]
,[device_type_id]
,[manufacturer_id]
,[model_no]
,[firmware_id]
,[isactive]
,[isdeleted]
,[createdby]
,[createddate]
,[modifiedby]
,[modifieddate]
,[device_name]
,[device_guid])
VALUES
(<device_serial_no, nvarchar(50),>
,<fda_device_id, nvarchar(50),>
,<device_type_id, int,>
,<manufacturer_id, int,>
,<model_no, int,>
,<firmware_id, int,>
,<isactive, bit,>
,<isdeleted, bit,>
,<createdby, uniqueidentifier,>
,<createddate, datetime,>
,<modifiedby, uniqueidentifier,>
,<modifieddate, datetime,>
,<device_name, nvarchar(100),>
,<device_guid, uniqueidentifier,>)`;

const listUsers = `SELECT 
      users.user_guid as id,
      users.name,
      users.email,
      role_name as 'role.name',
      role_guid as 'role.id',
      users.isactive as isActive,
      creater.name as 'createdBy.name',
      creater.user_guid as 'createdBy.id',
      users.createddate as 'createdBy.timeStamp'
      FROM web.users as users
      LEFT JOIN web.roles as roles
      ON users.typeofuser =  roles.role_guid
      LEFT JOIN web.users as creater
      ON users.createdby = creater.user_guid
      FOR JSON PATH, INCLUDE_NULL_VALUES, ROOT('users')`;

const createDevice = `INSERT INTO [device].[device] 
    ([device_serial_no]
    ,[fda_device_id]
    ,[device_type_id]
    ,[manufacturer_id]
    ,[model_no]
    ,[firmware_id]
    ,[isactive]
    ,[isdeleted]
    ,[device_name]
    ,[device_guid])
    VALUES
    (
    @device_serial_no
    ,@fda_device_id
    ,@device_type_id
    ,@manufacturer_id
    ,@model_no
    ,@firmware_id
    ,1
    ,0    
    ,@device_name
    ,@device_guid)`;

const listDeviceTypes = "SELECT * FROM [Quantaira_Device_LocalDB].[device].[device_type]";
const listDeviceModels = "SELECT * FROM [Quantaira_Device_LocalDB].[device].[device_model]";
const listDeviceFirmware = "SELECT * FROM [Quantaira_Device_LocalDB].[device].[device_firmware]";
const analyticsCounts = `SELECT 
(SELECT count(*) FROM device.device) as devicesCount,
(SELECT count(*) FROM web.users ) as usersCount,
(SELECT count(*) FROM web.patient ) as patientsCount,
(SELECT count(*) FROM web.items  ) as medicationsCount`;

const listDevices = `
SELECT
	deviceTable.device_guid as deviceId,
	deviceTable.device_name as deviceName,
	deviceTable.device_serial_no as serialNumber,
	deviceTable.fda_device_id as fdaDeviceId,
	deviceTypeTable.device_type_guid as deviceTypeId,
	deviceTypeTable.device_type_Code as deviceTypeCode,
	deviceTypeTable.device_description as deviceTypeDescription,
	deviceManufacturerTable.device_manufacturer_guid as deviceManufacturerId,
	deviceManufacturerTable.manufacturer_name as deviceManufacturerName,
	deviceManufacturerTable.manufacturer_code as deviceManufacturerCode,
	deviceManufacturerTable.addressline1 as devcieManufacturerAddress1,
	deviceManufacturerTable.addressline2 as devcieManufacturerAddress2,
	deviceModelTable.device_model_guid as deviceModelId,
	deviceModelTable.model_code as deviceModelCode,
	deviceModelTable.model_name as deviceModelName,
	deviceModelTable.model_number as deviceModelNumber,
	deviceModelTable.model_color as deviceModelColor,
	deviceModelTable.manufacturing_date as deviceManufacturingDate,
	deviceFirmwareTable.device_firmware_guid as deviceFirmwareId,
	deviceFirmwareTable.description as deviceFirmwareDescription,
	deviceFirmwareTable.version as deviceFirmwareVersion,
	deviceFirmwareTable.createddate as deviceFirmwareDate,
	configurationTable.value as deviceConfiguration

FROM
	device.device as deviceTable 
	JOIN device.device_type as deviceTypeTable ON deviceTable.device_type_id = deviceTypeTable.device_type_guid
	JOIN device.device_manufacturer as deviceManufacturerTable ON deviceTable.manufacturer_id = deviceManufacturerTable.device_manufacturer_guid
	JOIN device.device_model as deviceModelTable ON deviceTable.model_no =  deviceModelTable.device_model_guid
	JOIN device.device_firmware as deviceFirmwareTable ON deviceTable.firmware_id =  deviceFirmwareTable.device_firmware_guid
	LEFT JOIN device.configuration as configurationTable ON deviceTable.device_guid = configurationTable.device_id
`;

export const Queries = {
  listUsers,
  editDevice,
  createDevice,
  listDevices,
  listDeviceTypes,
  analyticsCounts,
  listDeviceModels,
  listDeviceFirmware,
};
