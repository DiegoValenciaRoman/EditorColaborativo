import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPadComponent } from './mi-pad.component';

describe('MiPadComponent', () => {
  let component: MiPadComponent;
  let fixture: ComponentFixture<MiPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
