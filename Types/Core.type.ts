export interface QuantairaDataItem {
  id: string;
  createdBy?: { id: string; timeStamp: Date };
  modifiedBy?: { id: string; timeStamp: Date };
  isActive?: boolean;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string | number;
}
