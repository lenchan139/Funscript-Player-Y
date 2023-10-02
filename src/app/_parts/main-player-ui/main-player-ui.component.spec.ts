import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPlayerUiComponent } from './main-player-ui.component';

describe('MainPlayerUiComponent', () => {
  let component: MainPlayerUiComponent;
  let fixture: ComponentFixture<MainPlayerUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPlayerUiComponent]
    });
    fixture = TestBed.createComponent(MainPlayerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
