import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorios-producao',
  templateUrl: './relatorios-producao.page.html',
  styleUrls: ['./relatorios-producao.page.scss'],
})
export class RelatoriosProducaoPage implements OnInit {

  inserirDadosFormGroup: FormGroup= this.formBuilder.group({
    dataInicial: ['', [Validators.required]],
    dataFinal: ['', [Validators.required]],
    diasValidos: ['', [Validators.required, Validators.min(0), Validators.max(25)]],
    pontosExtras: [64, [Validators.required, Validators.min(64), Validators.max(400)]],
    });

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController) {
  }

  ngOnInit() {

  }

  inserirDados() {
    //lógica para enviar os dados para a página 'relatorios-producao-exibir'
    this.navCtrl.navigateForward('relatorios-producao-exibir');
  }

}
