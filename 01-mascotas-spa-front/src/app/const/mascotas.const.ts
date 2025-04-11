import { Mascota } from "../interfaces/mascota.interface";

export const MASCOTAS:Mascota[] = [
  {
    id: 1,
    nombre: "Max",
    tipo: "Perro",
    edad: 2,
    descripcion: "Amigable y juguetón.",
    imagen: "/assets/perro1.webp",
    fechaCreacion: new Date(1,11,2024),
    disponible: true
  },
  {
    id: 2,
    nombre: "Luna",
    tipo: "Gato",
    edad: 3,
    descripcion: "Independiente y cariñosa.",
    imagen: "/assets/gato1.jpeg",
    fechaCreacion: new Date(1,11,2024),
    disponible: false
  },
  {
    id: 3,
    nombre: "Rocky",
    tipo: "Perro",
    edad: 1,
    descripcion: "Activo y protector.",
    imagen: "/assets/perro2.jpeg",
    fechaCreacion: new Date(1,11,2024),
    disponible: true
  },
  {
    id: 4,
    nombre: "Mia",
    tipo: "Gato",
    edad: 4,
    descripcion: "Curiosa y ágil.",
    imagen: "/assets/gato2.jpeg",
    fechaCreacion: new Date(24,1,2024),
    disponible: false
  },
  {
    id: 5,
    nombre: "Buddy",
    tipo: "Perro",
    edad: 3,
    descripcion: "Leal y amistoso.",
    imagen: "/assets/perro3.jpeg",
    fechaCreacion: new Date(24,1,2024),
    disponible: true
  },
  {
    id: 6,
    nombre: "Nina",
    tipo: "Gato",
    edad: 2,
    descripcion: "Tranquila y observadora.",
    imagen: "/assets/gato3.jpeg",
    fechaCreacion: new Date(24,1,2024),
    disponible: true
  }
] as const;