import { cn } from "@/lib/utils";
import { TabsName } from "@/types/tabstypes/tabs";

export function TabsDock({
  activeTab,
  switchTab,
  tabsName,
}: {
  activeTab: string;
  switchTab: (tab: string) => void;
  tabsName: TabsName;
}) {
  return (
    <div className="bottom-5 bg-glass bg-white/5 rounded-md p-2 flex gap-2 max-w-md fixed animfast hover:scale-105 hover:-translate-y-1">
      {Object.entries(tabsName).map(([key, value]) => (
        <div
          key={key}
          className={cn(
            "p-2  cursor-pointer rounded-md w-10 aspect-square flex-center bg-glass text-white/70 hover:scale-105 hover:-translate-y-1 anim",
            activeTab === value.name ? "bg-white/10" : "bg-white/5"
          )}
          onClick={() => {
            switchTab(value.name);
          }}
        >
          <value.icon />
        </div>
      ))}
    </div>
  );
}
