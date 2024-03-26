import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let snackbar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {

    snackbar = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: MatSnackBar, useValue: snackbar }
      ]
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showMessage', () => {

    service.showMessage('mensagem', 'success');

    expect(snackbar.open).toHaveBeenCalled();
  });
});
