import { describe, test, expect, beforeEach } from 'vitest';
import { Box } from '../src/ejercicio-2/celda';
import { Column, COL_SIZE } from '../src/ejercicio-2/columna';
import { Tablero } from '../src/ejercicio-2/tablero';
import { TicTacToeGame } from '../src/ejercicio-2/tictactoe_game';

describe('Pruebas de Conecta 4 (TicTacToeGame)', () => {
  describe('Clase Box', () => {
    test('1. Debería inicializarse con un estado vacío por defecto', () => {
      const box = new Box();
      expect(box.status).toBe('');
    });

    test('2. Debería permitir cambiar el estado a X o O', () => {
      const box = new Box();
      box.status = 'X';
      expect(box.status).toBe('X');
      box.status = 'O';
      expect(box.status).toBe('O');
    });
  });

  describe('Clase Column', () => {
    test('3. Debería crearse con el tamaño correcto (COL_SIZE)', () => {
      const col = new Column();
      expect(col.column.length).toBe(COL_SIZE);
    });

    test('4. Debería añadir fichas desde abajo hacia arriba (índice 5 al 0)', () => {
      const col = new Column();
      col.addToColumn('X');
      expect(col.getIndex(5).status).toBe('X');
      col.addToColumn('O');
      expect(col.getIndex(4).status).toBe('O');
    });

    test('5. Debería marcar is_full como true cuando la columna esté llena', () => {
      const col = new Column();
      for (let i = 0; i < COL_SIZE; i++) {
        col.addToColumn('X');
      }
      expect(col.is_full).toBe(true);
    });

    test('6. Debería lanzar un error al intentar añadir a una columna llena', () => {
      const col = new Column();
      for (let i = 0; i < COL_SIZE; i++) col.addToColumn('X');
      expect(() => col.addToColumn('O')).toThrow('This column is full');
    });
  });

  describe('Clase Tablero', () => {
    test('7. Debería inicializarse con 7 columnas', () => {
      const tablero = new Tablero();
      expect(tablero.table.length).toBe(7);
    });

    test('8. addChecker debería lanzar error si el índice de columna es inválido', () => {
      const tablero = new Tablero();
      expect(() => tablero.addChecker(-1, 'X')).toThrow(
        'Not a valid column index',
      );
      expect(() => tablero.addChecker(7, 'X')).toThrow(
        'Not a valid column index',
      );
    });
  });

  describe('Lógica de Victoria (TicTacToeGame)', () => {
    let game: TicTacToeGame;

    beforeEach(() => {
      game = new TicTacToeGame();
    });

    test('9. No debería haber un ganador al inicio', () => {
      expect(game.playerWon(true)).toBe(false);
      expect(game.playerWon(false)).toBe(false);
    });

    test('10. Debería detectar victoria horizontal (Jugador O)', () => {
      // Colocamos 4 fichas 'O' en la base de las primeras 4 columnas
      const table = (game as any).table;
      table.addChecker(0, 'O');
      table.addChecker(1, 'O');
      table.addChecker(2, 'O');
      table.addChecker(3, 'O');
      expect(game.playerWon(true)).toBe(true);
    });

    test('11. Debería detectar victoria vertical (Jugador X)', () => {
      const table = (game as any).table;
      for (let i = 0; i < 4; i++) {
        table.addChecker(0, 'X');
      }
      expect(game.playerWon(false)).toBe(true);
    });

    test('12. Debería detectar victoria diagonal ascendente /', () => {
      const table = (game as any).table;
      // Col 0: O
      table.addChecker(0, 'O');
      // Col 1: X, O
      table.addChecker(1, 'X');
      table.addChecker(1, 'O');
      // Col 2: X, X, O
      table.addChecker(2, 'X');
      table.addChecker(2, 'X');
      table.addChecker(2, 'O');
      // Col 3: X, X, X, O
      table.addChecker(3, 'X');
      table.addChecker(3, 'X');
      table.addChecker(3, 'X');
      table.addChecker(3, 'O');

      expect(game.playerWon(true)).toBe(true);
    });

    test('13. Debería detectar victoria diagonal descendente \\', () => {
      const table = (game as any).table;
      // Setup similar para diagonal descendente
      table.addChecker(0, 'X');
      table.addChecker(0, 'X');
      table.addChecker(0, 'X');
      table.addChecker(0, 'O');
      table.addChecker(1, 'X');
      table.addChecker(1, 'X');
      table.addChecker(1, 'O');
      table.addChecker(2, 'X');
      table.addChecker(2, 'O');
      table.addChecker(3, 'O');

      expect(game.playerWon(true)).toBe(true);
    });

    test('14. No debería detectar victoria si solo hay 3 en línea', () => {
      const table = (game as any).table;
      table.addChecker(0, 'O');
      table.addChecker(0, 'O');
      table.addChecker(0, 'O');
      expect(game.playerWon(true)).toBe(false);
    });

    test('15. clear() debería resetear el tablero', () => {
      const table = (game as any).table;
      table.addChecker(0, 'O');
      game.clear();
      // Verificamos que la posición vuelve a estar vacía
      expect((game as any).table.table[0].getIndex(5).status).toBe('');
    });
  });

  describe('Casos de Borde y Estructura', () => {
    test('16. Debería manejar correctamente el llenado de varias columnas', () => {
      const table = new Tablero();
      for (let i = 0; i < 6; i++) table.addChecker(0, 'X');
      for (let i = 0; i < 6; i++) table.addChecker(1, 'O');
      expect(table.table[0].is_full).toBe(true);
      expect(table.table[1].is_full).toBe(true);
    });

    test('17. La última pieza colocada debe estar en el índice 0 si la columna se llena', () => {
      const col = new Column();
      for (let i = 0; i < 6; i++) col.addToColumn('X');
      expect(col.getIndex(0).status).toBe('X');
    });

    test('18. El método playerWon debe devolver false para el jugador contrario', () => {
      const game = new TicTacToeGame();
      const table = (game as any).table;
      table.addChecker(0, 'X');
      table.addChecker(1, 'X');
      table.addChecker(2, 'X');
      table.addChecker(3, 'X');
      expect(game.playerWon(true)).toBe(false); // O no ha ganado
      expect(game.playerWon(false)).toBe(true); // X sí ha ganado
    });

    test('19. Debería imprimir el tablero sin errores (Smoke test)', () => {
      const game = new TicTacToeGame();
      expect(() => game.print()).not.toThrow();
    });

    test('20. Las dimensiones del tablero deben ser consistentes (7x6)', () => {
      const table = new Tablero();
      expect(table.table.length).toBe(7); // Columnas
      table.table.forEach((col) => {
        expect(col.column.length).toBe(6); // Filas
      });
    });
  });
});
