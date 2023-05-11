import { Component, Input, ViewChild } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { pay } from "../../pages/pay/pay.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent {
  @Input() customerID: string = "";
  @Input() total: any;
  @ViewChild("payRef") payRef!: pay;

  paymentData = {
    amount: 0,
    currency: "USD",
    source: {
      object: "Visa",
      number: "",
      exp_month: 0,
      exp_year: 0,
      cvc: "",
    },
    description: "description",
  };

  isLoading: boolean = false; // Flag to indicate loading state

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.isLoading = true; // Set loading state to true

    this.paymentData.amount = Math.ceil(+this.total);
    this.paymentData.source.exp_month = Number(
      this.paymentData.source.exp_month
    );
    this.paymentData.source.exp_year = Number(this.paymentData.source.exp_year);

    this.http.post("http://localhost:3005/stripe", this.paymentData).subscribe(
      (response) => {
        console.log("payment :", this.paymentData);
        const checkoutData = {
          customerId: this.customerID,
          checkout: true,
        };
        const headers = new HttpHeaders().set(
          "Content-Type",
          "application/json"
        );

        this.http
          .delete("http://localhost:3005/cart", { headers, body: checkoutData })
          .subscribe(
            (res) => {
              console.log(res);
              alert("Your order was submitted");
              this.router.navigate(["/"]); // Redirect to success page
            },
            (err) => {
              console.error("Error:", err);
              alert("Error: Please check your order again");
            }
          );
      },
      (error) => {
        if (error.status !== 200) {
          console.error("Error:", error);
          alert("Error: Please check your data again");
        }
      },
      () => {
        this.isLoading = false; // Set loading state to false after HTTP request completes
      }
    );
  }
}
