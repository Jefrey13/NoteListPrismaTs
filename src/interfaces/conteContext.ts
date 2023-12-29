// export interface Note {
//     id: string
//     title: string,
//     content: string
// }
import {Note} from '@prisma/client'
//Cuando son tipo de datos deven ser en mayuscula la primera letra
export type CreatedNote = Omit<Note, 'id' | 'createdAt'| 'updatedAt'>

//Esto hace que cundo se termine de generar el tipo de datos, todos los tipos de datos van a ser obcionales.
export type UpdateNote = Partial<CreatedNote>;