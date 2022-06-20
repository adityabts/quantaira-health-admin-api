import { QuantairaDataItem } from "./Core.type";
import { Organization } from "./Organization.type";

export interface Building extends QuantairaDataItem {
  name: string;
  organization?: Organization;
}
