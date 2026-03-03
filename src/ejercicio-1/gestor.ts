import { GeneralClass } from './general_interface';

/**
 * Define los criterios opcionales para realizar búsquedas filtradas
 * en la colección bibliográfica.
 */
interface CriteriosFiltro {
  /** Filtrar por coincidencia parcial en el título. */
  titulo?: string;
  /** Filtrar por coincidencia parcial en el nombre de cualquier autor. */
  autor?: string;
  /** Filtrar por coincidencia exacta de la fecha de publicación. */
  fechaPublicacion?: string;
  /** Filtrar por coincidencia parcial en el nombre de la editorial. */
  editorial?: string;
}

/**
 * Clase encargada de administrar una colección de elementos bibliográficos.
 * Permite realizar operaciones de almacenamiento, búsqueda, filtrado y exportación.
 */
export class GestorBibliografico {
  /** Almacenamiento interno de elementos que heredan de {@link GeneralClass}. */
  private biblio_elements: GeneralClass[] = [];

  /**
   * Añade un nuevo elemento a la colección del gestor.
   * @param elem - Instancia de una clase derivada de {@link GeneralClass}.
   */
  agregarElemento(elem: GeneralClass): void {
    this.biblio_elements.push(elem);
  }

  /**
   * Imprime en consola una tabla con todos los elementos almacenados,
   * utilizando el formato de visualización de datos de tabla.
   */
  mostrarTodos(): void {
    console.table(this.biblio_elements.map((e) => e.obtenerDatosTabla()));
  }

  /**
   * Busca elementos que contengan una palabra clave específica dentro de su array de `key_words`.
   * La búsqueda no distingue entre mayúsculas y minúsculas.
   * * @param key - La palabra clave a buscar.
   * @returns Un array con los elementos que coinciden con la búsqueda.
   */
  buscarPorPalabraClave(key: string): GeneralClass[] {
    const p = key.toLowerCase();
    const resultado = this.biblio_elements.filter((elem) =>
      elem.key_words.some((pc) => pc.toLowerCase().includes(p)),
    );

    console.log(`\nResultados de búsqueda para la palabra clave: "${key}"`);
    console.table(resultado.map((elem) => elem.obtenerDatosTabla()));
    return resultado;
  }

  /**
   * Filtra la colección basándose en múltiples criterios simultáneos (operación AND).
   * Los campos de texto (título, autor, editorial) realizan búsquedas parciales.
   * * @param criterio - Objeto que contiene los parámetros de filtrado.
   * @returns Array de elementos que cumplen con todos los criterios proporcionados.
   * * @example
   * ```typescript
   * gestor.filtrar({ autor: "Cervantes", editorial: "Planeta" });
   * ```
   */
  filtrar(criterio: CriteriosFiltro): GeneralClass[] {
    const resultado = this.biblio_elements.filter((elem) => {
      let match = true;
      if (criterio.titulo) {
        match =
          match &&
          elem.title.toLowerCase().includes(criterio.titulo.toLowerCase());
      }

      if (criterio.autor) {
        match =
          match &&
          elem.autors.some((aut) =>
            aut.toLowerCase().includes(criterio.autor!.toLowerCase()),
          );
      }

      if (criterio.fechaPublicacion) {
        match = match && elem.publish_date === criterio.fechaPublicacion;
      }

      if (criterio.editorial) {
        match =
          match &&
          elem.publisher
            .toLowerCase()
            .includes(criterio.editorial.toLowerCase());
      }
      return match;
    });

    console.log('\n Resultado del filtrado:');
    // Nota: Aquí se imprimen los elementos filtrados (resultado), no la lista completa
    console.table(resultado.map((elem) => elem.obtenerDatosTabla()));
    return resultado;
  }

  /**
   * Exporta a la consola la cita bibliográfica en formato IEEE para una lista de elementos.
   * Si no se proporciona una lista, exporta toda la colección por defecto.
   * * @param elementos - (Opcional) Lista de elementos a exportar.
   * Por defecto es la colección completa del gestor.
   */
  exportarIEEE(elementos: GeneralClass[] = this.biblio_elements): void {
    console.log('\n--- EXPORTACIÓN FORMATO IEEE ---');
    elementos.forEach((e) => {
      console.log(e.obtenerIEEE());
    });
    console.log('--------------------------------\n');
  }
}
