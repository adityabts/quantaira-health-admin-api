import { Address, QuantairaDataItem } from "./Core.type";

export interface ParentOrganization extends QuantairaDataItem {
  name: string;
  code: string;
  address: Address;
  phone: string | number;
  fax: string | number;
  email: string;
  website: string;
}
