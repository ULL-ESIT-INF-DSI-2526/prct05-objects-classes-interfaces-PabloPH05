import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Esto asegura que Vitest busque los archivos .spec.ts en la carpeta test
    include: ['test/**/*.spec.ts'], 
    coverage: {
      provider: 'v8', 
      // Aquí indicamos que queremos medir la cobertura de TODO lo que esté en src
      include: ['src/**/*.ts'],
      // Excluimos archivos que no contienen lógica (como el index.ts raíz)
      exclude: ['src/index.ts', 'src/**/index.ts'],
      reporter: ['text', 'lcov'],
      all: true, // Esto obliga a incluir archivos incluso si no tienen tests asociados
    },
  },
});
