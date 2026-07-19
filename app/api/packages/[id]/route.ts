import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";
import Client from "@/models/Client";

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
