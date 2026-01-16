import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoCompany } from './co-company';

describe('CoCompany', () => {
  let component: CoCompany;
  let fixture: ComponentFixture<CoCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoCompany);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
