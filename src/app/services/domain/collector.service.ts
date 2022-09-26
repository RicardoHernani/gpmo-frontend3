import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { ProcedimentoDTO } from 'src/app/models/procedimento.dto';
import { Injectable } from '@angular/core';
import { Collector } from 'src/app/models/collector';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class CollectorService {

  constructor(public storage: StorageService){
  }

  createOrClearCollector(): Collector {
    const collector: Collector = {items: []};
    this.storage.setCollector(collector);
    return collector;

  }

  getCollector(): Collector {
    let collector: Collector = this.storage.getCollector();
    if (collector == null) {
      collector = this.createOrClearCollector();
    }
    return collector;
  }

  addProcedimento(procedimento: ProcedimentoDTO, cirurgia: CirurgiaDTO): Collector {
    const collector = this.getCollector();
    const position = collector.items.findIndex(x => x.procedimento.id === procedimento.id);
    if (position === -1) {
      collector.items.push({
        procedimento,
        cirurgia
      });
    }
    this.storage.setCollector(collector);
    return collector;
  }

}
