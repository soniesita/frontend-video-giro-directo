import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagoSoportadoComponent } from './new-pago-soportado.component';

describe('NewPagoSoportadoComponent', () => {
  let component: NewPagoSoportadoComponent;
  let fixture: ComponentFixture<NewPagoSoportadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPagoSoportadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPagoSoportadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
