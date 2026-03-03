import { GeneralClass } from './general_interface';

interface CriteriosFiltro {
  titulo?: string;
  autor?: string;
  fechaPublicacion?: string;
  editorial?: string;
}

export class GestorBibliografico {
  private biblio_elements: GeneralClass[] = [];

  agregarElemento(elem: GeneralClass): void {
    this.biblio_elements.push(elem);
  }

  mostrarTodos(): void {
    console.table(this.biblio_elements.map((e) => e.obtenerDatosTabla()));
  }

  buscarPorPalabraClave(key: string): GeneralClass[] {
    const p = key.toLowerCase();
    const resultado = this.biblio_elements.filter((key_word) =>
      key_word.key_words.some((pc) => pc.toLowerCase().includes(p)),
    );

    console.log(`\nResultados de búsqueda para la palabra clave: "${key}"`);
    console.table(resultado.map((elem) => elem.obtenerDatosTabla()));
    return resultado;
  }

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
    console.table(this.biblio_elements.map((elem) => elem.obtenerDatosTabla()));
    return resultado;
  }

  exportarIEEE(elementos: GeneralClass[] = this.biblio_elements): void {
    console.log('\n--- EXPORTACIÓN FORMATO IEEE ---');
    elementos.forEach((e) => {
      console.log(e.obtenerIEEE());
    });
    console.log('--------------------------------\n');
  }
}
