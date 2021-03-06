import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArComponent } from './ar.component';

describe('ArComponent', () => {
  let component: ArComponent;
  let fixture: ComponentFixture<ArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
