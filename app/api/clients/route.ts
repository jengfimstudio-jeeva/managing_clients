import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import Package from "@/models/Package";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get('packageId');
    
    let query = {};
    if (packageId) {
      query = { packageId };
    }
    
    const clients = await Client.find(query).populate('packageId').sort({ createdAt: -1 });
    return NextResponse.json({ clients });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();
    
    // Fetch package to get default task titles if any
    const pkg = await Package.findById(data.packageId);
    let tasks = [];
    
    if (pkg && pkg.defaultTaskTitles && pkg.defaultTaskTitles.length > 0) {
      tasks = pkg.defaultTaskTitles.map((title: string, index: number) => ({
        title,
        status: "not_completed",
        orderIndex: index + 1
      }));
    } else {
      // 15 blank tasks
      for (let i = 0; i < 15; i++) {
        tasks.push({
          title: "",
          status: "not_completed",
          orderIndex: i + 1
        });
      }
    }
    
    const clientData = {
      ...data,
      tasks
    };
    
    const newClient = await Client.create(clientData);
    return NextResponse.json({ client: newClient }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
