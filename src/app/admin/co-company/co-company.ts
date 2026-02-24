import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../services/admin';

@Component({
  selector: 'app-co-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './co-company.html',
  styleUrl: './co-company.css',
})
export class CoCompany implements OnInit {

  constructor(private adminService: Admin, private cdr: ChangeDetectorRef) {}

  /* ========= FORM ========= */
  form: any = {
    name: '',
    shortName: '',
    email: '',
    phone: '',
    mobile: '',
    gstin: '',
    pan: '',
    registrationNo: '',
    cin: '',
    address: '',
    pinCode: '',
    spocName: '',
    spocEmail: '',
    spocMobile: '',
  };

  /* ========= TABLE ========= */
coCompanyTable: any[] = [];

  /* ========= FILES ========= */
  gstFile!: File;
  panFile!: File;
  logoFile!: File;
  profileFile!: File;

  /* ========= DROPDOWN ========= */
  companyList: any[] = [];

  selectedCompanyId: any = '';
  selectedCountryId: any = '';
  selectedStateId: any = '';
  selectedDistrictId: any = '';
  selectedCityId: any = '';

  countryList: any[] = [];
  stateList: any[] = [];
  districtList: any[] = [];
  cityList: any[] = [];

  ngOnInit(): void {
    this.getCompanyList();
    this.getCountries();
    this.getCoCompanyList();
  }

  /* ========= COMPANY ========= */
  getCompanyList() {
    this.adminService.getcompanyList().subscribe((res: any) => {
      this.companyList = res?.data ?? [];
    });
  }

  /* ========= COUNTRY ========= */
  getCountries() {
    this.adminService.getCountries().subscribe((res: any) => {
      this.countryList = res ?? [];
    });
  }

  /* ========= RESET HELPERS ========= */
  resetState() {
    this.stateList = [];
    this.selectedStateId = '';
    this.resetDistrict();
  }

  resetDistrict() {
    this.districtList = [];
    this.selectedDistrictId = '';
    this.resetCity();
  }

  resetCity() {
    this.cityList = [];
    this.selectedCityId = '';
  }

  /* ========= DROPDOWN EVENTS ========= */
  onCountryChange() {
    this.resetState();
    this.selectedCompanyId = ''; // optional reset

    if (!this.selectedCountryId) return;

    this.adminService.getStatesByCountryId(this.selectedCountryId)
      .subscribe((res: any) => this.stateList = res ?? []);
  }

  onStateChange() {
    this.resetDistrict();

    if (!this.selectedStateId) return;

    this.adminService.getDistrictsByStateId(this.selectedStateId)
      .subscribe((res: any) => this.districtList = res ?? []);
  }

  onDistrictChange() {
    this.resetCity();

    if (!this.selectedDistrictId) return;

    this.adminService.getCitiesByDistrictId(this.selectedDistrictId)
      .subscribe((res: any) => this.cityList = res ?? []);
  }

  /* ========= FILE ========= */
  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];

    if (type === 'gst') this.gstFile = file;
    if (type === 'pan') this.panFile = file;
    if (type === 'logo') this.logoFile = file;
    if (type === 'profile') this.profileFile = file;
  }

  /* ========= SUBMIT ========= */
  onSubmit() {

    const formData = new FormData();

    formData.append('GroupId', this.selectedCompanyId);

    formData.append('Country', this.selectedCountryId);
    formData.append('State', this.selectedStateId);
    formData.append('District', this.selectedDistrictId);
    formData.append('City', this.selectedCityId);

    formData.append('Name', this.form.name);
    formData.append('PinCode', this.form.pinCode);
    formData.append('AddressLine', this.form.address);

    formData.append('ContactEmail', this.form.email);
    formData.append('ContactNo', this.form.mobile);
    formData.append('MobileNo', this.form.phone);

    formData.append('GSTIN', this.form.gstin);
    formData.append('PanCard', this.form.pan);

    formData.append('RegistrationNo', this.form.registrationNo);
    formData.append('CIN', this.form.cin);

    formData.append('ContactPersonName', this.form.spocName);
    formData.append('ContactPersonMobile', this.form.spocMobile);
    formData.append('ContactPersonEmail', this.form.spocEmail);

    if (this.gstFile) formData.append('GSTImage', this.gstFile);
    if (this.panFile) formData.append('PanCardImage', this.panFile);
    if (this.logoFile) formData.append('Logo', this.logoFile);
    if (this.profileFile) formData.append('ProfileImage', this.profileFile);

    this.adminService.registerCoCompany(formData).subscribe({
      next: (res: any) => {

       alert('✅ CoCompany Registered');
        this.getCoCompanyList();
      this.cdr.markForCheck();

       console.log('CoCompany Response', res);

         /* 🔥 BACKEND RESPONSE TABLE ME ADD */
      //  if (res?.data) {
      //  this.coCompanyTable.unshift(res.data);
      //  }

       this.resetForm();
     },
      error: (err) => {
        console.error(err);
        alert('❌ Error');
      }
    });
  }
  resetForm() {
  this.form = {
    name: '',
    shortName: '',
    email: '',
    phone: '',
    mobile: '',
    gstin: '',
    pan: '',
    registrationNo: '',
    cin: '',
    address: '',
    pinCode: '',
    spocName: '',
    spocEmail: '',
    spocMobile: '',
  };

  this.selectedCompanyId = '';
  this.selectedCountryId = '';
  this.selectedStateId = '';
  this.selectedDistrictId = '';
  this.selectedCityId = '';

  this.stateList = [];
  this.districtList = [];
  this.cityList = [];
}


getCoCompanyList(){
  this.adminService.getCoCompanyList().subscribe({
    next:(res: any)=>{
      this.coCompanyTable = res?.data ?? [];
      this.cdr.markForCheck();
      console.log("Co Company List:", this.coCompanyTable);
    }
  })
}
}
