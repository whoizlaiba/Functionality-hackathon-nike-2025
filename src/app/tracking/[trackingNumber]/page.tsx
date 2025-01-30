
'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TrackingPage = () => {
    const { trackingNumber } = useParams();
    interface TrackingData {
        tracking_number: string;
        carrier: string;
        servicelevel: {
            name: string;
        };
        eta: string;
        tracking_status: {
            status_details: string;
            location?: {
                city: string;
                state: string;
                zip: string;
                country: string;
            };
        };
        tracking_history: {
            status_details: string;
            status_date: string;
        }[];
    }

    const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!trackingNumber) return;

        const fetchTrackingData = async () => {
            try {
                const response = await fetch(`/api/tracking/${trackingNumber}`);
                if (!response.ok) throw new Error("Tracking data not found");
                const data = await response.json();
                setTrackingData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        fetchTrackingData();
    }, [trackingNumber]);

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold  mb-6">Tracking Details</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {trackingData ? (
                <div className="bg-white shadow-lg grid grid-cols-3 rounded-lg gap-4">
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Tracking Number</p>
                        <p className="text-gray-700">{trackingData.tracking_number}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Carrier</p>
                        <p className="text-gray-700">{trackingData.carrier}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Service Level</p>
                        <p className="text-gray-700">{trackingData.servicelevel.name}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Estimated Arrival</p>
                        <p className="text-gray-700">{new Date(trackingData.eta).toLocaleString()}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Current Status</p>
                        <p className="text-gray-700">{trackingData.tracking_status.status_details}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Current Location</p>
                        {trackingData.tracking_status.location ? (
                            <p className="text-gray-700">
                                {trackingData.tracking_status.location.city}, {trackingData.tracking_status.location.state}, {trackingData.tracking_status.location.zip}, {trackingData.tracking_status.location.country}
                            </p>
                        ) : (
                            <p className="text-gray-500">Location not available</p>
                        )}
                    </div>
                    <h2 className="text-2xl font-semibold mt-4 mb-2 col-span-full ">Tracking History</h2>
                    <ul className="border rounded-md overflow-hidden grid grid-cols-2 gap-x-5 gap-y-2 my-3 col-span-full ">
                        {trackingData.tracking_history.map((event, index) => (
                            <li key={index} className=" border-b last:border-none">
                                <p className="text-gray-700 font-medium text-sm">{event.status_details}</p>
                                <p className="text-sm text-gray-500">{new Date(event.status_date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading tracking information...</p>
            )}
        </div>
    );
};

export default TrackingPage;
