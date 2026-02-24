import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Admin implements OnInit {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  loginApiUrl = 'https://dev-backend-pos.beanboutiques.com/api/login';
  countryapiUrl = 'https://stage-master-backend.epravaha.com/api/Country/GetAllCountries '; // demo public API
  stateApiUrl = 'https://stage-master-backend.epravaha.com/api/State/GetStatesBy';
  districtApiUrl = 'https://stage-master-backend.epravaha.com/api/District/GetDistrictsByStateCode';
  cityApiUrl = 'https://stage-master-backend.epravaha.com/api/City/GetCityBy';
 COMPANY_REGISTER_API = 'https://dev-backend-pos.beanboutiques.com/api/register/company';
  



  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.getCountries()
    this.getStatesByCountryId(76);  
  }
  //API Method - Get Put Patch Delete Post
  
  // Get User List
  getUsers(): Observable<any[]> {
    // return this.http.get<any[]>(this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }

  // Admin Login
  login(data: any) {
    return this.http.post(this.loginApiUrl, data);
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countryapiUrl);
  }
  // Get States by CountryId
  getStatesByCountryId(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.stateApiUrl}/${countryId}`
    );
  }

  getDistrictsByStateId(stateId: number): Observable<any[]> {
   return this.http.get<any[]>(
    `${this.districtApiUrl}/${stateId}`
   );
  }

  getCitiesByDistrictId(districtId: number): Observable<any[]> {
   return this.http.get<any[]>(
    `${this.cityApiUrl}/${districtId}`
   );
  }
  // Company Registration
//   registerCompany(payload: any): Observable<any> {
//   return this.http.post(this.COMPANY_REGISTER_API, payload);
//  }

 
registerCompany(data: any){
  return this.http.post(this.COMPANY_REGISTER_API, data);
}

 getcompanyList(){
  return this.http.get('https://dev-backend-pos.beanboutiques.com/api/group/get/list?GroupType=Company&ApprovalStatus=PENDING&ApprovalStatus=APPROVED&ApprovalStatus=REJECTED&IsActive=true&IsActive=false');
 }

 getCompnayById(id: any){
  return this.http.get(`https://dev-backend-pos.beanboutiques.com/api/group/getby/${id}`);
 }

 updateCompany(id: string, payload: any) {
  return this.http.put(
    `https://dev-backend-pos.beanboutiques.com/api/group/update/${id}`,
    payload
  );
}

// 🔥 CoCompany register API
private readonly CO_COMPANY_API =
  'https://dev-backend-pos.beanboutiques.com/api/register/cocompany/bycompany';

registerCoCompany(payload: any) {
  return this.http.post(this.CO_COMPANY_API, payload);
}

 getCoCompanyList(){
  return this.http.get(
    'https://dev-backend-pos.beanboutiques.com/api/group/get/list?GroupType=CoCompany&ApprovalStatus=PENDING&ApprovalStatus=APPROVED&ApprovalStatus=REJECTED&IsActive=true&IsActive=false'
  );
}
}
