import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReviewService } from '../shared/services/review.service';

@Component({
  selector: 'app-review-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './review-add.component.html',
  styleUrl: './review-add.component.scss'
})
export class ReviewAddComponent {
  reviewaddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //private location: Location,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.reviewaddForm = this.formBuilder.group({
      review: ['', [Validators.required]],
      modelName: ['',[Validators.required]],
      name: ['',],
      //date: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.reviewaddForm.valid) {
      console.log('Form data:', this.reviewaddForm.value);
      this.reviewService.create(this.reviewaddForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

}
