import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { PlatziMusicService } from '../services/platzi-music.service';
@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage {
  songs: any;
  song: any;
  currentCenter: any;
  coordinates: any[] = [];
  defaultZoom: number = 14;
  search: string = '';
  currentSong: HTMLAudioElement;
  constructor(private geolocation: Geolocation, private musicService: PlatziMusicService) { }

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    const coordinates = await this.geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data: Geoposition) => {
      this.currentCenter = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      }
      this.coordinates.push({
        lat: data.coords.latitude,
        lng: data.coords.longitude
      });
    });
  }

  searchSong(text: string){
    this.musicService.searchTracks(text).then((tracks) => {
      console.log(tracks);
      this.songs = tracks.tracks.items;
    });
  }

  play(song: any){
    if(this.currentSong){
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }
}
