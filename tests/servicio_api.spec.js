import { getProductById } from '../src/services/api.js';
import { products } from '../src/data/db.js';

describe('Funciones de la API (api.js)', () => {

  // Grupo de pruebas para getProductById
  describe('getProductById', () => {

    // Prueba para un ID válido (usando async/await)
    it('debería devolver el producto correcto para un ID válido', async () => {
      // Arrange: Define un ID que sabes que existe en tus datos (db.js)
      const validId = 5; // Ejemplo: ID de PlayStation 5
      // Encuentra el objeto de producto esperado en tus datos de prueba
      const expectedProduct = products.find(p => p.id === validId);

      // Act: Llama a la función asíncrona y espera su resultado
      const result = await getProductById(validId);

      // Assert: Compara si el objeto recibido es igual al esperado
      // 'toEqual' compara el contenido de los objetos, no solo la referencia
      expect(result).toEqual(expectedProduct); 
    });

    // Prueba para un ID inválido (usando async/await y try/catch)
    it('debería rechazar la promesa para un ID inválido', async () => {
      // Arrange: Define un ID que sabes que NO existe
      const invalidId = 9999;

      // Act & Assert: Intenta llamar a la función y espera que falle
      try {
        await getProductById(invalidId);
        // Si la línea anterior NO lanza un error, la prueba debe fallar
        fail('La promesa debería haber sido rechazada, pero fue resuelta.'); 
      } catch (error) {
        // Assert: Verifica que el error capturado sea el mensaje esperado
        expect(error).toEqual('Producto no encontrado'); 
      }

      // Alternativa (más moderna, si Jasmine la soporta):
      // await expectAsync(getProductById(invalidId)).toBeRejectedWith('Producto no encontrado');
    });
  });
});