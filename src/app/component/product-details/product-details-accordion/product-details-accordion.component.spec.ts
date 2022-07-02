import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsAccordionComponent } from './product-details-accordion.component';

describe('ProductDetailsAccordionComponent', () => {
  let component: ProductDetailsAccordionComponent;
  let fixture: ComponentFixture<ProductDetailsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
