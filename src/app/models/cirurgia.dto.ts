import { ProcedimentoDTO } from './procedimento.dto';

export interface CirurgiaDTO {
  id: string;
  matricula: string;
  data: string;
  usuarioId: string;
  procedimentos: ProcedimentoDTO[];
  subTotalPontos: string;
  subTotalValor: string;
}
