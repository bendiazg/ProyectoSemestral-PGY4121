import { Component, HostListener, OnInit  } from '@angular/core';
import { DatosCompartidosService } from '../datos-compartidos.service';
import { BarcodeScanner, ScanResult } from 'capacitor-barcode-scanner';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  isSupported = false;
  usuarios: any[] = [];
  isTitleVisible = false;
  resultadoScan:any='';  
  constructor(
    public navCtrl: NavController,
    private datosService: DatosCompartidosService,

  ) {
    this.usuarios = datosService.obtenerUsuarios();
  }

  ngOnInit() {
    this.cargarDatosGuardados(); // Cargar datos previamente guardados al cargar la página
  }

  cargarDatosGuardados() {
    const datosRegistro = localStorage.getItem('datosRegistro');

    if (datosRegistro) {    
      const usuario = JSON.parse(datosRegistro);
      this.usuarios.push(usuario);
    }
  }

  limpiarLista() {
    this.usuarios = []; // Limpia la lista en la aplicación
    localStorage.removeItem('datosRegistro'); // Elimina los datos de localStorage si es necesario
  }

  async scan() {
    this.resultadoScan = (await BarcodeScanner.scan()).code;
    // Guardar los datos escaneados en el almacenamiento local (localStorage)
    localStorage.setItem('datosEscaneados', JSON.stringify(this.resultadoScan));
    this.navCtrl.navigateForward('seccion');
  }

  @HostListener('ionScroll', ['$event.target'])
  onScroll(event: any) {
    const scrollTop = event.scrollTop;
    const titleElement = document.querySelector('.animated-title') as HTMLElement;
    const titleHeight = titleElement.clientHeight;
    const halfTitleHeight = titleHeight / 2;

    this.isTitleVisible = scrollTop >= halfTitleHeight;
  }
}