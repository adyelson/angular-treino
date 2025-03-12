import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaalunosComponent } from './mediaalunos.component';

describe('MediaalunosComponent', () => {
  let component: MediaalunosComponent;
  let fixture: ComponentFixture<MediaalunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaalunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaalunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
