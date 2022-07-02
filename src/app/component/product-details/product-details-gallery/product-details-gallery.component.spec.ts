import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsGalleryComponent } from './product-details-gallery.component';

describe('ProductDetailsGalleryComponent', () => {
  let component: ProductDetailsGalleryComponent;
  let fixture: ComponentFixture<ProductDetailsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
