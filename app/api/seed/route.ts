import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

export async function GET() {
  try {
    await dbConnect();
    
    const defaultPackages = [
      { name: "AI-Integrated Video Editing", slug: "ai-integrated-video-editing", description: "State-of-the-art AI workflows to deliver premium cuts in record time." },
      { name: "Monthly Package", slug: "monthly-package", description: "Retainer-based enterprise video solutions for continuous content delivery." },
      { name: "Video Editing and Handling", slug: "video-editing-and-handling", description: "End-to-end post-production and digital asset management." }
    ];

    const results = [];
    for (const pkg of defaultPackages) {
      let existing = await Package.findOne({ slug: pkg.slug });
      if (!existing) {
        const created = await Package.create(pkg);
        results.push(created);
      }
    }

    return NextResponse.json({ success: true, message: "Default packages seeded", newPackages: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
