import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await req.json();
    await dbConnect();
    
    const client = await Client.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ client });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await dbConnect();
    
    const client = await Client.findById(id).populate('packageId');
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
    
    return NextResponse.json({ client });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await dbConnect();
    
    const client = await Client.findByIdAndDelete(id);
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
