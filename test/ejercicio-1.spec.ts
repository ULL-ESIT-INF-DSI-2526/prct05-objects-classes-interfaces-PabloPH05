import { describe, test, expect } from 'vitest';
import { ArticuloRevista } from '../src/ejercicio-1/revistas';
import { ContribucionCongreso } from '../src/ejercicio-1/contribucion';
import { TrabajoAcademico } from '../src/ejercicio-1/trabajo';
import { GestorBibliografico } from '../src/ejercicio-1/gestor';

describe('Sistema de Gestión Bibliográfica', () => {
  // Función auxiliar para obtener datos frescos en cada test sin usar beforeEach
  const crearDatosPrueba = () => {
    const articulo = new ArticuloRevista(
      'Impacto de la IA en Educación',
      ['J. Pérez', 'M. García'],
      ['IA', 'Educación'],
      'Resumen del artículo...',
      '2024',
      30,
      'EduTech',
      'Journal of Tech',
      '10',
      2,
    );
    const congreso = new ContribucionCongreso(
      'Nuevos paradigmas en POO',
      ['A. López'],
      ['POO', 'Software', 'TypeScript'],
      'Resumen del congreso...',
      '2023',
      115,
      'TechPress',
      'Congreso Nacional de Software',
      'Madrid',
    );
    const tfg = new TrabajoAcademico(
      'Desarrollo de Gestor en TS',
      ['C. Gómez'],
      ['TypeScript', 'Gestor', 'Web'],
      'Resumen del TFG...',
      '2023',
      50,
      'Univ. de La Laguna',
      'Trabajo de Fin de Grado',
      'Ingeniería',
    );
    const gestor = new GestorBibliografico();

    return { articulo, congreso, tfg, gestor };
  };

  describe('1. Modelos de Elementos Bibliográficos', () => {
    test('Prueba 1: Debería crear un Artículo de Revista con sus propiedades específicas', () => {
      const { articulo } = crearDatosPrueba();
      expect(articulo.name).toBe('Journal of Tech');
      expect(articulo.volume).toBe('10');
    });

    test('Prueba 2: Debería crear una Contribución a Congreso con sus propiedades', () => {
      const { congreso } = crearDatosPrueba();
      expect(congreso.congress_city).toBe('Madrid');
      expect(congreso.congress_name).toBe('Congreso Nacional de Software');
    });

    test('Prueba 3: Debería crear un Trabajo Académico con sus propiedades', () => {
      const { tfg } = crearDatosPrueba();
      expect(tfg.job_type).toBe('Trabajo de Fin de Grado');
      expect(tfg.departement).toBe('Ingeniería');
    });

    test('Prueba 4: obtenerDatosTabla() debería devolver la estructura correcta para un elemento', () => {
      const { articulo } = crearDatosPrueba();
      const datosTabla = articulo.obtenerDatosTabla();
      expect(datosTabla).toHaveProperty('Tipo', 'ArticuloRevista');
      expect(datosTabla).toHaveProperty(
        'Titulo',
        'Impacto de la IA en Educación',
      );
      expect(datosTabla).toHaveProperty('Autores', 'J. Pérez, M. García');
    });
  });

  describe('2. Formateo de Referencias IEEE (Polimorfismo)', () => {
    test('Prueba 5: Debería formatear correctamente un Artículo de Revista en IEEE', () => {
      const { articulo } = crearDatosPrueba();
      const esperado =
        'J. Pérez, M. García, "Impacto de la IA en Educación", Journal of Tech, vol. 10, no. 2, pp. 30, 2024';
      expect(articulo.obtenerIEEE()).toBe(esperado);
    });

    test('Prueba 6: Debería formatear correctamente una Contribución a Congreso en IEEE', () => {
      const { congreso } = crearDatosPrueba();
      const esperado =
        'A. López, "Nuevos paradigmas en POO," en Congreso Nacional de Software, Madrid, 2023, pp. 115.';
      expect(congreso.obtenerIEEE()).toBe(esperado);
    });

    test('Prueba 7: Debería formatear correctamente un Trabajo Académico en IEEE', () => {
      const { tfg } = crearDatosPrueba();
      const esperado =
        'C. Gómez, "Desarrollo de Gestor en TS," Trabajo de Fin de Grado, Ingeniería, Univ. de La Laguna, 2023.';
      expect(tfg.obtenerIEEE()).toBe(esperado);
    });
  });

  describe('3. Gestión y Almacenamiento (GestorBibliografico)', () => {
    test('Prueba 8: El gestor debería inicializarse vacío', () => {
      const { gestor } = crearDatosPrueba();
      const resultados = gestor.filtrar({});
      expect(resultados.length).toBe(0);
    });

    test('Prueba 9: Debería permitir agregar múltiples elementos bibliográficos', () => {
      const { gestor, articulo, congreso } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      gestor.agregarElemento(congreso);
      expect(gestor.filtrar({}).length).toBe(2);
    });
  });

  describe('4. Búsquedas por Palabras Clave', () => {
    test('Prueba 10: Debería encontrar un elemento por coincidencia exacta', () => {
      const { gestor, articulo } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      const res = gestor.buscarPorPalabraClave('IA');
      console.log(res);
      expect(res.length).toBe(1);
      expect(res[0].title).toBe('Impacto de la IA en Educación');
    });

    test('Prueba 11: Debería ser insensible a mayúsculas/minúsculas (case-insensitive)', () => {
      const { gestor, articulo } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      const res = gestor.buscarPorPalabraClave('ia');
      expect(res.length).toBe(1);
    });

    test('Prueba 12: Debería devolver un array vacío si la palabra clave no existe', () => {
      const { gestor, articulo } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      const res = gestor.buscarPorPalabraClave('Blockchain');
      expect(res.length).toBe(0);
    });

    test('Prueba 13: Debería encontrar múltiples elementos si comparten la palabra clave', () => {
      const { gestor, congreso, tfg } = crearDatosPrueba();
      gestor.agregarElemento(congreso); // Tiene "TypeScript"
      gestor.agregarElemento(tfg); // Tiene "TypeScript"
      const res = gestor.buscarPorPalabraClave('typescript');
      expect(res.length).toBe(2);
    });
  });

  describe('5. Filtrado por Campos Específicos', () => {
    test('Prueba 14: Debería filtrar por título parcialmente', () => {
      const { gestor, articulo } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      const res = gestor.filtrar({ titulo: 'Impacto' });
      expect(res.length).toBe(1);
      expect(res[0].title).toContain('Impacto');
    });

    test('Prueba 15: Debería filtrar por autor correctamente', () => {
      const { gestor, articulo } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      const res = gestor.filtrar({ autor: 'M. García' });
      expect(res.length).toBe(1);
    });

    test('Prueba 16: Debería filtrar por fecha de publicación exacta', () => {
      const { gestor, congreso, tfg } = crearDatosPrueba();
      gestor.agregarElemento(congreso); // 2023
      gestor.agregarElemento(tfg); // 2023
      const res = gestor.filtrar({ fechaPublicacion: '2023' });
      expect(res.length).toBe(2);
    });

    test('Prueba 17: Debería filtrar por editorial parcialmente', () => {
      const { gestor, tfg } = crearDatosPrueba();
      gestor.agregarElemento(tfg);
      const res = gestor.filtrar({ editorial: 'Univ' });
      expect(res.length).toBe(1);
      expect(res[0].publisher).toBe('Univ. de La Laguna');
    });

    test('Prueba 18: Debería permitir combinar múltiples criterios de filtrado (AND)', () => {
      const { gestor, congreso } = crearDatosPrueba();
      gestor.agregarElemento(congreso);
      const res = gestor.filtrar({
        fechaPublicacion: '2023',
        autor: 'A. López',
      });
      expect(res.length).toBe(1);
      expect(res[0].title).toBe('Nuevos paradigmas en POO');
    });

    test('Prueba 19: Debería devolver vacío si no se cumplen todos los criterios combinados', () => {
      const { gestor, tfg } = crearDatosPrueba();
      gestor.agregarElemento(tfg);
      const res = gestor.filtrar({
        fechaPublicacion: '2024',
        autor: 'C. Gómez',
      });
      expect(res.length).toBe(0);
    });
  });

  describe('6. Salidas por Consola (Validación manual sin mocks)', () => {
    test('Prueba 20: mostrarTodos() debería pasar los datos correctos a console.table', () => {
      const { gestor, articulo, congreso } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      gestor.agregarElemento(congreso);

      // Sobrescribimos temporalmente console.table
      const originalTable = console.table;
      let datosCapturados: any = null;
      console.table = (data) => {
        datosCapturados = data;
      };

      gestor.mostrarTodos();

      expect(datosCapturados).not.toBeNull();
      expect(datosCapturados.length).toBe(2);
      expect(datosCapturados[0]).toHaveProperty(
        'Titulo',
        'Impacto de la IA en Educación',
      );

      // Restauramos console.table
      console.table = originalTable;
    });

    test('Prueba 21: exportarIEEE() por defecto debería imprimir todas las referencias', () => {
      const { gestor, articulo, congreso } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      gestor.agregarElemento(congreso);

      // Capturamos console.log
      const originalLog = console.log;
      const logsCapturados: string[] = [];
      console.log = (msg) => logsCapturados.push(msg);

      gestor.exportarIEEE();

      const textoCompleto = logsCapturados.join(' ');
      expect(textoCompleto).toContain('J. Pérez, M. García');
      expect(textoCompleto).toContain('A. López');

      console.log = originalLog;
    });

    test('Prueba 22: exportarIEEE() debería poder exportar un subconjunto de elementos', () => {
      const { gestor, articulo, congreso } = crearDatosPrueba();
      gestor.agregarElemento(articulo);
      gestor.agregarElemento(congreso);

      const originalLog = console.log;
      const logsCapturados: string[] = [];
      console.log = (msg) => logsCapturados.push(msg);

      // Exportamos solo el artículo
      gestor.exportarIEEE([articulo]);

      const textoCompleto = logsCapturados.join(' ');
      expect(textoCompleto).toContain('J. Pérez');
      expect(textoCompleto).not.toContain('A. López');

      console.log = originalLog;
    });
  });
});
