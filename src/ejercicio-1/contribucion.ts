import { GeneralClass } from './general_interface';
/**
 * Representa una contribución científica presentada en un congreso.
 * Extiende la funcionalidad de {@link GeneralClass} para incluir detalles específicos del evento.
 * * @example
 * ```typescript
 * const ponencia = new ContribucionCongreso(
 * "IA en la Educación", ["Juan Pérez"], ["IA", "EdTech"],
 * "Resumen del estudio...", "2024", 20, "IEEE",
 * "Congreso Mundial de Tecnología", "Madrid"
 * );
 * console.log(ponencia.obtenerIEEE());
 * ```
 */
export class ContribucionCongreso extends GeneralClass {
  /**
   * Crea una instancia de ContribucionCongreso.
   * @param title - El título de la contribución o ponencia.
   * @param autors - Lista de nombres de los autores.
   * @param key_words - Palabras clave asociadas al contenido.
   * @param summary - Resumen ejecutivo o abstract.
   * @param publish_date - Fecha de publicación o presentación (ej. "2024" o "Marzo 2024").
   * @param num_pages - Número total de páginas del documento.
   * @param publisher - Entidad editorial o institución encargada.
   * @param congress_name - Nombre oficial del congreso donde se presentó.
   * @param congress_city - Ciudad donde tuvo lugar el congreso.
   */
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
  /**
   * Genera la cita bibliográfica de la contribución siguiendo el formato estándar de la IEEE.
   * * El formato resultante es:
   * `Autores, "Título," en Nombre del Congreso, Ciudad, Fecha, pp. Número de páginas.`
   * * @returns Una cadena de texto con la referencia formateada para bibliografías.
   */
  obtenerIEEE(): string {
    const autoresFormateados = this.autors.join(', ');
    return `${autoresFormateados}, "${this.title}," en ${this.congress_name}, ${this.congress_city}, ${this.publish_date}, pp. ${this.num_pages}.`;
  }
}
