import { Injectable } from '@angular/core';
import { CameraResultType, CameraSource} from '@capacitor/camera';
import { Plugins } from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async takePhoto() {
    const image = await Camera['getPhoto']({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Luego puedes manejar la imagen como desees, por ejemplo, mostrándola en tu aplicación.
    return image.webPath;
  }
}
