# Lightning Web Component for Scanning Barcodes in a Flow

This a Lightning Web Component (LWC) for scanning a barcode in a Flow
from the Salesforce Mobile App.  It uses the 
[BarcodeScanner mobile capability](https://releasenotes.docs.salesforce.com/en-us/winter21/release-notes/rn_lwc_barcodescanner.htm) 
available (as beta) the Winter'21 release.

## Installing in your org

Use sfdx to deploy the LWC into your org:
```
git clone https://github.com/mieckert/lwc-barcode-flow.git
cd lwc-barcode-flow
sfdx force:auth:web:login --set-alias <alias>
sfdx force:source:deploy -u <username_or_alias> -o ./force-app
```

## Using the component

The component can only be used in a (Lightning) Flow.  It provides configuration parameters
to 
- control whether the user needs to first click the scan button or it starts automatically
  when the flow screen it is placed on is being opened as well as and
- control whether after scanning the flow screen automatically goes to the next screen or stays
  on the current screen
The component has single output value containing the scanned barcode

Currently the component is set up to scan EAN-13 codes.  To scan other codes, you have to modifiy
the source code.  (This should be a configuration parameter in the next version...)

If you are not in the Salesforce Mobile App or it is for some other reason impossible to
access the barcode scanning functionality, the component displays a simple text box for manual
input of the code.  Note that there is currently no validation on the manual input.

## TODO
- [ ] Add configuration parameter for setting the type of the code (currently fixed to EAN-13)
- [ ] Validation of manual input (EAN checksums etc.)
