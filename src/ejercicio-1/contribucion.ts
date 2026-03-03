import { GeneralClass } from './general_interface';

export class ContribucionCongreso extends GeneralClass {
  constructor(
    title: string,
    autors: string[],
    key_words: string[],
    summary: string,
    publish_date: string,
    num_pages: number,
    publisher: string,
    public congress_name: string,
    public congress_city: string,
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
    const autoresFormateados = this.autors.join(', ');
    return `${autoresFormateados}, "${this.title}," en ${this.congress_name}, ${this.congress_city}, ${this.publish_date}, pp. ${this.num_pages}.`;
  }
}
