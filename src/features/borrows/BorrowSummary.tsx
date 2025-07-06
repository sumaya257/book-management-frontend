import { useGetSummaryQuery } from './borrowApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type BorrowSummaryRow = {
  _id: string;
  title: string;
  isbn: string;
  totalQuantity: number;
};

export default function BorrowSummary() {
const { data: summary = [], error, isLoading } = useGetSummaryQuery(undefined);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">📚 Borrow Summary</h1>

      {/* Backend error alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load borrow summary. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Loading message */}
      {isLoading && <p className="text-center text-gray-500">Loading summary...</p>}

      {/* No data message */}
      {!isLoading && summary.length === 0 && (
        <p className="text-center text-gray-500">No borrow records found.</p>
      )}

      {summary.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-700 max-w-full">
          <Table className="min-w-[600px] w-full">
            <TableHeader>
              <TableRow className="bg-zinc-400 text-white">
                <TableHead className="whitespace-nowrap">Book Title</TableHead>
                <TableHead className="whitespace-nowrap">ISBN</TableHead>
                <TableHead className="whitespace-nowrap">Total Quantity Borrowed</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {summary.map((row: BorrowSummaryRow) => (
                <TableRow key={row._id} className="hover:bg-zinc-800">
                  <TableCell className="whitespace-nowrap">{row.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.isbn}</TableCell>
                  <TableCell>{row.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
