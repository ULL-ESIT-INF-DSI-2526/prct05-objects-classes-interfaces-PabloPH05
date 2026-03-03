import { GeneralClass } from './general_interface';

/**
 * Representa un artículo publicado en una revista científica o académica.
 * Hereda de {@link GeneralClass} e incorpora metadatos específicos de publicaciones periódicas.
 * * @example
 * ```typescript
 * const articulo = new ArticuloRevista(
 * "Avances en Computación Cuántica",
 * ["Elena Rossi", "Marc Webber"],
 * ["Física", "Qubit"],
 * "Estudio sobre la coherencia...",
 * "2025",
 * 12,
 * "Nature",
 * "Journal of Quantum Computing",
 * "Vol. 45",
 * 3
 * );
 * console.log(articulo.obtenerIEEE());
 * ```
 */
export class ArticuloRevista extends GeneralClass {
  /**
   * Crea una instancia de ArticuloRevista.
   * * @param title - Título del artículo.
   * @param autors - Array con los nombres de los autores del artículo.
   * @param key_words - Lista de palabras clave para indexación.
   * @param summary - Resumen o abstract del contenido.
   * @param publish_date - Año o fecha de publicación.
   * @param num_pages - Número de páginas del artículo (o rango de páginas).
   * @param publisher - Entidad editorial.
   * @param name - Nombre oficial de la revista (Journal name).
   * @param volume - Identificador del volumen de la revista.
   * @param num_volume - Número de la edición o ejemplar dentro del volumen.
   */
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

  /**
   * Genera la cita bibliográfica del artículo siguiendo el formato estándar de la IEEE para revistas.
   * * El formato generado es:
   * `Autores, "Título", Nombre de la Revista, vol. X, no. Y, pp. Z, Fecha.`
   * * @returns La referencia bibliográfica completa formateada como string.
   */
  obtenerIEEE(): string {
    const autors_format = this.autors.join(', ');
    return `${autors_format}, "${this.title}", ${this.name}, vol. ${this.volume}, no. ${this.num_volume}, pp. ${this.num_pages}, ${this.publish_date}`;
  }
}
