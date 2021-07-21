import { QrScannerService } from './qr-scanner.service';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'my-popup',
  template: `
  <zxing-scanner 
(scanSuccess)="onScanSuccess($event)"
(scanError)="onScanError($event)"
(permissionResponse)="hasPermission($event)"
[formats]="formats"
></zxing-scanner>
<div class="col-6 text-center mx-auto">
  <button class="btn" (click)="scanBar()">ScanBarCode</button>
</div>
<div class="col-12 text-center mx-auto mt-2">
  <h3>Este es el resultado de escanear el código: {{ data }}</h3>
</div>
  `,
  host: {
    '[@state]': 'state',
  },
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateY(0%)'})),
      state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ])
  ],
  styles: [`
  :host zxing-scanner::ng-deep video {
    max-height: 50vh;    
    object-fit: contain;
}
:host zxing-scanner::ng-deep {
    border-style: solid;
    border-color: #5d78ff;
} 
  `]
})
export class ScannerComponent  {

  formats: string[] = [];
  formatReader: any;

  setData(format: string | string[]) {
    if (typeof format === 'string') {
      this.formats.push(format);
      this.formatReader = format;
    } else {
      this.formats = format;
      this.formatReader = format;
    };
  }
  data: string;
  qrCodeData: string;
  barCodeData: string;
  barFormat: string;
  barFormatArray: string[] = ['CODE128', 'CODE128A', 'CODE128B', 'CODE128C', 'EAN13', 'EAN8', 'EAN5', 'EAN2', 'UPC',
  'CODE39', 'ITF14', 'ITF', 'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110', 'pharmacode', 'codabar'];
  activeQrGenerate: boolean = false;
  activeBarGenerate: boolean = false;

  constructor(private qrScanService: QrScannerService,
    private activeModal: NgbActiveModal
    ) {
      console.log('format', this.formatReader)
    }

  private barCodeFormats: string[] = ['DATA_MATRIX', 'UPC_E', 'UPC_A', 'EAN_8', 'EAN_13', 'CODE_128',
    'CODE_39', 'CODE_93', 'CODABAR', 'ITF', 'MAXICODE', 'RSS_14', 'RSS_EXPANDED', 'PDF_417', 'AZTEC'];

  public scanQr() {
    this.scan('QR_CODE', 'QR');
  }

  public scanBar() {
    this.scan(this.barCodeFormats, 'BAR');
  }

  private scan(format: string | string[], text) {
    this.qrScanService.scan(format)
      .then((res) => {
        this.data = res;
        console.log(`Esto es el resultado del código ${text}: ${this.data}`);
      })
      .catch((err) => console.error('Error al escanear: ', err));
  }

  onScanSuccess($event: any) {
    this.close($event);
  }

  onScanError($event: any){
    console.error('Se ha producido un error al escanear el código: ', $event);
    this.close();
  }

  hasPermission(permission: boolean){
    if(!permission){
      this.close();
    }
  }

  private close(data?: any) {
    this.activeModal.close(data);
  }
}
