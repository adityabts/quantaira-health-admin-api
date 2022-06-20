export enum Procedure {
  _CREATE_USER = "[web].[usp_create_user]",
  _CREATE_DEVICE = "[web].[usp_add_device]",

  _RESET_PASSWORD = "[web].[usp_change_password]",

  _UPDATE_DEVICE = "",
  _UPDATE_USER = "[web].[usp_edit_user]",

  _GET_DEVICE = "[web].[usp_get_device_details]",
  _GET_USER = "[web].[usp_get_user_details]",

  _LIST_BEDS = "[web].[usp_get_bed]",
  _LIST_USERS = "[web].[usp_get_users]",
  _LIST_DEVICES = "[web].[usp_get_device_list]",
  _LIST_PERMISSIONS = "[web].[usp_get_permissions]",
}
