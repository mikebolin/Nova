export class ActivityLogResponse {
  id: string;
  datePartition: string;
  requestName: string;
  applicationName: string;
  corellationID: string;
  dateCreated: Date;
  elapsedMilliseconds: number;
  enterpriseID: number;
  enterpriseName: string;
  environment: string;
  machineName: string;
  messageType: string;
  payloadSize: number;
  primaryReference: string;
  requestID: string;
  shipmentID: number;
  statusCode: number;
  userName: string;
}
