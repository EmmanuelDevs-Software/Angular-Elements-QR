import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BarCodeGenerateComponent } from './bar-code-generate/bar-code-generate.component';
import { QrCodeGenerateComponent } from './qr-code-generate/qr-code-generate.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './leer-code/scanner.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { QrScannerService } from './leer-code/qr-scanner.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QrCodeGenerateReadComponent } from './qr-code-read/qr-code-generate-read.component';
@NgModule({
  entryComponents: [
    AppComponent,
    BarCodeGenerateComponent,
    QrCodeGenerateComponent,
    ScannerComponent 
  ],
  declarations: [
    AppComponent,
    BarCodeGenerateComponent,
    QrCodeGenerateComponent,
    ScannerComponent ,
   
  ],
  imports: [BrowserModule, AppRoutingModule, ZXingScannerModule,  NgQrScannerModule],
  providers: [
    QrScannerService,
    NgbActiveModal,
  ],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elBarCode = createCustomElement(BarCodeGenerateComponent, {
      injector: this.injector,
    });
    customElements.define('barcode-elements', elBarCode);

    const elQrCode = createCustomElement(QrCodeGenerateComponent, {
      injector: this.injector,
    });
    customElements.define('qrcode-elements', elQrCode);

    const elReadCode = createCustomElement(ScannerComponent, {
      injector: this.injector,
    });
    customElements.define('readcode-elements', elReadCode);

    const elReadQr = createCustomElement(QrCodeGenerateReadComponent, {
      injector: this.injector,
    });
    customElements.define('readqr-elements', elReadQr);
  }


}
