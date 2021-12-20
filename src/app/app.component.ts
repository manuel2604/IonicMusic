import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [
    {
      title: 'Escucha tu música',
      subTitle: 'EN CUALQUIER LUGAR',
      description: 'Los mejores álbumes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.',
      icon: 'play'
    },
    {
      title: 'Disfruta de nuestro reproductor',
      subTitle: 'DE VIDEOS INCREÍBLES',
      description: 'Entra al modo video de nuestro reproductor y obten acceso a clips, documentales y making offs increíbles de tu artista preferido.',
      icon: 'videocam'
    },
    {
      title: 'Accede al exclusivo',
      subTitle: 'MODO DEPORTE',
      description: 'Crea un playlist basado en tu actividad física.\nTen reportes y acceso a lo que necesites, con acceso a GPS.',
      icon: 'bicycle'
    }
  ];
  constructor() {}
}
