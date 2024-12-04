import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceParticipeComponent } from './annonce-participe.component';

describe('AnnonceParticipeComponent', () => {
  let component: AnnonceParticipeComponent;
  let fixture: ComponentFixture<AnnonceParticipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceParticipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceParticipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
