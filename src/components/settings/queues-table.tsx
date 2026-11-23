import { PenLine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarStack, ChipList, TableCard, th, tr } from "@/components/ui/data-display";
import { queues } from "@/lib/queues";

export function QueuesTable() {
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <Button>
          <Plus className="size-4" strokeWidth={1.8} />
          Create queue
        </Button>
      </div>

      <TableCard>
        <table className="w-full min-w-[760px] text-left text-[15px]">
          <thead>
            <tr>
              <th className={`${th} w-[23%]`}>Queue</th>
              <th className={`${th} w-[23%]`}>Phone number</th>
              <th className={`${th} w-[23%]`}>Channels</th>
              <th className={th}>Members</th>
              <th className={`${th} w-16`}>
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {queues.map((queue) => (
              <tr key={queue.id} className={tr}>
                <td className="px-5">{queue.name}</td>
                <td className="px-5">{queue.phoneNumber}</td>
                <td className="px-5">
                  <ChipList items={queue.channels} />
                </td>
                <td className="px-5">
                  <AvatarStack names={queue.members} />
                </td>
                <td className="px-5 text-right">
                  <button
                    type="button"
                    aria-label={`Edit ${queue.name} queue`}
                    className="rounded p-1 text-ink hover:bg-canvas"
                  >
                    <PenLine className="size-[18px]" strokeWidth={1.6} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
