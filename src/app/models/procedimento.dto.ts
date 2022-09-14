import { ReferenciaDTO } from 'src/app/models/referencia.dto';

export interface ProcedimentoDTO {
  tipo: string;
  premio: string;
  referencia: ReferenciaDTO;
}
