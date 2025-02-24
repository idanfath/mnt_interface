import { Favicon } from "@/components/custom/favicon/Favicon";
import ContextMenuWrap from "@/components/wrapper/contextmenuwrap";
import { iconMap } from "@/consts/shortcuts";
import { cn, openUrl, ellipsis, getUrlDomain } from "@/lib/utils";
import { Shortcut, shortcutModifyFunction } from "@/types/tabstypes/shortcuts";
import { Pin, Globe } from "lucide-react";

export default function ShortcutCard({
  shortcut,
  modify,
}: {
  shortcut: Shortcut;
  modify: shortcutModifyFunction;
}) {
  const Icon = shortcut.pinned ? Pin : iconMap[shortcut.icon] || Globe;
  return (
    <ContextMenuWrap
      items={[
        {
          children: shortcut.pinned ? "Unpin" : "Pin",
          props: {
            onClick: modify(shortcut.id).togglePin,
          },
        },
        { children: "Edit" },
        {
          children: "Delete",
          props: {
            className: "text-red-500",
            onClick: modify(shortcut.id).remove,
          },
        },
      ]}
    >
      <div
        className={cn(
          "bg-glass bg-white/10 p-2 rounded-md flex-col cursor-pointer flex border border-white/10  hover:bg-white/[0.08] animfast",
          "w-32 aspect-square"
        )}
        onClick={() => {
          openUrl(shortcut.url);
        }}
      >
        <div className="flex h-full flex-col gap-1">
          <div className="flex gap-1.5 items-center">
            <div className="rounded-full bg-white/15 w-7 flex-center h-7 aspect-square">
              {shortcut.pinned ? (
                <Pin size={18} />
              ) : (
                <Favicon
                  url={shortcut.url}
                  size={18}
                  fallback={<Icon size={18} />}
                />
              )}
            </div>
            <div className="text-sm text-gray-50">{shortcut.name}</div>
          </div>
          <div className="text-gray-300 text-sm">
            {ellipsis(shortcut.description || "", 20)}
          </div>
          <div className="text-white/50 text-nowrap text-[0.8rem]">
            {ellipsis(getUrlDomain(shortcut.url), 20)}
          </div>
          <div className="text-white/20 h-full flex items-end text-nowrap text-[0.6rem]">
            Created {new Date(shortcut.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </ContextMenuWrap>
  );
}
