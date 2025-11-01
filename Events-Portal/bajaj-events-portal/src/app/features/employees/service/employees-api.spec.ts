import { TestBed } from '@angular/core/testing';

import { EmployeesApi } from './employees-api';

describe('EmployeesApi', () => {
  let service: EmployeesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
