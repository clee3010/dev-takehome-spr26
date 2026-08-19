"use client";

import { useState } from "react";
import { RequestStatus } from "@/lib/types/request";

const statusStyles: Record<RequestStatus, string> = {
    [RequestStatus.PENDING]: "bg-orange-100 text-orange-700",
    [RequestStatus.APPROVED]: "bg-yellow-100 text-yellow-700",
    [RequestStatus.COMPLETED]: "bg-green-100 text-green-700",
    [RequestStatus.REJECTED]: "bg-red-100 text-red-700",
};

interface DropdownProps {
    value: RequestStatus;
    onChange: (status: RequestStatus) => void;
}

export default function Dropdown({ value, onChange }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    function formatStatus(status: RequestStatus): string {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    return (
        <div className="relative w-48">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-md border border-gray-200 px-3 py-1.5"
            >
                <span className={`rounded-full px-2 py-1 ${statusStyles[value]}`}>
                    ● {formatStatus(value)}
                </span>
                <span>{isOpen ? "⌃" : "⌄"}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-1 w-full rounded-md border bg-white p-2 shadow-md">
                    {Object.values(RequestStatus).map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => {
                                onChange(status);
                                setIsOpen(false);
                            }}
                            className="flex w-full px-2 py-1 rounded hover:bg-gray-50"
                        >
                            <span className={`rounded-full px-2 py-1 text-sm ${statusStyles[status]}`}>
                                ● {formatStatus(status)}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}