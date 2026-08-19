import Dropdown from "@/components/atoms/Dropdown";
import { ItemRequest, RequestStatus } from "@/lib/types/request";
import { formatDate } from "@/lib/utils/date";

interface RequestTableProps {
    requests: ItemRequest[];
    onStatusChange: (id: string, status: RequestStatus) => void;
}

export default function RequestTable({ requests, onStatusChange }: RequestTableProps) {
    return (
        <div className="w-full overflow-x-auto border-b border-gray-200">
            <table className="w-full border-collapse text-left">
                <thead className="bg-gray-50 text-gray-600">
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-3 text-sm font-medium">Name</th>
                        <th className="px-6 py-3 text-sm font-medium">Item Requested</th>
                        <th className="px-6 py-3 text-sm font-medium">Created</th>
                        <th className="px-6 py-3 text-sm font-medium">Updated</th>
                        <th className="px-6 py-3 text-sm font-medium">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.map((request) => (
                        <tr 
                            key={request._id}
                            className="border-b border-gray-200 text-sm text-gray-600"
                        >
                            <td className="px-6 py-2">{request.requestorName}</td>
                            <td className="px-6 py-2">{request.itemRequested}</td>
                            <td className="px-6 py-2">{formatDate(request.requestCreatedDate)}</td>
                            <td className="px-6 py-2">{formatDate(request.lastEditedDate ?? request.requestCreatedDate)}</td>
                            <td className="px-6 py-2">
                                <Dropdown
                                    value={request.status}
                                    onChange={(status) => onStatusChange(request._id, status)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}