import { TableCell } from "../ui/table";

import { TableRow } from "../ui/table";

const TableRowSkeleton = () => {
  return (
    <TableRow className="h-10">
      <TableCell className="font-medium">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-600/20 rounded animate-pulse" />
          <div className="w-4 h-4 bg-gray-600/20 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-600/20 rounded animate-pulse" />
        </div>
      </TableCell>
      <TableCell>
        <div className="w-48 h-4 bg-gray-600/20 rounded animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="w-[60px] h-[60px] bg-gray-600/20 rounded mx-auto animate-pulse" />
      </TableCell>
      <TableCell className="text-right">
        <div className="w-20 h-4 bg-gray-600/20 rounded ml-auto animate-pulse" />
      </TableCell>
      <TableCell className="text-right">
        <div className="w-20 h-4 bg-gray-600/20 rounded ml-auto animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="w-8 h-8 bg-gray-600/20 rounded ml-auto animate-pulse" />
      </TableCell>
    </TableRow>
  );
};

export default TableRowSkeleton;
