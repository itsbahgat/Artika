import { Component, Input , ViewChild } from '@angular/core'
import { basket } from '../../pages/basket/basket.component';
import { AuthService } from '../../pages/services/authuser.service';
import { OrdersService } from '../../pages/services/orders.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.css'],
})
export class Orders {

}
