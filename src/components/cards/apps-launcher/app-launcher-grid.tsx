import AnchorIcon from "@/assets/icons/anchor-link";
import GridCard from "../../../shared/components/layout/grid-card";
import LauncherCard from "./app-launcher-item";
import LauncherData from "./app-launcher-data";

function LauncherGridCard({ className }: { className?: string }) {
  return (
    <GridCard
      className={className}
      icon={<AnchorIcon className="w-4.5 h-4.5" />}
      title="the Favorites"
    >
      {LauncherData.map((data) => (
        <LauncherCard key={data.title} {...data} />
      ))}

    </GridCard>
  );
}

export default LauncherGridCard;
