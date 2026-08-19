"use client";
  
import { useEffect, useState } from "react";
import RequestTable from "@/components/tables/RequestTable";
import { ItemRequest, RequestStatus } from "@/lib/types/request";

export default function ItemRequestsPage() {
  const [requests, setRequests] = useState<ItemRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('/api/request');
        
        if (!response.ok) {
          throw new Error("Failed to fetch item requests");
        }

        const data: ItemRequest[] = await response.json();
        setRequests(data);

      } catch {
        setError("Unable to load item requests")

      } finally {
        setIsLoading(false);
      }
    }
    
    fetchRequests();
  }, []);


  if (isLoading) {
    return <p>Loading item requests...</p>;
  }

  if (error) {
    return <p>{error}</p>
  }
  
  return (
    <main className="w-full px-8 py-10">
      <h1 className="mb-8 text-3xl font-bold">Item Requests</h1>

      <RequestTable
        requests={requests}
        onStatusChange={(id: string, status: RequestStatus) => {
          console.log(id, status);
        }}
      />
    </main>
  )
 }
