import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MainpageModule } from './pages/mainpage/mainpage.module';
import { ApiConfigurationService } from './services/api-configuration.service';
import { MovieDetailsModule } from './pages/movie-details/movie-details.module';
import { HeaderModule } from './components/header/header.module';
import { TvDetailsModule } from './pages/tv-details/tv-details.module';
import { RatingService } from './services/rating.service';
import { NotificationModule } from './components/notifications/notifications.module';
import { ratingInitializerFactory } from './factories/rating-initializer.factory';
import { configInitializerFactory } from './factories/config-initializer.factory';
import { PersonDetailsModule } from './pages/person-details/person-details.module';
import { CastPageModule } from './pages/cast-page/cast-page.module';
import { userInfoInitializerFactory } from './factories/user-info-initializer.factory';
import { UserInfoService } from './services/user-info.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserInfoInterceptor } from './interceptors/user-info.interceptor';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { AuthorizationService } from './services/authorization.service';

@NgModule({
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializerFactory,
      deps: [ApiConfigurationService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: userInfoInitializerFactory,
      deps: [
        UserInfoService,
        AuthorizationService,
        LocalStorageService<string>,
      ],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: ratingInitializerFactory,
      deps: [RatingService, UserInfoService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInfoInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    MainpageModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    MovieDetailsModule,
    TvDetailsModule,
    PersonDetailsModule,
    CastPageModule,
    NotificationModule,
    LoginPageModule,
  ],
})
export class AppModule {}
