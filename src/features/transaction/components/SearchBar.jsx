"use client";
import { Search } from "lucide-react";

export default function SearchBar({setFilterType, setSearchTerm, filterType, searchTerm}) {

    return (
        <div className="flex gap-2 md:w-auto">
            <div className="relative md:w-64 flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border border-gray-200 rounded-lg text-sm pl-10 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div>
                <select className="w-full border border-gray-200 text-gray-500 cursor-pointer rounded-lg text-sm px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="income">Income</option>
                    <option value="outcome">Outcome</option>
                </select>
            </div>
            <div>
                <select className="w-full border border-gray-200 text-gray-500 cursor-pointer rounded-lg text-sm px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="outcome">Outcome</option>
                </select>
            </div>
        </div>
    );
}
