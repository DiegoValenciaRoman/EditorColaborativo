import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamoComponent } from './ramo.component';

describe('RamoComponent', () => {
  let component: RamoComponent;
  let fixture: ComponentFixture<RamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
