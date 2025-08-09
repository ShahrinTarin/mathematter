import { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
} from '@tanstack/react-table';
import Loader from './Loader';
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";

const BlogTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sorting, setSorting] = useState([]);

    const columns = useMemo(() => [
        {
            accessorKey: 'title',
            header: 'Blog Title',
            cell: info => (
                <div className="font-medium text-[#1b9c85] hover:underline dark:text-[#4cd7b5]">
                    {info.getValue()}
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Blog Category',
            cell: info => (
                <span className="px-2 py-1 bg-[#EDF6EE] dark:bg-gray-700 rounded-md text-sm capitalize">
                    {info.getValue()}
                </span>
            ),
        },
        {
            accessorKey: 'short_description',
            header: 'Blog Short Description',
            cell: info => <div className="dark:text-gray-300">{info.getValue()}</div>,
        },
        {
            accessorKey: 'image',
            header: 'Blog Image',
            cell: info => (
                <img
                    src={info.getValue()}
                    alt="Blog"
                    className="w-16 h-10 object-cover rounded border border-gray-200 dark:border-gray-700"
                />
            ),
        },
    ], []);

    useEffect(() => {
        const fetchblogs = async () => {
            try {
                const blogs = await fetch('https://assignment-11-server-two-drab.vercel.app/topblogs');
                const result = await blogs.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchblogs();
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4">
                <div className="flex">
                    <div className="ml-3">
                        <p className="text-sm text-red-700 dark:text-red-200">Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-900 mb-16 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mt-5 mb-9">
                Top 10 Blogs
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-100">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <TbSortAscending2 />,
                                                desc: <TbSortDescending2 />,
                                            }[header.column.getIsSorted()] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogTable;
