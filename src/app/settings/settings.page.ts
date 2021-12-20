import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  photo: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }
}
