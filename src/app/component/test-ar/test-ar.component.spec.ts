import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestARComponent } from './test-ar.component';

describe('TestARComponent', () => {
  let component: TestARComponent;
  let fixture: ComponentFixture<TestARComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestARComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
