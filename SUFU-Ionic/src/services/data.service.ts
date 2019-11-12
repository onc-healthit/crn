import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  authToken: string = null;

  userId: string = null;

  stripeSecret: string = null;

  dataModel: any = null;

  name: any = null;

  emailId: any = null;

  userRegisteredCountryCode: any = null;

  profileImage: any = null;

  selection: any = null;

  userType: any = null;

  displaySelection: any = null;

  boardData: any = null;

  statCurrentLeague: any = null;

  selectedMatch: any = null;

  allLeagues: any = null;

  statsCardScorers: any = null;

  statsTopScorers: any = null;

  statsAssistScorers: any = null;

  pushToken: any = null;

  groups: any = null;

  eligibleToCreateGroups: any = null;

  eligibleToJoinGroups: any = null;

  dwollaAppToken: any = null;

  loginUserID:any = null;

  accessToken: string = '';

  tokenType: any = '';

  patientID: any = '';

  rediredtURL: any = '';

  userName: any = '';

  fhirURL: any = '';

  refreshToken: string = '';

  connectivityOnline: boolean = true;

  userDetailsResponse: any = null;

  constructor() {
  }

  clear() {
  }
}
