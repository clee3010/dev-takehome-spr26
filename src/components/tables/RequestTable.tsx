import Dropdown from "@/components/atoms/Dropdown";
import { ItemRequest, RequestStatus } from "@/lib/types/request";
    
interface RequestTableProps {
    requests: ItemRequest[];
    onStatusChange: (id: string, status: RequestStatus) => void;
}

export default function RequestTable({ requests, onStatusChange }: RequestTableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Item Requested</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.requestorName}</td>
                            <td>{request.itemRequested}</td>
                            <td>{request.requestCreatedDate}</td>
                            <td>{request.lastEditedDate ?? request.requestCreatedDate}</td>
                            <td>
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