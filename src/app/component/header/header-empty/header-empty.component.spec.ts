import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEmptyComponent } from './header-empty.component';

describe('HeaderEmptyComponent', () => {
  let component: HeaderEmptyComponent;
  let fixture: ComponentFixture<HeaderEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
