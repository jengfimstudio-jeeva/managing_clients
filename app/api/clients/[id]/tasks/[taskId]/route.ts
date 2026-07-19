import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";

export async function PATCH(req: Request, { params }: { params: { id: string, taskId: string } }) {
  try {
    const { id, taskId } = params;
    const { title, status } = await req.json();
    await dbConnect();
    
    const client = await Client.findOneAndUpdate(
      { _id: id, "tasks._id": taskId },
      { 
        $set: { 
          "tasks.$.title": title,
          "tasks.$.status": status
        } 
      },
      { new: true }
    );
    
    return NextResponse.json({ client });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
