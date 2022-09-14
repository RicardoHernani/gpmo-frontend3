import { ProcedimentoDTO } from './procedimento.dto';
import { ReferenciaDTO } from './referencia.dto';

export interface CirurgiaDTO {
  id: string;
  matricula: string;
  data: string;
  usuarioid: string;
  procedimentos: ProcedimentoDTO[];       //Uma cirurgia possui vários procedimentos
  subTotalPontos: number;
  subTotalValor: number;
}
