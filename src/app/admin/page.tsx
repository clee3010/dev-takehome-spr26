"use client";
  
import { useEffect, useState } from "react";
import RequestTable from "@/components/tables/RequestTable";
import { ItemRequest, RequestStatus } from "@/lib/types/request";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import Pagination from "@/components/molecules/Pagination";

export default function ItemRequestsPage() {
  const [requests, setRequests] = useState<ItemRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const url = selectedStatus
          ? `/api/request?status=${selectedStatus}&page=${currentPage}`
          : `/api/request?page=${currentPage}`;

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch item requests");
        }

        const data: ItemRequest[] = await response.json();
        const total = Number(response.headers.get("X-Total-Count") || "0");

        setRequests(data);
        setTotalRecords(total);

      } catch {
        setError("Unable to load item requests");

      } finally {
        setIsLoading(false);
      }
    }
    
    fetchRequests();
  }, [selectedStatus, currentPage]);


  if (isLoading) {
    return <p>Loading item requests...</p>;
  }

  if (error) {
    return <p>{error}</p>
  }

  async function handleStatusChange(id: string, status: RequestStatus) {
    try {
      const response = await fetch('/api/request', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update request status");
      }

      const updatedRequest: ItemRequest = await response.json();

      if (selectedStatus && selectedStatus !== updatedRequest.status) {
        setRequests((currentRequests) =>
          currentRequests.filter((request) =>
            request._id !== updatedRequest._id
          )
        );

        setTotalRecords((currentTotal) => currentTotal - 1);

      } else {
        setRequests((currentRequests) => 
          currentRequests.map((request) =>
            request._id === updatedRequest._id ? updatedRequest : request
          )
        );
      }

    } catch {
      setError("Unable to update request status.");
    }
  }
  
  return (
    <main className="w-full px-8 py-10">
      <h1 className="mb-8 text-3xl font-bold">Item Requests</h1>
      
      <div className="mb-6 flex gap-2">
        <button onClick={() => {
          setSelectedStatus(null);
          setCurrentPage(1);
        }}>
          All
        </button>

        {Object.values(RequestStatus).map((status) => (
          <button
            key={status}
            onClick={() => {
              setSelectedStatus(status);
              setCurrentPage(1);
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <RequestTable
        requests={requests}
        onStatusChange={handleStatusChange}
      />

      <Pagination 
        pageNumber={currentPage}
        pageSize={PAGINATION_PAGE_SIZE}
        totalRecords={totalRecords}
        onPageChange={setCurrentPage}
      />
    </main>
  );
 }
