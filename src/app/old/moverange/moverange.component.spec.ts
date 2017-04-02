import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverangeComponent } from './moverange.component';

describe('MoverangeComponent', () => {
  let component: MoverangeComponent;
  let fixture: ComponentFixture<MoverangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoverangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
