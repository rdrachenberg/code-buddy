import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const systemPrompt = 'You are an expert TailwindCSS developer. A user will provide you with a low-fidelity wireframe of an application and you will return a single HTML file that uses TailwindCSS to create the website. Use creative license to make the application more complete. If you need to insert an image, use the service placehold.co to create a placeholder image. Respond only with HTML file.';

export async function POST(request: Request){
    const { image } = await request.json();
    // console.log(process.env.OPENAI_API_KEY);
    // console.log(image);

    if((!image)) {
        return NextResponse.json('No image provided', {
            status: 400,
        })
    }
    
    try {    
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            // max_tokens: 4096,
            //provide a prompt to the system 
                //this is where we provide instructions 
            messages: [
                {
                    role: "user",
                    content: [
                        { type: 'text', text: systemPrompt},
                        { type: 'image_url', 
                            image_url: {
                                url: image,
                                detail: 'auto'
                            }
                        }
                    ]
                }  
            ],
        });

        return NextResponse.json(completion);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json('There was an Internal Server Error', {status: 500});
    }

    
}