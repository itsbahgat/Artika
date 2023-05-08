import { Component, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { pay } from '../../pages/pay/pay.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent{

  @Input() customerID: string = '';
  @Input() total: any ;
  @ViewChild('payRef') payRef!: pay;
  
  paymentData = {
    amount : 0 ,
    //amount:Math.ceil(+this.total),
    currency: 'EGP',
    source: {
      object: 'card',
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: ''
    },
    description: ''
  };
  
  //possibleCurrencies = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "ISK", "JMD", "JPY", "KES", "KGS", "KHR", "KMF", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW"];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  
  onSubmit(): void {
    this.paymentData.amount = Math.ceil(+this.total);
    this.http.post('http://localhost:3005/stripe', this.paymentData)
      .subscribe((response) => {
        console.log("payment :",this.paymentData);
        let checkoutData = {
          customerId: this.customerID, 
          checkout:true
        };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.delete('http://localhost:3005/cart', { headers, body: checkoutData })
        .subscribe((res) => {
          console.log(res);
          alert('Your order was submitted');
          },
          (err) => {
            console.error('Error:', err);
            alert('Error: Please check over order again');
          });
      },
      (error) => {
        if (error.status !== 200) {
          console.error('Error:', error);
          alert('Error: Please check over your data again');
        }
      }
      );
  }

}