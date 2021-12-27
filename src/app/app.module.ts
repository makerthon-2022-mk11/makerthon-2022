import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { MenuComponent } from './components/menu/menu.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

function initializeFirebase(): ModuleWithProviders<any>[] {
  const app = initializeApp(environment.firebaseConfig);
  return [
    provideFirebaseApp(() => app),
    provideFirestore(() =>
      initializeFirestore(app, { ignoreUndefinedProperties: true })
    ),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ];
}

@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    ...initializeFirebase(),
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    SuperTabsModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SplashScreen,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
