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
import { GuestSessionService } from './services/guest-session.service';
import { RatingService } from './services/rating.service';
import { NotificationModule } from './components/notifications/notifications.module';
import { ratingInitializerFactory } from './factories/rating-initializer.factory';
import { configInitializerFactory } from './factories/config-initializer.factory';
import { PersonDetailsModule } from './pages/person-details/person-details.module';
import { CastPageModule } from './pages/cast-page/cast-page.module';
import { MoviesPageModule } from './pages/movies-page/movies-page.module';

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
      useFactory: ratingInitializerFactory,
      deps: [RatingService, GuestSessionService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
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
    MoviesPageModule,
    NotificationModule,
  ],
})
export class AppModule {}
