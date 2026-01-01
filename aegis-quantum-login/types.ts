
export interface UserSession {
  username: string;
  accessLevel: string;
  signature: string;
}

export enum AuthState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  VERIFYING = 'VERIFYING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface SecurityReport {
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  lastBreach: string;
  encryptionStatus: string;
  aiComment: string;
}
