import { Component, OnInit, signal } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';   // ✅ ADD THIS


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company.html',
  styleUrl: './company.css',
})
export class Company implements OnInit {

  constructor(private adminService: Admin, private router: Router) { }
  gstFile!: File;
  panFile!: File;
  logoFile!: File;
  profileFile!: File;

  isEditMode: boolean = false;
  editCompanyId: string = '';


  /* ================= DATA ================= */
  companyForm = {
    countryId: null,
    stateId: null,
    districtId: null,
    cityId: null,
    pinCode: '',
    companyName: '',
    companyShortName: '',
    email: '',
    phone: '',
    mobile: '',
    gstin: '',
    pan: '',
    registrationDate: '',
    registerId: '',
    cin: '',
    address: '',
    spocName: '',
    spocEmail: '',
    spocMobile: ''
  };

  userList: any[] = [];

  companyTableList: any[] = [];

  tableData: any


  countryList = signal<any[]>([]);
  stateList: any[] = [];
  districtList: any[] = [];
  cityList: any[] = [];

  /* ================= SELECTIONS ================= */
  selectedCountryId: number | null = null;
  selectedStateId: number | null = null;
  selectedDistrictId: number | null = null;
  selectedCityId: number | null = null;

  /* ================= TABLE ================= */
  searchText = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  /* ================= INIT ================= */
  ngOnInit(): void {
    this.getCountryList();
    this.getCompanyList();
  }

  /* ================= USERS ================= */
  getAllUserList(): void {
    this.adminService.getUsers().subscribe(data => {
      this.userList = data ?? [];
    });
  }

  filteredUsers() {
    let users = this.userList.filter(user =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );

    if (!this.sortColumn) return users;

    return users.sort((a, b) => {
      const A = a[this.sortColumn];
      const B = b[this.sortColumn];
      return this.sortDirection === 'asc' ? A > B ? 1 : -1 : A < B ? 1 : -1;
    });
  }

  sortBy(column: string): void {
    this.sortDirection =
      this.sortColumn === column && this.sortDirection === 'asc'
        ? 'desc'
        : 'asc';

    this.sortColumn = column;
  }

  /* ================= COUNTRY ================= */
  getCountryList(): void {
    this.adminService.getCountries().subscribe(data => {
      this.countryList.set(data ?? []);
    });
  }

  onCountryChange(): void {
    if (!this.selectedCountryId) return;

    this.resetState();
    this.adminService
      .getStatesByCountryId(this.selectedCountryId)
      .subscribe(data => {
        this.stateList = data ?? [];
      });
  }

  /* ================= STATE ================= */
  onStateChange(): void {
    if (!this.selectedStateId) return;

    this.resetDistrict();
    this.adminService
      .getDistrictsByStateId(this.selectedStateId)
      .subscribe(data => {
        this.districtList = data ?? [];
      });
  }

  /* ================= DISTRICT ================= */
  onDistrictChange(): void {
    if (!this.selectedDistrictId) return;

    this.resetCity();
    this.adminService
      .getCitiesByDistrictId(this.selectedDistrictId)
      .subscribe(data => {
        this.cityList = data ?? [];
      });
  }

  /* ================= CITY ================= */
  onCityChange(): void {
    // Future use (pin code / area fetch)
  }

  /* ================= RESET HELPERS ================= */
  private resetState(): void {
    this.stateList = [];
    this.selectedStateId = null;
    this.resetDistrict();
  }

  private resetDistrict(): void {
    this.districtList = [];
    this.selectedDistrictId = null;
    this.resetCity();
  }

  private resetCity(): void {
    this.cityList = [];
    this.selectedCityId = null;
  }
  //   onSubmit(): void {
  //   const payload = {
  //     Country: this.selectedCountryId,
  //     State: this.selectedStateId,
  //     District: this.selectedDistrictId,
  //     City: this.selectedCityId,

  //     PinCode: this.companyForm.pinCode,
  //     Name: this.companyForm.companyName,
  //     companyShortName: this.companyForm.companyShortName,
  //     ContactEmail: this.companyForm.email,
  //     phone: this.companyForm.phone,
  //     ContactNo: this.companyForm.mobile,

  //     gstin: this.companyForm.gstin,
  //     PanCard: this.companyForm.pan,
  //     registrationDate: this.companyForm.registrationDate,
  //     RegistrationNo: this.companyForm.registerId,
  //     cin: this.companyForm.cin,
  //     AddressLine: this.companyForm.address,

  //     ContactPersonName: this.companyForm.spocName,
  //     spocEmail: this.companyForm.spocEmail,
  //     ContactPersonMobile: this.companyForm.spocMobile
  //   };

  //   console.log('Submitting Payload:', payload);

