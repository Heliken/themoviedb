export interface CustomNotification {
  type: CustomNotificationType;
  message: string;
}

export enum CustomNotificationType {
  Success = 'success',
  Error = 'error',
}
