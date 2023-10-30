import { Component, HostListener, OnInit  } from '@angular/core';
import { DatosCompartidosService } from '../datos-compartidos.service';
@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.page.html',
  styleUrls: ['./seccion.page.scss'],
})
export class SeccionPage implements OnInit {
  isSupported = false;
  usuarios: any[] = [];
  isTitleVisible = false;
  resultadoScan:any='';  
  constructor(
    private datosService: DatosCompartidosService,

  ) {
    this.usuarios = datosService.obtenerUsuarios();
  }

  ngOnInit() {
    // Recuperar los datos escaneados del localStorage
    const datosEscaneados = localStorage.getItem('datosEscaneados');
    if (datosEscaneados) {
      this.resultadoScan = JSON.parse(datosEscaneados);
    }
  }

  cargarDatosGuardados() {
    const datosRegistro = localStorage.getItem('datosRegistro');

    if (datosRegistro) {    
      const usuario = JSON.parse(datosRegistro);
      this.usuarios.push(usuario);
    }
  }

}