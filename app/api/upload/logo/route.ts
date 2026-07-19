import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Since this is a template and Cloudinary credentials might not be configured,
    // we'll simulate a successful upload for the UI demo purposes.
    // In production, integrate cloudinary sdk here:
    // const uploadResponse = await cloudinary.uploader.upload(...)

    return NextResponse.json({ 
      success: true, 
      url: "https://res.cloudinary.com/demo/image/upload/sample.jpg" 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
