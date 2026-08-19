export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export interface CreateItemRequest {
  requestorName: string;
  itemRequested: string;
}

export interface EditStatusRequest {
  id: string;
  status: RequestStatus;
}

export interface ItemRequest {
  _id: string;
  requestorName: string;
  itemRequested: string;
  requestCreatedDate: string;
  lastEditedDate: string | null;
  status: RequestStatus;
}