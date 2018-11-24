import { TestBed, inject } from '@angular/core/testing';

import { SocketServiciosService } from './socket-servicios.service';

describe('SocketServiciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketServiciosService]
    });
  });

  it('should be created', inject([SocketServiciosService], (service: SocketServiciosService) => {
    expect(service).toBeTruthy();
  }));
});
