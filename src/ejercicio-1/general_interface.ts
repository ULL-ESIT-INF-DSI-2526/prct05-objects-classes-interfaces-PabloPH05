/**
 * Clase base abstracta que define la estructura común para cualquier tipo de publicación o documento.
 * Todas las clases de contribución (Libros, Congresos, Artículos) deben heredar de esta clase.
 */
export abstract class GeneralClass {
  /**
   * Inicializa las propiedades básicas de una publicación.
   * * @param title - Título completo de la obra.
   * @param autors - Array con los nombres de los autores involucrados.
   * @param key_words - Lista de etiquetas o términos clave para indexación.
   * @param summary - Breve resumen o abstract del contenido.
   * @param publish_date - Fecha de publicación en formato string.
   * @param num_pages - Cantidad total de páginas del documento.
   * @param publisher - Nombre de la editorial o entidad que publica.
   */
  constructor(
    public title: string,
    public autors: string[],
    public key_words: string[],
    public summary: string,
    public publish_date: string,
    public num_pages: number,
    public publisher: string,
  ) {}

  /**
   * Método abstracto que debe ser implementado por las subclases para generar
   * la cita bibliográfica específica según el estándar IEEE.
   * * @returns Una cadena de texto con el formato de cita IEEE correspondiente al tipo de documento.
   */
  abstract obtenerIEEE(): string;

  /**
   * Extrae y formatea los datos esenciales de la publicación para ser visualizados en componentes de tabla.
   * Utiliza el nombre de la clase hija para determinar el campo "Tipo".
   * * @returns Un objeto plano con las propiedades mapeadas para una fila de tabla.
   * * @example
   * ```typescript
   * const datos = publicacion.obtenerDatosTabla();
   * // Retorna: { Tipo: 'ContribucionCongreso', Titulo: '...', ... }
   * ```
   */
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
