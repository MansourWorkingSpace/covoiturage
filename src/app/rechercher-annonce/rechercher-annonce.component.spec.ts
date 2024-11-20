import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherAnnonceComponent } from './rechercher-annonce.component';

describe('RechercherAnnonceComponent', () => {
  let component: RechercherAnnonceComponent;
  let fixture: ComponentFixture<RechercherAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercherAnnonceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercherAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
