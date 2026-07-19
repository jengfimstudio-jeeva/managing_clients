import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";
import Client from "@/models/Client";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await req.json();
    await dbConnect();
    
    const updatedPackage = await Package.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    return NextResponse.json({ package: updatedPackage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await dbConnect();
    
    // Check if package has clients
    const clientsCount = await Client.countDocuments({ packageId: id });
    if (clientsCount > 0) {
      return NextResponse.json({ error: "Cannot delete a package that has active clients. Please delete or reassign the clients first." }, { status: 400 });
    }

    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
