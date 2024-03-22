import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TypeMessage } from '../../type/message/type-message';

@Injectable()
export class MessageService {

  private classTypesMessage = {
    success: 'snackbar-container-success',
    error: 'snackbar-container-error'
  }

  private durationMessage: number = 5 * 1000;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  showMessage(message: string, typeMessage: TypeMessage, labelAction: string = '') {
    this.snackBar.open(message, labelAction, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationMessage,
      panelClass: this.classTypesMessage[typeMessage]
    });
  }
}
