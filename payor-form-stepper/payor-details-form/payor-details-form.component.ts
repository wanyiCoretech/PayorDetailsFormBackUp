import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { CommonService } from '@service/API/Common/common.service';
import { FormsService } from '../../../../../service/API/Forms/forms.service';
import { ValidationDialogComponent } from '../../../../reusable-components/dialog/validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomValidators } from '../../../../../model/custom-validator';


@Component({
  selector: 'app-payor-details-form',
  templateUrl: './payor-details-form.component.html',
  styleUrls: ['./payor-details-form.component.css']
})
export class PayorDetailsFormComponent {
  constructor(public fb: FormBuilder, public translateService: TranslateService, public commonService: CommonService, private dialog: MatDialog, private formsService: FormsService,) {


    this.payorForm = fb.group({
      "certNo": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "personCoverName": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "personCoverIC": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "participantName": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "participantIC": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "fullName": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "icNo": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "oldIc": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "dateOfBirth": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "nationality": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]], 
      "Relationship": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "occupation": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "mobile": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "residential": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "office": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "typeOfBusiness": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "nameOfEmployer": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "yearlyIncome": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "correspondenceAddress": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "address": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "postCode": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "state": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "country": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "saving": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]], 
      "epf": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "inheritance": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "investment": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "wealthOthers": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "otherSourceOfWealth": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]], 
      "otherSourceOfFund": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "Occupation": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "business": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "sales": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "dividend": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]], 
      "fundOthers": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]], 
      "sign1Date": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]], 
      "witnessName": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "witnessIc": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "sign2Date": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "payorName": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "sign3Date": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],
      "participantName1": [{ value: null, disabled: true }, [Validators.required, CustomValidators.noSpecialCharacters()]],






     
    });
  }

  valuesArray = [
    { "controlName": "certNo", "Text": "nomForm.column1" },
    { "controlName": "personCoverName", "Text": "nomForm.column2" },
    { "controlName": "participantName", "Text": "nomForm.column3" },
    { "controlName": "agentNameCode", "Text": "nomForm.column4" }
  ]
  status_code: number;
  payorForm: FormGroup;
  langChangeSubscription: Subscription;

  @Input() isMove: boolean;
  @Output() checkedValidate: EventEmitter<any> = new EventEmitter();
  ngOnChanges() {
    if (this.isMove && this.isMove === true) {
      if (this.commonService.markAsTouched(this.payorForm)) this.checkedValidate.emit(true);
      else this.checkedValidate.emit(false);
    }
  }


  ngOnInit() {
    this.userControl();
  }


  onSubmit() {

    if (this.payorForm.valid) {
      console.log(this.payorForm.value);
    } else {
      console.log(this.payorForm.value);
      this.formsService.markControlAsTouched(this.payorForm);
      const invalidFields2 = this.formsService.findInvalidFields(this.payorForm);
      const invalidFieldsWithText = this.formsService.mapControlName(invalidFields2, this.valuesArray);
      const dialogRef = this.dialog.open(ValidationDialogComponent, {
        data: {
          invalidFields: invalidFieldsWithText
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed');
      });
    }

  }


  witnessSign: any = null;
  payorSign: any = null;
  participantSign: any = null;
  signature(signatureimage) {
    var value = signatureimage.split("|");
    console.log(value[1])
    switch (value[0]) {
      case "witnessSign": this.witnessSign = value[1];
        this.payorForm.get("sign1").setValue(this.witnessSign);
        break;
      case "payorSign": this.payorSign = value[1];
        this.payorForm.get("sign2").setValue(this.payorSign);
        break;
      case "participantSign": this.participantSign = value[1];
        this.payorForm.get("sign3").setValue(this.participantSign);
        break;
    }
  }

  Resign(sign) {
    switch (sign) {
      case "witnessSign": this.witnessSign = null;
        break;
      case "payorSign": this.payorSign = null;
        break;
      case "participantSign": this.participantSign = null;
        break;
    }
    document.getElementById("img" + sign).style.display = "none";
    document.getElementById("div" + sign).style.display = "";
  }

  userControl() {
    //var dtTokenLinkDtls = this.common.getSess("dtTokenLinkDtls")[0];
    //var dtFormDtls = this.common.getSess("dtFormDtls");
    //this.status_code = dtFormDtls[0]["status_code"];
    //dtTokenLinkDtls["user_group"] = 'CH';//TEST Cert Holder
    //dtTokenLinkDtls["user_group"] = 'RQ';
    let dtTokenLinkDtls: { user_group: string } = { user_group: 'CH' };;
    this.status_code = 0;

    if (dtTokenLinkDtls["user_group"] == 'RQ' && this.status_code == 0) {
      console.log('RQ 0');
      this.payorForm.get('certNo').enable();
      this.payorForm.get('personCoverName').enable();
      this.payorForm.get('personCoverIC').enable();
      this.payorForm.get('participantName').enable();
      this.payorForm.get('participantIC').enable();
      this.payorForm.get('fullName').enable();
      this.payorForm.get('icNo').enable();
      this.payorForm.get('oldIc').enable();
      this.payorForm.get('dateOfBirth').enable();
      this.payorForm.get('nationality').enable();
      this.payorForm.get('Relationship').enable();
      this.payorForm.get('occupation').enable();
      this.payorForm.get('mobile').enable();
      this.payorForm.get('residential').enable();
      this.payorForm.get('office').enable();
      this.payorForm.get('typeOfBusiness').enable();
      this.payorForm.get('nameOfEmployer').enable();
      this.payorForm.get('yearlyIncome').enable();
      this.payorForm.get('correspondenceAddress').enable();
      this.payorForm.get('address').enable();
      this.payorForm.get('postCode').enable();
      this.payorForm.get('state').enable();
      this.payorForm.get('country').enable();
      this.payorForm.get('saving').enable();
      this.payorForm.get('epf').enable();
      this.payorForm.get('inheritance').enable();
      this.payorForm.get('investment').enable();
      this.payorForm.get('wealthOthers').enable();
      this.payorForm.get('otherSourceOfWealth').enable();
      this.payorForm.get('otherSourceOfFund').enable();
      this.payorForm.get('Occupation').enable();
      this.payorForm.get('business').enable();
      this.payorForm.get('sales').enable();
      this.payorForm.get('dividend').enable();
      this.payorForm.get('fundOthers').enable();
      this.payorForm.get('sign1Date').enable();
      this.payorForm.get('witnessName').enable();
      this.payorForm.get('witnessIc').enable();
      this.payorForm.get('sign2Date').enable();
      this.payorForm.get('payorName').enable();
      this.payorForm.get('sign3Date').enable();
      this.payorForm.get('participantName1').enable();
    }
    //Cert Holder
    else if (dtTokenLinkDtls["user_group"] == 'CH') {
      console.log('CH');

      this.payorForm.get('certNo').enable();
      this.payorForm.get('personCoverName').enable();
      this.payorForm.get('personCoverIC').enable();
      this.payorForm.get('participantName').enable();
      this.payorForm.get('participantIC').enable();
      this.payorForm.get('fullName').enable();
      this.payorForm.get('icNo').enable();
      this.payorForm.get('oldIc').enable();
      this.payorForm.get('dateOfBirth').enable();
      this.payorForm.get('nationality').enable();
      this.payorForm.get('Relationship').enable();
      this.payorForm.get('occupation').enable();
      this.payorForm.get('mobile').enable();
      this.payorForm.get('residential').enable();
      this.payorForm.get('office').enable();
      this.payorForm.get('typeOfBusiness').enable();
      this.payorForm.get('nameOfEmployer').enable();
      this.payorForm.get('yearlyIncome').enable();
      this.payorForm.get('correspondenceAddress').enable();
      this.payorForm.get('address').enable();
      this.payorForm.get('postCode').enable();
      this.payorForm.get('state').enable();
      this.payorForm.get('country').enable();
      this.payorForm.get('saving').enable();
      this.payorForm.get('epf').enable();
      this.payorForm.get('inheritance').enable();
      this.payorForm.get('investment').enable();
      this.payorForm.get('wealthOthers').enable(); 
      this.payorForm.get('otherSourceOfWealth').enable();
      this.payorForm.get('otherSourceOfFund').enable();
      this.payorForm.get('Occupation').enable();
      this.payorForm.get('business').enable();
      this.payorForm.get('sales').enable();
      this.payorForm.get('dividend').enable();
      this.payorForm.get('fundOthers').enable();
      this.payorForm.get('sign1Date').enable();
      this.payorForm.get('witnessName').enable();
      this.payorForm.get('witnessIc').enable();
      this.payorForm.get('sign2Date').enable();
      this.payorForm.get('payorName').enable();
      this.payorForm.get('sign3Date').enable();
      this.payorForm.get('participantName1').enable();

    }
    else {
      console.log('other');
    }

  }

}
