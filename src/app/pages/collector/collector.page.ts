import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { ProcedimentoDTO } from 'src/app/models/procedimento.dto';
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

  excluirProcedimento(procedimento: ProcedimentoDTO, cirurgia: CirurgiaDTO) {
    this.items = this.collectorService.removeProcedimento(procedimento, cirurgia).items;
  }

}
