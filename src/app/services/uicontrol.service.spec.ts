import { TestBed } from '@angular/core/testing';

import { UIControlService } from './uicontrol.service';

describe('UIControlService', () => {
  let service: UIControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial cart visibility set to false', (done) => {
    service.getCartVisiblity().subscribe((visible) => {
      expect(visible).toBeFalse();
      done();
    });
  });

  it('should set cart visibility to true', (done) => {
    service.setCartVisibility(true);
    service.getCartVisiblity().subscribe((visible) => {
      expect(visible).toBeTrue();
      done();
    });
  });

  it('should set cart visibility to false', (done) => {
    service.setCartVisibility(false);
    service.getCartVisiblity().subscribe((visible) => {
      expect(visible).toBeFalse();
      done();
    });
  });

  it('cartVisible$ should emit true after setting visibility to true', (done) => {
    service.setCartVisibility(true);
    service.cartVisible$.subscribe((visible) => {
      expect(visible).toBeTrue();
      done();
    });
  });

  it('cartVisible$ should emit false after setting visibility to false', (done) => {
    service.setCartVisibility(false);
    service.cartVisible$.subscribe((visible) => {
      expect(visible).toBeFalse();
      done();
    });
  });
});
