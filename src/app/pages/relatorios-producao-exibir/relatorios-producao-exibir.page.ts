import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relatorios-producao-exibir',
  templateUrl: './relatorios-producao-exibir.page.html',
  styleUrls: ['./relatorios-producao-exibir.page.scss'],
})
export class RelatoriosProducaoExibirPage implements OnInit {

  dataInicial: string = this.route.snapshot.queryParamMap.get('dataInicial');
  dataFinal: string = this.route.snapshot.queryParamMap.get('dataFinal');
  diasValidos: string = this.route.snapshot.queryParamMap.get('diasValidos');
  pontosExtras: string = this.route.snapshot.queryParamMap.get('pontosExtras');

  constructor(
    public route: ActivatedRoute) {
     }

  ngOnInit() {
    console.log(this.dataInicial);
    console.log(this.dataFinal);
    console.log(this.diasValidos);
    console.log(this.pontosExtras);
  }

}
