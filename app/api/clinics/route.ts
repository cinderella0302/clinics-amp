import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import Clinic from "@/model/clinics";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  // Bounding box parameters for geo-filtering
  const minLat = searchParams.get("minLat") ? parseFloat(searchParams.get("minLat")!) : undefined;
  const maxLat = searchParams.get("maxLat") ? parseFloat(searchParams.get("maxLat")!) : undefined;
  const minLng = searchParams.get("minLng") ? parseFloat(searchParams.get("minLng")!) : undefined;
  const maxLng = searchParams.get("maxLng") ? parseFloat(searchParams.get("maxLng")!) : undefined;

  try {
    await dbConnect();

    // Build query object for bounding box
    const query: Record<string, any> = {};
    if (minLat !== undefined && maxLat !== undefined && minLng !== undefined && maxLng !== undefined) {
      query["geometry.location.lat"] = { $gte: minLat, $lte: maxLat };
      query["geometry.location.lng"] = { $gte: minLng, $lte: maxLng };
    }

    // Fetch all clinics within the bounding box
    const clinics = await Clinic.find(query)
    // .select("geometry.location name");

    return NextResponse.json(clinics);
  } catch (error) {
    console.error("Error fetching clinic data:", error);
    return NextResponse.json(
      { message: "Error fetching clinic data" },
      { status: 500 }
    );
  }
}
