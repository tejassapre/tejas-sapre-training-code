import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistration } from './employee-registration';

describe('EmployeeRegistration', () => {
  let component: EmployeeRegistration;
  let fixture: ComponentFixture<EmployeeRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
