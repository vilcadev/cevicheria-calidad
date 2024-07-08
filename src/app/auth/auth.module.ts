import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AuthRoutingModule } from './auth.routing.module';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
    RecaptchaModule,
    RECAPTCHA_SETTINGS,
    RecaptchaSettings,
    RecaptchaFormsModule,
    RECAPTCHA_V3_SITE_KEY,
    RecaptchaV3Module,
  } from 'ng-recaptcha';

const RECAPTCHA_V3_STACKBLITZ_KEY = '6LfFafopAAAAANolx7HDtr4rV4o0r4O6AhM-rZsG';
const RECAPTCHA_V2_DUMMY_KEY = '6LfFafopAAAAAK2sG6brLQSyftWRBUABkd2rFj1C';

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
        RecaptchaFormsModule,
        RecaptchaV3Module,
    ],
    exports:[
    ],
    providers: [
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: RECAPTCHA_V3_STACKBLITZ_KEY,
        },
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: {
            siteKey: RECAPTCHA_V2_DUMMY_KEY,
          } as RecaptchaSettings,
        },
      ],
    })
    export class AuthModule { }
