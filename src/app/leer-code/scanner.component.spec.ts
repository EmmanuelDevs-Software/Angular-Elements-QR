// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { ScannerComponent } from './scanner.component';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { TestBed, ComponentFixture, async } from '@angular/core/testing';

// const textQr = 'This is example text from QrCode';
// let result: any;

// class MockNgbActiveModal {
//   result: any;
//   close(res?: any) {
//     result = res;
//   }
// }

// describe('ScannerComponent', () => {
//   let component: ScannerComponent;
//   let fixture: ComponentFixture<ScannerComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         ZXingScannerModule
//       ],
//       providers: [
//         { provide: NgbActiveModal, useClass: MockNgbActiveModal }
//       ],
//       declarations: [ScannerComponent]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ScannerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('call scanSuccess for qrCode', () => {
//     component.onScanSuccess(textQr);
//     expect(result).toEqual(textQr);
//   });

//   it('call scanError', () => {
//     component.onScanError('Can`t scan code');
//     expect(result).toBeUndefined();
//   });
// });
