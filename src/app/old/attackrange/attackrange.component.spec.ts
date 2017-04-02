import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackrangeComponent } from './attackrange.component';

describe('AttackrangeComponent', () => {
  let component: AttackrangeComponent;
  let fixture: ComponentFixture<AttackrangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackrangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
