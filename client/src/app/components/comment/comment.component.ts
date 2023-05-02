import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../pages/services/product.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class commentComponent {
  @Input() productId: string;
  @Input() customerId: string;
  @Output() commentSubmitted = new EventEmitter();

  comment: string;
  rating: number;

  constructor(private productService: ProductService) { }

  public submit() {
    this.submitComment();
  }

  submitComment() {
    const rating = (<HTMLInputElement>document.querySelector('input[name="rating"]:checked')).value;
    const comment = document.querySelector('textarea').value;

    console.log('-----Comment Component-----');
    console.log('Product:', this.productId);
    console.log('Customer:', this.customerId);
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    console.log('----------------------------');

    // Send the comment data to the server using the ProductService
    this.productService.submitProductReview(this.productId, this.customerId, parseInt(rating), comment)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Comment submitted successfully:', response);
        // Reset the form after successful submission
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => {
          (<HTMLInputElement>input).checked = false;
        });
        document.querySelector('textarea').value = '';

        // Emit the event to notify the parent component that the comment has been submitted
        this.commentSubmitted.emit();
      });
  }
}
