export abstract class GeneralClass {
  constructor(
    public title: string,
    public autors: string[],
    public key_words: string[],
    public summary: string,
    public publish_date: string,
    public num_pages: number,
    public publisher: string,
  ) {}

  abstract obtenerIEEE(): string;

  obtenerDatosTabla(): object {
    return {
      Tipo: this.constructor.name,
      Titulo: this.title,
      Autores: this.autors.join(', '),
      Fecha: this.publish_date,
      Editorial: this.publisher,
      Paginas: this.num_pages,
    };
  }
}
