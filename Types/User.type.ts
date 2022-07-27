import { Bed } from "./Bed.type";
import { QuantairaDataItem } from "./Core.type";
import { Organization } from "./Organization.type";
import { Permission } from "./Permission.type";
import { Role } from "./Role.type";

export interface User extends QuantairaDataItem {
  id: string;
  name: string;
  email: string;
  pass?: string;
  role: Role;
  organization?: Organization;
  beds?: Array<string>;
  permissions?: Array<string>;
  isActive: boolean;
}
