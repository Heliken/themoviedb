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
import { forkJoin, of } from 'rxjs';

const ratingInitializerFactory =
  (ratingService: RatingService, guestSessionService: GuestSessionService) =>
  () => {
    const sessionId = guestSessionService.getSessionId();
    if (sessionId) {
      return forkJoin([
        ratingService.requestRatedMovies(sessionId),
        ratingService.requestRatedTvShows(sessionId),
      ]);
    } else {
      return of(null);
    }
  };

const configInitializerFactory =
  (apiConfigService: ApiConfigurationService) => () =>
    apiConfigService.loadConfig();

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
  ],
})
export class AppModule {}
