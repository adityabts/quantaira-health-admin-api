import { Address, QuantairaDataItem } from "./Core.type";

export interface Organization extends QuantairaDataItem {
  id: string;
  name: string;
  code: string;
  address: Address;
  countryCode: string;
  phone: string | number;
  fax: string | number;
  email: string;
  website: string;
}
