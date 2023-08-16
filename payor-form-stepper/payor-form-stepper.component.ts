import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { LoadingDialogComponentComponent } from '@reusable/loading-dialog-component/loading-dialog-component.component';

@Component({
  selector: 'app-payor-form-stepper',
  templateUrl: './payor-form-stepper.component.html',
  styleUrls: ['./payor-form-stepper.component.css']
})
export class PayorFormStepperComponent {
  constructor(private fb: FormBuilder,
    public dialog: MatDialog, private cdr: ChangeDetectorRef,) {
    this.stepGroups.push(this.stepValid1, this.stepValid2, this.stepValid3);

    if (this.isLinear === true) {
      this.stepGroups.forEach(item => {
        item.setErrors({ "required": true });
      })
    }
  }
  stepperSURR: any[] = ['Payor Details Form'];
  isLinear = true;
  stepGroups: FormControl[] = [];
  stepValid1 = new FormControl('');
  stepValid2 = new FormControl('');
  stepValid3 = new FormControl('');
  ngOnInit() {

  }

  @ViewChild('stepper') stepper: MatStepper;
  ngAfterViewInit() {

  }

  onStepChange(stepper) {

    const dialogRef = this.dialog.open(LoadingDialogComponentComponent, {
      disableClose: true,
      panelClass: 'loading-dialog'
    });

    setTimeout(() => {
      this.isMove = true;
      this.cdr.detectChanges();
    })
    this.moveDirection = this.onStepChange.name; // Assign function name in order to move after check mandatory from child component

    dialogRef.close(); // when finish changed, it will close the spinner dialog
  }

  isMove: boolean = false;
  moveDirection: string;
  goBack(stepper: MatStepper) {
    setTimeout(() => {
      this.isMove = true;
      this.cdr.detectChanges();
    })
    this.moveDirection = this.goBack.name; // Assign function name in order to move after check mandatory from child component

  }

  goForward(stepper: MatStepper) {
    setTimeout(() => {
      this.isMove = true;
      this.cdr.detectChanges();
    })
    this.moveDirection = this.goForward.name; // Assign function name in order to move after check mandatory from child component

  }

  validMove(checkValidate?: boolean) {
    setTimeout(() => {
      this.isMove = false;
      this.cdr.detectChanges();
    })

    // After validate the argument is true, decide which way to move
    if (this.moveDirection === 'goForward' && checkValidate && checkValidate === true) {

      this.stepGroups.forEach((item, index) => {
        if (this.stepper.selectedIndex === index) item.reset();
      })

      window.scrollTo(0, 0);
      this.stepper.next();
    }
    else if (this.moveDirection === 'goBack') {

      window.scrollTo(0, 0);
      this.stepper.previous();
    }
    else if (this.moveDirection === 'onStepChange') {
      this.stepGroups.forEach((item, index) => {
        if (index >= this.stepper.selectedIndex) item.setErrors({ "required": true });
      })
    }
  }
}
