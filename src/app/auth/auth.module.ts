import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AuthRoutingModule } from './auth.routing.module';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RecaptchaModule } from 'ng-recaptcha';

import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        CommonModule,
        PasswordModule,
        ButtonModule,
        InputTextModule,

        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        RecaptchaModule,
        NgxCaptchaModule
    ],
    exports:[
    ]
    })
    export class AuthModule { }
