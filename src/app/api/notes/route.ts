import {prisma} from '@/libs/prisma'
import {Prisma} from "@prisma/client"
import {NextResponse} from 'next/server'

export async function GET() {
    try {
        const notes = await prisma.note.findMany();

        if(!notes){
            return NextResponse.json({
                message:"Error getting notes",
            },
            {
                status:404,
            });
        }
        return NextResponse.json(notes);

    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code == "P2025"){
                return NextResponse.json({
                    error: error.message, 
                },{
                    status: 404
                });
            }
            return NextResponse.json({
                message:"Error getting notes",
                error: error.message, 
            },
            {
                status:500,
            });
        }
    }
}

export async function POST(request: Request) {
    try {
        const {title, content} = await request.json();

        const newNote = await prisma.note.create({
            data: {
                title,
                content,
            },
        });

        if(!newNote){
            return NextResponse.json({
                message:"Error adding new note",
            },
            {
                status:404,
            });
        }
        return NextResponse.json(newNote);
        
    } catch (error) {
        if(error instanceof Error)
        {
            return NextResponse.json({
                message:"Error adding new note",
                error: error.message, 
            },
            {
                status:500,
            });
        }
    }
}