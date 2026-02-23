import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Dashboard } from './dashboard/dashboard';
import { Company } from './company/company';
import { CoCompany } from './co-company/co-company';
import { CompanyView } from './company-view/company-view'; // ✅ ADD

export const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'company', component: Company },
      { path: 'cocompany', component: CoCompany },

      // 🔥 YAHI ADD KARNA HAI
      { path: 'company-view', component: CompanyView }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
