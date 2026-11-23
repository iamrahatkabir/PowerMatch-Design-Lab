"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, Chip, TableCard, th, tr } from "@/components/ui/data-display";
import { users as initialUsers } from "@/lib/users";

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = q
    ? users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    : users;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <label className="w-full max-w-[320px]">
          <span className="sr-only">Search with name or email</span>
          <input
            type="search"
            placeholder="Search with name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-line bg-white px-3 text-[14.5px] outline-none placeholder:text-[#98a2b3] focus:border-[#98a2b3]"
          />
        </label>
        <Button>
          <Plus className="size-4" strokeWidth={1.8} />
          Add members
        </Button>
      </div>

      <TableCard>
        <table className="w-full min-w-[760px] text-left text-[15px]">
          <thead>
            <tr>
              <th className={`${th} w-[23%]`}>Name</th>
              <th className={`${th} w-[23%]`}>Email</th>
              <th className={`${th} w-[23%]`}>Last log in</th>
              <th className={th}>Member since</th>
              <th className={`${th} w-16`}>
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((user) => (
              <tr key={user.id} className={tr}>
                <td className="px-5">
                  <span className="flex items-center gap-2.5">
                    <Avatar name={user.name} className="size-7" />
                    {user.name}
                  </span>
                </td>
                <td className="px-5">{user.email}</td>
                <td className="px-5">{user.lastLogin ?? "--"}</td>
                <td className="px-5">{user.memberSince ?? <Chip>Invitation sent</Chip>}</td>
                <td className="px-5 text-right">
                  <button
                    type="button"
                    aria-label={`Remove ${user.name}`}
                    onClick={() => setUsers((all) => all.filter((u) => u.id !== user.id))}
                    className="rounded p-1 text-ink hover:bg-canvas"
                  >
                    <Trash2 className="size-[18px]" strokeWidth={1.6} />
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr className={tr}>
                <td colSpan={5} className="px-5 text-center text-muted">
                  No users match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
