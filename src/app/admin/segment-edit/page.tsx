import { PageTitle } from "@/components/page-title";
import SegmentEdit from "./edit-segment";

import examplejson from "./exmaple-segment.json"


export default function Page() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title="Edit Segment" />

      <div className="flex w-screen justify-center pb-20">
        <SegmentEdit initialSegmentData={examplejson}/>
      </div>
    </div>
  );
}
