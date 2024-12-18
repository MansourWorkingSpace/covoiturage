import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgImageComponent } from './bg-image.component';

describe('BgImageComponent', () => {
  let component: BgImageComponent;
  let fixture: ComponentFixture<BgImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
