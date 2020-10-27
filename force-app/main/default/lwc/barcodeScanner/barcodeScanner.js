import { LightningElement, api, track } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class BarcodeScanner extends LightningElement {
    @api 
    scanImmediately;
    @api
    nextAfterScan;
    @api
    get barcode() {
        return this._barcode;
    }
    set barcode(value) {
        this._barcode = value;
        this.dispatchEvent(new FlowAttributeChangeEvent('barcode', this._barcode));        
    }
    _barcode;

    @track 
    scannerAvailable = undefined;

    scanner;

    connectedCallback() {
        this.scanner = getBarcodeScanner();        
        this.scannerAvailable = (this.scanner != null && this.scanner.isAvailable());  
        if(this.scannerAvailable && this.scanImmediately ) { 
            this.handleBeginScan(); 
        }      
    }

    handleBeginScan() {
        const scanningOptions = {
            barcodeTypes: [this.scanner.barcodeTypes.EAN_13]
        };
        this.scanner.beginCapture(scanningOptions)
        .then((result) => {
            console.log(result);
            this.barcode = result.value;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Successful Scan',
                    message: 'Barcode scanned successfully.',
                    variant: 'success'
                })
            );
            if(this.nextAfterScan) {
                this.dispatchEvent( new FlowNavigationNextEvent() );
            }
        })
        .catch((error) => {
            console.error(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Barcode Scanner Error',
                    message:
                        'There was a problem scanning the barcode: ' +
                        JSON.stringify(error) +
                        ' Please try again.',
                    variant: 'error',
                    mode: 'sticky'
                })
            );
        })
        .finally(() => {
            this.scanner.endCapture();
        });
    }

    barcodeManualChange(evt) {
        this.barcode = evt.target.value;
    }
}