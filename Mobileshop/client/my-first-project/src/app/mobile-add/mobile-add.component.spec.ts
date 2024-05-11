import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAddComponent } from './mobile-add.component';

describe('MobileAddComponent', () => {
  let component: MobileAddComponent;
  let fixture: ComponentFixture<MobileAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
