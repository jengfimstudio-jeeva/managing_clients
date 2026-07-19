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
    
    const allClients = await Client.find(query).populate('packageId').sort({ createdAt: -1 });
    
    // --- Auto Rollover Logic ---
    // Automatically duplicate clients into the new month with reset tasks (status 0)
    const currentMonthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const latestClientsMap = new Map();
    
    for (const client of allClients) {
      const key = `${client.enterpriseName}-${client.customerName}`;
      if (!latestClientsMap.has(key)) {
        latestClientsMap.set(key, client);
      }
    }

    let clonedCount = 0;
    for (const latestClient of latestClientsMap.values()) {
      const clientMonthYear = new Date(latestClient.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
      
      // If the latest record is from an older month, create a fresh one for this month!
      if (clientMonthYear !== currentMonthYear) {
        const resetTasks = latestClient.tasks.map((t: any) => ({
          title: t.title,
          status: "not_completed",
          orderIndex: t.orderIndex
        }));

        await Client.create({
          enterpriseName: latestClient.enterpriseName,
          customerName: latestClient.customerName,
          address: latestClient.address,
          phone: latestClient.phone,
          email: latestClient.email,
          packageId: latestClient.packageId._id || latestClient.packageId,
          tasks: resetTasks,
          createdAt: new Date(), // New month timestamp
        });
        clonedCount++;
      }
    }

    let finalClients = allClients;
    if (clonedCount > 0) {
      finalClients = await Client.find(query).populate('packageId').sort({ createdAt: -1 });
    }
    // ---------------------------

    return NextResponse.json({ clients: finalClients });
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
