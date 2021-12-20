import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatziMusicService } from '../services/platzi-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts= {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  }
  canciones: any[] = [];
  albums: any[] = [];
  artistas: any[] = [];
  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
    preview_url: "",
    playing: false,
    name: ""
  };
  currentSong: HTMLAudioElement;
  newTime: number;
  constructor(private modalController: ModalController, private musicService: PlatziMusicService) {}
  
  ionViewDidEnter(){
    this.artistas = this.musicService.getArtists();
    this.musicService.getNewReleases().then((newReleases) => {
      this.artistas = this.musicService.getArtists();
      console.log(newReleases);
      //this.canciones = newReleases.albums.items.filter(item => item.album_type = 'single');
      this.albums = newReleases.albums?.items.filter((item: { album_type: string; }) => item.album_type = 'album');
    });
  }

  async showSongs(category, type){
    console.log(category);
    let songs = type === 'album' ? await this.musicService.getAlbumTracks(category.id) : await this.musicService.getArtistsTopTracks(category.id);
    console.log(songs);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: type === 'album' ? songs.items : songs.tracks,
        artist: category.name
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });
    modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration ) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time : string | number="1.00"){
    if(time){
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes:any = Math.floor(partTime / 60).toString();
      if(minutes == 1){
        minutes = "0" + minutes;
      }
      let seconds: any = (partTime % 60).toString();
      if(seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }

}
