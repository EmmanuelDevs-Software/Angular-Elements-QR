import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { ScannerComponent } from './scanner.component';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor(
    private modalService: NgbModal
  ) { }

  /**
   * 
   * @param format 'QR_CODE' | 'DATA_MATRIX' | 'UPC_A' | 'EAN_8' | 'EAN_13' | 'CODE_128' | 
   * 'CODE_39' | 'RSS_14' | 'RSS_EXPANDED'
   */
  public async scan(format?: string | string[]): Promise<string> {
    if(!format) format = 'QR_CODE';
    return await this._scan(format);
  }


  private _scan(format: string | string[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const modalRef = this.modalService.open(ScannerComponent);
      (<ScannerComponent>modalRef.componentInstance).setData(format);

      modalRef.result.then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          console.error('Se ha producido un error al escanear el código: ', err);
          reject(err);
        });
    })
  }
}
