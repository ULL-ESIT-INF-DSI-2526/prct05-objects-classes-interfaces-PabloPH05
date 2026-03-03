import { GeneralClass } from './general_interface';

export class TrabajoAcademico extends GeneralClass {
  constructor(
    title: string,
    autors: string[],
    key_words: string[],
    summary: string,
    publish_date: string,
    num_pages: number,
    publisher: string,
    public job_type:
      | 'Trabajo de Fin de Grado'
      | 'Trabajo de Fin de Máster'
      | 'Tesis Doctoral',
    public departement: string,
  ) {
    super(
      title,
      autors,
      key_words,
      summary,
      publish_date,
      num_pages,
      publisher,
    );
  }

  obtenerIEEE(): string {
    const autors_format = this.autors.join(', ');
    return `${autors_format}, "${this.title}," ${this.job_type}, ${this.departement}, ${this.publisher}, ${this.publish_date}.`;
  }
}
