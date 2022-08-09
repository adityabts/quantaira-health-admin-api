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

export interface AuthObject {
  userId: string;
  username: string;
  iat: number;
}
