import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Role } from 'src/app/model/rol/role.model';
import { User } from 'src/app/model/user/user';
import { FormValidator } from 'src/app/model/validator/form-validator';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MessageService } from 'src/app/shared/utils/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formUser: FormGroup;
  user: User;
  rols = [
    { role: Role.ADVENTURER, description: 'Aventurero'},
    { role: Role.MASTER, description: 'Maestro de Gremio'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formUser = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      confirmPassword: ['', [
        Validators.minLength(5)
      ]],
      roles: [this.rols[0].role, Validators.required],
      birthDay: [this.getActualDate()]
    }, {
      validators: FormValidator.samePasswords
    });
  }

  register() {
    this.user = this.formUser.value;
    this.user.birthDay = this.formatDate(this.user.birthDay);
    this.authService.register(this.user)
    .subscribe(
      async result => {
        await this.messageService.showMessage('Has sido registrado', 'Inicia sesión');
        this.router.navigate(['/auth/login'])
      },
      async fail => {
        await this.messageService.showMessage('Algo salio mal', fail.error.message);
      }
    );
  }

  getActualDate(): string {
    return this.formatDate(moment().toString());
  }

  formatDate(date: string): string{
    return moment(new Date(date)).format('DD/MM/YYYY')
  } 
}
