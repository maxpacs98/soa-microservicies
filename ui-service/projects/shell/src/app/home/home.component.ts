import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  emailControl: FormControl = new FormControl(undefined, [Validators.email]);
  nameControl: FormControl = new FormControl(undefined, [Validators.minLength(3)]);
  matcher = new MyErrorStateMatcher();
  showNameInput = false;

  constructor(
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authenticate(): void {
    if (this.emailControl.valid) {
      this.authService.authenticate(this.emailControl.value)
        .pipe(take(1))
        .subscribe(res => {
          if (!res.customer) {
            this.showNameInput = true;
            this._snackBar.open('No account found. Please register.', '×', {
              panelClass: ['error'],
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              duration: 3000
            });

          } else {
            localStorage.setItem('user', JSON.stringify(res.customer));
            this.router.navigate(['/movie']);
          }
        })
    }
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.nameControl.hasError('email') ? 'Not a valid email' : '';
  }

  register(): void {
    if (this.emailControl.valid && this.nameControl.valid) {
      this.authService.register(this.emailControl.value, this.nameControl.value)
        .pipe(take(1)).subscribe(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/movie']);
      });
    }
  }
}
