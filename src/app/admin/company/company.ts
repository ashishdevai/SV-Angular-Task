import { Component, OnInit } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company',
  imports: [CommonModule, FormsModule],
  templateUrl: './company.html',
  styleUrl: './company.css',
})
export class Company implements OnInit {

  constructor(private admin: Admin) { }
  userList: any[] = [];
  searchText = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  ngOnInit(): void {
    this.getAllUserList();

  }

  getAllUserList() {
    this.admin.getUsers().subscribe((data: any) => {
      console.log("User List:", data);
      this.userList = data;
    });
  }

  filteredUsers() {
    let users = this.userList.filter(user =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );

    if (this.sortColumn) {
      users.sort((a: any, b: any) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return users;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

}
