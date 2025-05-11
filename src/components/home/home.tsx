"use client";

import PreviewAboutCard from "@/components/cards/about/preview-about";
import LinksGridCard from "@/components/cards/links/links-grid";
import GridCards from "@/shared/components/layout/grid-cards";
import DayStatsCard from "../cards/apps/day-stats";
import FlowDiagramm from "../cards/apps/flow-diagram";

export default function Home() {
  return (
    <div className="flex flex-col">
      <GridCards title="About">
        <PreviewAboutCard className="col-span-3 md:col-span-2" />
        <LinksGridCard className="col-span-3 md:col-span-1" />
      </GridCards>
      {/* <GridCards className="!grid-cols-1" title="Presented">
        <PreviewAppsList />
      </GridCards> */}
      <GridCards className="!grid-cols-1" title="Energie Management">
        <FlowDiagramm />
      </GridCards>
      <GridCards title="Tag Stats">
        <DayStatsCard />
      </GridCards>
      {/* <GridCards title="WebApps Launcher">
        <LauncherGridCard className="col-span-3 md:col-span-6" />
      </GridCards> */}
    </div>
  );
}
