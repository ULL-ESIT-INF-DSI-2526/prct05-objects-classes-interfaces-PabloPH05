import { GeneralClass } from './general_interface';
export class ArticuloRevista extends GeneralClass {
  constructor(
    title: string,
    autors: string[],
    key_words: string[],
    summary: string,
    publish_date: string,
    num_pages: number,
    publisher: string,
    public name: string,
    public volume: string,
    public num_volume: number,
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
    return `${autors_format}, "${this.title}", ${this.name}, vol. ${this.volume}, no. ${this.num_volume}, pp. ${this.num_pages}, ${this.publish_date}`;
  }
}
