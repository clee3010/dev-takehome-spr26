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

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-md border px-3 py-2"
            >
                <span className={`rounded-full px-2 py-1 ${statusStyles[value]}`}>
                    ● {value}
                </span>
                <span>⌄</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-white p-2 shadow-md">
                    {Object.values(RequestStatus).map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => {
                                onChange(status);
                                setIsOpen(false);
                            }}
                            className="flex w-full px-2 py-1"
                        >
                            <span className={`rounded-full px-2 py-1 ${statusStyles[status]}`}>
                                ● {status}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}