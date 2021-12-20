import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

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

  constructor(private router: Router, private storage: Storage) { }


  async finish(){
    this.router.navigateByUrl("/login");
    await this.storage.create();
    this.storage.set('isIntroShowed', true);
  }

}
