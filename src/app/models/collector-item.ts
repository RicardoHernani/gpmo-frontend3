import { CirurgiaDTO } from './cirurgia.dto';
import { ProcedimentoDTO } from './procedimento.dto';

export interface CollectorItem {
  cirurgia: CirurgiaDTO;
  procedimento: ProcedimentoDTO;
}
