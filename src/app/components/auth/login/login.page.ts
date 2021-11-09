import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/model/user/user-credentials';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenService } from 'src/app/service/auth/token/token.service';
import { MessageService } from 'src/app/shared/utils/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formUser: FormGroup;
  user: UserCredentials;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formUser = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })
  }

  login() {
    this.user = this.formUser.value;
    this.authService.login(this.user)
    .subscribe(
      async result => {
        this.tokenService.setToken(result.token);
        this.messageService.showMessage('¡Bienvenido!', '');
        this.formUser.reset();
        this.router.navigate(['/home/guild']);
      },
      fail => {
        this.messageService.showMessage('Algo salio mal', fail.error.message);
      }
    );
  }

}
