import { ReferenciaDTO } from 'src/app/models/referencia.dto';

export interface ProcedimentoDTO {
  id: string;
  tipo: string;
  premio: string;
  referencia: ReferenciaDTO;  //Um procedimento possui uma referência
}
