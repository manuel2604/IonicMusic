import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {
  songs: any;
  artist: any;

  constructor(private modalController: ModalController, private navParams: NavParams) { }
  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    this.artist = this.navParams.data.artist;
  }

  async selectSong(song){
    await this.modalController.dismiss(song);
  }
}
