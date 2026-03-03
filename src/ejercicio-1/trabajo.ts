import { GeneralClass } from './general_interface';

/**
 * Representa un trabajo de índole académica oficial, como tesis o proyectos de fin de carrera.
 * Hereda de {@link GeneralClass} y añade metadatos sobre el grado académico y el departamento.
 * * @example
 * ```typescript
 * const tesis = new TrabajoAcademico(
 * "Optimización de Redes Neuronales",
 * ["Laura García"],
 * ["Deep Learning", "Eficiencia"],
 * "Estudio profundo sobre...",
 * "2024",
 * 150,
 * "Universidad Politécnica",
 * "Tesis Doctoral",
 * "Departamento de Inteligencia Artificial"
 * );
 * console.log(tesis.obtenerIEEE());
 * ```
 */
export class TrabajoAcademico extends GeneralClass {
  /**
   * Crea una instancia de TrabajoAcademico.
   * * @param title - Título del trabajo académico.
   * @param autors - Autor o autores del trabajo (normalmente el estudiante).
   * @param key_words - Palabras clave del proyecto.
   * @param summary - Resumen o abstract de la investigación.
   * @param publish_date - Año de defensa o publicación.
   * @param num_pages - Extensión total en páginas.
   * @param publisher - Institución académica (Universidad/Escuela).
   * @param job_type - Categoría del trabajo: 'Trabajo de Fin de Grado', 'Trabajo de Fin de Máster' o 'Tesis Doctoral'.
   * @param departement - Departamento o facultad donde se presentó el trabajo.
   */
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

  /**
   * Genera la cita bibliográfica según el formato IEEE para tesis y trabajos académicos.
   * * El formato resultante es:
   * `Autores, "Título," Tipo de Trabajo, Departamento, Institución, Fecha.`
   * * @returns Una cadena de texto con la referencia académica formateada.
   */
  obtenerIEEE(): string {
    const autors_format = this.autors.join(', ');
    return `${autors_format}, "${this.title}," ${this.job_type}, ${this.departement}, ${this.publisher}, ${this.publish_date}.`;
  }
}
