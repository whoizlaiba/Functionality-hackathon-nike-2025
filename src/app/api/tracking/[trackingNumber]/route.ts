


import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, { params }: { params: { trackingNumber: string } }) {
    try {
        const { trackingNumber } = params;

        if (!trackingNumber) {
            return NextResponse.json({ message: "Tracking number is required" }, { status: 400 });
        }

        // ✅ Correct API URL format
        const response = await axios.get(`https://api.goshippo.com/tracks/shippo/${trackingNumber}`, {
            headers: {
                Authorization: `ShippoToken shippo_test_09d4bc9bc25457f5044704d6a18b737a94208530`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("❌ Error fetching tracking data:", error.response?.data || error.message);
        return NextResponse.json(
            { message: "Tracking information not found", error: error.response?.data || error.message },
            { status: 404 }
        );
    }
}



































