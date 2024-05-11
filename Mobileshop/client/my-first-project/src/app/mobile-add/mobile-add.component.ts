import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MobileService } from '../shared/services/mobile.service';

@Component({
  selector: 'app-mobile-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mobile-add.component.html',
  styleUrl: './mobile-add.component.scss'
})
export class MobileAddComponent implements OnInit{
  mobileaddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mobileService: MobileService
  ) { }

  ngOnInit() {
    this.mobileaddForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      modelName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      inStock: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.mobileaddForm.valid) {
      console.log('Form data:', this.mobileaddForm.value);
      this.mobileService.register(this.mobileaddForm.value).subscribe({
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


