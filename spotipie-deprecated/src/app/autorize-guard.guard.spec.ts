import { TestBed } from '@angular/core/testing';

import { AutorizeGuardGuard } from './autorize-guard.guard';

describe('AutorizeGuardGuard', () => {
  let guard: AutorizeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutorizeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
