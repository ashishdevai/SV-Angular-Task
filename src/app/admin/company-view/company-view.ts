import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-view.html',
  styleUrl: './company-view.css',
})
export class CompanyView implements OnInit {

  companyData: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {

    // 🔥 Backend response check
    this.companyData = history.state?.company;

    console.log('🔥 Full Company Response:', this.companyData);

    // 🔥 Agar user page refresh kare to redirect (best practice)
    if (!this.companyData) {
      alert('No company data found');
      this.router.navigate(['/admin/company']);
    }

    // 🔥 Contact fields check karne ke liye
    console.log('Contact No:', this.companyData?.contactNo);
    console.log('Mobile No:', this.companyData?.mobileNo);
    console.log('Contact Person:', this.companyData?.contactPersonName);
    console.log('Contact Email:', this.companyData?.contactPersonEmail);
    console.log('Contact Mobile:', this.companyData?.contactPersonMobile);
  }
}
