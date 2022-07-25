import { QuantairaDataItem } from "./Core.type";

export interface Manufacturer extends QuantairaDataItem {
  name?: string;
  code?: string;
  address1?: string;
  address2?: string;
}
