import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  constructor(private _router: Router) { }

  /* ===== SIDEBAR ===== */
  openMenu: string | null = null;
  selectedPage: string | null = null;

  toggle(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  moveTologin() {
    this._router.navigate(['/login']);
  }

  moveTo(route: any = '') {
    this._router.navigate(['/admin/company']);
  }

  moveToCocompany(route: any = '') {
    this._router.navigate(['/admin/cocompany']);
  }

  /* ===== PROFILE DROPDOWN (🔥 THIS WAS MISSING) ===== */
  showProfileMenu = false;

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this._router.navigate(['/login']);
  }
}
