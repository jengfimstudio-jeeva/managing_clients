import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

export async function GET() {
  try {
    await dbConnect();
    const packages = await Package.find({ isArchived: false }).sort({ createdAt: 1 });
    return NextResponse.json({ packages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, isCustom, defaultTaskTitles } = await req.json();
    await dbConnect();
    
    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Check if slug exists
    let existing = await Package.findOne({ slug });
    if(existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const newPackage = await Package.create({
      name,
      slug,
      description,
      isCustom: isCustom || false,
      defaultTaskTitles: defaultTaskTitles || [],
    });
    return NextResponse.json({ package: newPackage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
