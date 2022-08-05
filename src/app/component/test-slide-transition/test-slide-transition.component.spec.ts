import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSlideTransitionComponent } from './test-slide-transition.component';

describe('TestSlideTransitionComponent', () => {
  let component: TestSlideTransitionComponent;
  let fixture: ComponentFixture<TestSlideTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSlideTransitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSlideTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
