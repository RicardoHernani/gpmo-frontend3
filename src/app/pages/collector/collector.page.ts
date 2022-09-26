import { CollectorService } from './../../services/domain/collector.service';
import { Component, OnInit } from '@angular/core';
import { CollectorItem } from 'src/app/models/collector-item';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.page.html',
  styleUrls: ['./collector.page.scss'],
})
export class CollectorPage implements OnInit {

  items: CollectorItem[];

  constructor(
    public collectorService: CollectorService) {

     }

  ngOnInit() {
    const collector = this.collectorService.getCollector();
    this.items = collector.items;
  }

  deletarCirurgiaEProcedimento() {
    console.log('Deletado');
  }

}
