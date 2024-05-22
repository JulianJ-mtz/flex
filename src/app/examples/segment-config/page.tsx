import { PageTitle } from "@/components/page-title";

import { CreateSegments } from "./Segment";

export default function Page() {
  return (
    <>
      <PageTitle title="Create Segment" />

      <div className="flex w-screen justify-center pb-20">
        <CreateSegments />
      </div>
    </>
  );
}