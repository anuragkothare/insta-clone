import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaFormComponent } from './insta-form.component';

describe('InstaFormComponent', () => {
  let component: InstaFormComponent;
  let fixture: ComponentFixture<InstaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