  //   this.adminService.registerCompany(payload).subscribe({
  //     next: (res) => {
  //       alert('✅ Company Registered Successfully');
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       alert('❌ Company Registration Failed');
  //       console.error(err);
  //     }
  //   });
  //  }

  onSubmit(): void {

  const formData = new FormData();

  formData.append('Country', String(this.selectedCountryId));
  formData.append('State', String(this.selectedStateId));
  formData.append('District', String(this.selectedDistrictId));
  formData.append('City', String(this.selectedCityId));

  formData.append('PinCode', this.companyForm.pinCode);
  formData.append('Name', this.companyForm.companyName);
  formData.append('Path', this.companyForm.companyShortName);

  formData.append('ContactEmail', this.companyForm.email);
  formData.append('ContactNo', this.companyForm.mobile);
  formData.append('MobileNo', this.companyForm.phone);

  formData.append('GSTIN', this.companyForm.gstin);
  formData.append('PanCard', this.companyForm.pan);
  formData.append('RegisterDate', this.companyForm.registrationDate);
  formData.append('RegistrationNo', this.companyForm.registerId);
  formData.append('CIN', this.companyForm.cin);

  formData.append('AddressLine', this.companyForm.address);

  formData.append('ContactPersonName', this.companyForm.spocName);
  formData.append('ContactPersonMobile', this.companyForm.spocMobile);
  formData.append('ContactPersonEmail', this.companyForm.spocEmail);

  if (this.gstFile) formData.append('GSTImage', this.gstFile);
  if (this.panFile) formData.append('PanCardImage', this.panFile);
  if (this.logoFile) formData.append('Logo', this.logoFile);
  if (this.profileFile) formData.append('ProfileImage', this.profileFile);

  console.log('FormData Ready');

  // 🔥 EDIT + CREATE LOGIC
  if (this.isEditMode) {

    this.adminService.updateCompany(this.editCompanyId, formData).subscribe({

      next: () => {
        alert('✅ Company Updated Successfully');

        this.isEditMode = false;
        this.editCompanyId = '';

        this.getCompanyList();
        this.resetForm();
      },

      error: (err) => {
        console.error(err);
      }

    });

  } else {

    this.adminService.registerCompany(formData).subscribe({

      next: () => {
        alert('✅ Company Registered Successfully');

        this.getCompanyList();
        this.resetForm();
      },

      error: (err) => {
        alert('❌ Company Registration Failed');
        console.error(err);
      }

    });

  }
}

  resetForm(): void {
    this.companyForm = {
      countryId: null,
      stateId: null,
      districtId: null,
      cityId: null,
      pinCode: '',
      companyName: '',
      companyShortName: '',
      email: '',
      phone: '',
      mobile: '',
      gstin: '',
      pan: '',
      registrationDate: '',
      registerId: '',
      cin: '',
      address: '',
      spocName: '',
      spocEmail: '',
      spocMobile: ''
    };

    this.selectedCountryId = null;
    this.selectedStateId = null;
    this.selectedDistrictId = null;
    this.selectedCityId = null;

    this.stateList = [];
    this.districtList = [];
    this.cityList = [];
  }


  getCompanyList() {
    this.adminService.getcompanyList().subscribe({
      next: (res: any) => {
        console.log('Company List:', res);
        this.tableData = res?.data
        this.tableData.unshift({
          name: this.companyForm.companyName,
          email: this.companyForm.email,
          contactNo: this.companyForm.mobile,
          country: this.selectedCountryId,
          state: this.selectedStateId,
          district: this.selectedDistrictId,
          city: this.selectedCityId,
          pinCode: this.companyForm.pinCode
        });
      },
      error: (err) => {
        console.error('Error fetching company list:', err);
      }
    })
  }
  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];

    if (type === 'gst') this.gstFile = file;
    if (type === 'pan') this.panFile = file;
    if (type === 'logo') this.logoFile = file;
    if (type === 'profile') this.profileFile = file;
  }
  viewCompany(data: any) {

    this.adminService.getCompnayById(data.id).subscribe({
      next: (res: any) => {
        console.log("Company Details by Id", res);
        this.router.navigate(['/admin/company-view'], {
          state: { company: res }
        });
      }
    })

  }

  editCompany(data: any) {
  console.log('Edit:', data);

  this.isEditMode = true;     // 🔥 ADD
  this.editCompanyId = data.id;  // 🔥 ADD

  this.companyForm.companyName = data.name;
  this.companyForm.mobile = data.contactNo;

  this.selectedCountryId = data.country;
  this.selectedStateId = data.state;
  this.selectedDistrictId = data.district;
  this.selectedCityId = data.city;

  this.companyForm.pinCode = data.pinCode;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  deleteCompany(index: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.tableData.splice(index, 1);
    }
  }

}
