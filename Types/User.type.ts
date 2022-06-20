import { Bed } from "./Bed.type";
import { QuantairaDataItem } from "./Core.type";
import { Organization } from "./Organization.type";
import { Permission } from "./Permission.type";

export interface User extends QuantairaDataItem {
  id: string;
  name: string;
  email: string;
  pass?: string;
  role: "Doctor" | "Clinician" | "Nurse";
  organization?: Organization;
  beds?: Array<string>;
  permissions?: Array<string>;
  isActive: boolean;
}
