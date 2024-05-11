import { Component } from '@angular/core';
import { Review } from '../shared/model/Review';
import { ReviewService } from '../shared/services/review.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  reviews!: Review[];

  columns = ['review', 'modelName', 'name', 'date'];

  constructor(
    private reviewService: ReviewService,

  ) { }

  ngOnInit() {
    this.reviewService.getAll().subscribe({
      next: (data) => {
        this.reviews = data;
        console.log(this.reviews);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

}
