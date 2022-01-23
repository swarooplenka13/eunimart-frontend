import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { FillComponent } from './fill/fill.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { MatFormFieldModule } from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CreateComponent } from './create/create.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatTableModule} from '@angular/material/table';
import{MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ContentComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    FillComponent,
    ShowdataComponent,
    CreateComponent,
    AdminloginComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AngularFireStorageModule,
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '986178145547-2tg1o35dnnn5hkfr7o92ncs01kgm5fdm.apps.googleusercontent.com'
            )
          }]
      } as SocialAuthServiceConfig,
    },
    RegisterComponent,
    CreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
