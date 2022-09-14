import { ProcedimentoDTO } from './procedimento.dto';

export interface CirurgiaDTO {
  id: string;
  matricula: string;
  data: string;
  usuarioid: string;
  procedimentos: ProcedimentoDTO[];
  subTotalPontos: number;
  subTotalValor: number;
}
