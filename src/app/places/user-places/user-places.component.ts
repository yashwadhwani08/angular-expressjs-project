import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
// import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false);
  userPlaces = signal<Place[] | undefined>(undefined);
  error = signal('');
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.userPlaces.set(places);
      },
      complete: () => {
        this.isFetching.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        // console.log(error);
        // this.error.set(
        //   'Something went wrong fetching the available places. Please try again later.'
        // );
      },
    });

    // const subscription = this.httpClient
    //   .get<{ places: Place[] }>('http://localhost:3000/places', {
    //     observe: 'response',
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //       console.log(response.body?.places);
    //     },
    //     complete: () => {},
    //     error: () => {},
    //   });

    // const subscription = this.httpClient
    //   .get<{ places: Place[] }>('http://localhost:3000/places', {
    //     observe: 'events',
    //   })
    //   .subscribe({
    //     next: (event) => {
    //       console.log(event);
    //     },
    //     complete: () => {},
    //     error: () => {},
    //   });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
