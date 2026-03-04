import {describe, test, expect} from 'vitest'
import {Perro} from '../src/ejercicio-practica/perro'
import { Animal } from '../src/ejercicio-practica/animal'
import {Gato} from '../src/ejercicio-practica/gato'

describe('Test para el funcionamiento de la jerarquía de clases', () => {
    describe('Clase Perro', () => {
        test('Se inizializa correctamente', () => {
            const perro = new Perro('111-111','Max',4,15.3,'Media',
                'Dalmata',80
            )

            expect(perro.age).toEqual(4);
            expect(perro.microchip_id).toEqual('111-111')
            expect(perro.name).toEqual('Max');
            expect(perro.weigth).toEqual(15.3);
            expect(perro.health).toEqual('Media')
            expect(perro.kind).toEqual('Dalmata')
            expect(perro.activity_level).toEqual(80);
        })

        test('Hereda de Animal', () => {
            const perro = new Perro('111-111','Max',4,15.3,'Media',
                'Dalmata',80
            )

            expect(perro).toBeInstanceOf(Animal);
            expect(perro).toBeInstanceOf(Perro);
        })

        test('La función obtenerFicha devuelve la informacion en un string', () => {
            const perro = new Perro('111-111','Max',4,15.3,'Media',
                'Dalmata',80
            )

            expect(perro.obtenerFicha()).toEqual('-- Ficha Perro --\nNombre: Max\nEdad: 4 años\nPeso: 15.3 kg, Estado de Salud: Media\nId: 111-111\nRaza: Dalmata\nNivel de actividad: 80 %')
        })

        test('Se pueden modificar datos usando setters', () => {
            const perro = new Perro('111-111','Max',4,15.3,'Media',
                'Dalmata',80
            )

            perro.age = 5;
            perro.kind = 'Pastor';

            expect(perro.age).toEqual(5);
            expect(perro.kind).toEqual('Pastor');
            expect(perro.obtenerFicha()).toEqual('-- Ficha Perro --\nNombre: Max\nEdad: 5 años\nPeso: 15.3 kg, Estado de Salud: Media\nId: 111-111\nRaza: Pastor\nNivel de actividad: 80 %')
        })
    })

    describe('Clase Gato', () => {
        test('Se inizializa correctamente', () => {
            const gato = new Gato('111-222','Felix',1,4.2,'Media',
                'Rugoso', true
            )

            expect(gato.age).toEqual(1);
            expect(gato.microchip_id).toEqual('111-222')
            expect(gato.name).toEqual('Felix');
            expect(gato.weigth).toEqual(4.2);
            expect(gato.health).toEqual('Media')
            expect(gato.hear_kind).toEqual('Rugoso')
            expect(gato.is_interior).toEqual('Interior');
        })

        test('Hereda de Animal', () => {
            const gato = new Gato('111-222','Felix',1,4.2,'Media',
                'Rugoso', true
            )

            expect(gato).toBeInstanceOf(Animal);
            expect(gato).toBeInstanceOf(Gato);
        })

        test('La función obtenerFicha devuelve la informacion en un string', () => {
            const gato = new Gato('111-222','Felix',1,4.2,'Media',
                'Rugoso', true
            )

            expect(gato.obtenerFicha()).toEqual('-- Ficha Gato --\nNombre: Felix\nEdad: 1 años\nPeso: 4.2 kg, Estado de Salud: Media\nId: 111-222\nTipo de pelaje: Rugoso\nGato de interior')
        })

        test('Se pueden modificar datos usando setters', () => {
            const gato = new Gato('111-222','Felix',1,4.2,'Media',
                'Rugoso', true
            )

            gato.weigth = 4.8;
            gato.is_interior = false;

            expect(gato.weigth).toEqual(4.8);
            expect(gato.is_interior).toEqual('Exterior');
            expect(gato.obtenerFicha()).toEqual('-- Ficha Gato --\nNombre: Felix\nEdad: 1 años\nPeso: 4.8 kg, Estado de Salud: Media\nId: 111-222\nTipo de pelaje: Rugoso\nGato de exterior')
        })
    })
})