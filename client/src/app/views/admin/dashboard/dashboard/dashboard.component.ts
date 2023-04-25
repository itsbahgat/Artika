import { Component,OnInit } from '@angular/core';
import { CustomerAdminService } from 'src/app/views/services/customer-admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  counter: any;
  constructor(private cutomerAdminService: CustomerAdminService) {

   }
  ngOnInit(): void {
    this.cutomerAdminService.gettAllCutomers().subscribe(data => {
      const customArray = Object.values(data);
      this.counter = customArray.length;
    });
  }
}
