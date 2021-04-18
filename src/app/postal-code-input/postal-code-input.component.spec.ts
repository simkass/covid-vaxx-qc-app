import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalCodeInputComponent } from './postal-code-input.component';

describe('PostalCodeInputComponent', () => {
  let component: PostalCodeInputComponent;
  let fixture: ComponentFixture<PostalCodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostalCodeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostalCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
