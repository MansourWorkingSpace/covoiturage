import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerVehiculesComponent } from './editer-vehicules.component';

describe('EditerVehiculesComponent', () => {
  let component: EditerVehiculesComponent;
  let fixture: ComponentFixture<EditerVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerVehiculesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
