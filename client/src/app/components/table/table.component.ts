import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {

  tableData: any[] = [
    {
      customerName: 'Saeed Baik Chicken',
      Address: '01115555555',
      Title: 'XHSYUW100',
      quantity: 50,
      date:'12-6-2001',
      status: 'Absent'
    },
    {
      customerName: 'kmakel',
      Address: '01115555555',
      Title: 'XHSYUW100',
      quantity: 50,
      status: 'Absent'
    },
    {
      customerName: 'Ranooma el Amora',
      Address: '01115555555',
      Title: 'XHSYUW100',
      quantity: 50,
      date:'12-6-2001',
      status: 'present'
    },
    {
      customerName: 'noura noura',
      Address: '01115555555',
      Title: 'XHSYUW100',
      quantity: 50,
      date:'12-6-2001',
      status: 'Absent'
    },
    {
      customerName: 'Ranooma el Amora',
      Address: '01115555555',
      Title: 'XHSYUW100',
      quantity: 50,
      date:'12-6-2001',
      status: 'present'
    },
  ];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = Math.ceil(this.tableData.length/this.itemsPerPage);

  getStatusClass(status: string): string {
    console.log(status);
    const statusClasses = {
      absent: 'status status-absent',
      present: 'status status-present',
      late: 'status status-late'
    };
  
    status = status.toLowerCase();
    return statusClasses[status] || '';
  }
  
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getObjectValues(obj: any): any[] {
    return Object.values(obj);
  }

  get paginatedTableData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tableData.slice(startIndex, endIndex);
  }

  previousPage() {
    this.currentPage--;
  }
  
  nextPage() {
    this.currentPage++;
  }
  
}