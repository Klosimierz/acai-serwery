import { TestBed } from '@angular/core/testing';

import { CrudServices} from './crud-services.service';

describe('CrudServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudServices = TestBed.get(CrudServices);
    expect(service).toBeTruthy();
  });
});
