
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json();

        // ✅ Ensure required fields are present
        const requiredFields = ["firstName", "lastName", "streetAddress", "city", "province", "zipCode", "email", "phone", "products"];
        for (const field of requiredFields) {
            if (!requestBody[field] || requestBody[field] === "") {
                return NextResponse.json({ message: `Missing or empty field: ${field}` }, { status: 400 });
            }
        }

        console.log("📨 Received Request Data:", requestBody);

        // ✅ Static Sender (Business) Details
        const addressFrom = {
            name: "Test Business Name",
            street1: "123 Business Street",
            city: "Business City",
            state: "BC",
            zip: "12345",
            country: "US",
            phone: "1234567890",
            email: "business@example.com",
        };

        // ✅ Format Receiver Address
        const addressTo = {
            name: `${requestBody.firstName} ${requestBody.lastName}`,
            street1: requestBody.streetAddress,
            city: requestBody.city,
            state: requestBody.province, // Ensure uppercase state codes (CA, NY, TX, etc.)
            zip: requestBody.zipCode,
            country: "US",
            phone: requestBody.phone,
            email: requestBody.email,
        };

        console.log("📍 Formatted Address:", addressTo);

        // ✅ Validate State Code
        const validStateCodes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
        if (!validStateCodes.includes(addressTo.state)) {
            return NextResponse.json({ message: `Invalid state code: ${addressTo.state}. Use 2-letter US state codes.` }, { status: 400 });
        }

        // ✅ Convert checkout products into Shippo parcel format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parcels = requestBody.products.map((product: any) => ({
            length: "10",
            width: "5",
            height: "8",
            distance_unit: "in",
            weight: product.weight ? String(product.weight) : "2",
            mass_unit: "lb",
        }));

        console.log("📦 Parcel Data:", parcels);

        // ✅ Send request to Shippo API
        const response = await axios.post(
            "https://api.goshippo.com/shipments/",
            {
                address_from: addressFrom,
                address_to: addressTo,
                parcels,
                async: false,
            },
            {
                headers: {
                    Authorization: `ShippoToken shippo_test_09d4bc9bc25457f5044704d6a18b737a94208530`,
                    "Content-Type": "application/json",
                },
            }
        );

        // ✅ Log response for debugging
        console.log("📦 Shippo Response Data:", response.data);

        // ✅ Extract tracking number
        const shipment = response.data;
        const trackingNumber = shipment.tracking_number || shipment.object_id || null;

        if (!trackingNumber) {
            return NextResponse.json({ message: "Tracking number not found in response" }, { status: 500 });
        }

        return NextResponse.json({
            trackingNumber,
            eta: shipment.eta || "3-5 business days",
            message: "Shipment created successfully!",
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("❌ Error creating shipment:", error.response?.data || error.message);

        return NextResponse.json(
            { message: "Failed to create shipment", error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
