"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ComboboxDropdown } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  LoopRow,
  SegmentRow,
  Row,
  Id,
  IDropdown,
  optionsUsage,
  getLoops,
  getSegments,
} from "./doc-types";

import {
  MinusCircle,
  Pencil,
  ChevronRight,
  PlusCircle,
  GripVertical,
} from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  row: Row;
  allRows: Row[];
  // isLoop: boolean;
  deleteRow: (id: Id) => void;
  handleSelect: (
    id: Id,
    option: IDropdown,
    value: keyof Row,
    parentId?: Id
  ) => void; // Note that the keyof is now Row
  handleInputChange: (
    id: Id,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addSegmentsToLoop: (loopId: Id) => void;
  addLoopToLoop: (loopId: Id) => void;
  parentId?: Id;
}

export default function RowContainer(props: Props) {
  const [showSegmentLoops, setShowSegmentLoops] = React.useState<{
    [key: string]: boolean;
  }>({});

  const {
    row,
    deleteRow,
    handleSelect,
    handleInputChange,
    addSegmentsToLoop,
    addLoopToLoop,
    parentId,
    allRows,
  } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
    data: {
      type: "Row",
      row,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="h-20"></div>;
  }

  const isLoop = (row: SegmentRow | LoopRow): row is LoopRow =>
    "segments" in row;

  const segments = getSegments();
  const loops = getLoops();

  const toggleRules = (loopId: Id) => {
    setShowSegmentLoops((prevShowLoops) => ({
      ...prevShowLoops,
      [loopId]: !prevShowLoops[loopId],
    }));
  };

  return (
    <>
      {!isLoop(row) ? (
        <>
          <div
            className="flex flex-row justify-around  h-20 px-5"
            ref={setNodeRef}
            style={style}
          >
            {!row.LoopId ? (
              <div className=" flex items-center justify-start w-1/10">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-start"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical />
                </Button>
              </div>
            ) : (
              <div></div>
            )}

            <div className=" flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <ComboboxDropdown
                  content={segments}
                  handleSelect={(option: IDropdown) => {
                    handleSelect(row.id, option, "name");
                  }}
                  selected={segments.find(
                    (option) => option.label === row.name
                  )}
                />
              </div>
            </div>

            <div className=" flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <ComboboxDropdown
                  content={optionsUsage}
                  handleSelect={(option: IDropdown) => {
                    handleSelect((row as SegmentRow).id, option, "mandatory");
                  }}
                  selected={optionsUsage.find(
                    (option) => option.label === (row as SegmentRow).mandatory
                  )}
                />
              </div>
            </div>

            <div className=" flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <Input
                  type="number"
                  name="max"
                  value={row.max}
                  onChange={(event) => handleInputChange(row.id, event)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-1/10 gap-x-8">
              <Button variant={"ghost"} size={"icon"}>
                <Pencil />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteRow(row.id);
                }}
              >
                <MinusCircle className=" fill-red-300 dark:fill-red-800" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex flex-row justify-around  h-20 bg-slate-400/10 px-5"
            ref={setNodeRef}
            style={style}
          >
            {!row.ParentId ? (
              <div className=" flex items-center justify-start w-1/10">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-start"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical />
                </Button>
              </div>
            ) : (
              <div></div>
            )}
            <div className=" flex items-center justify-start w-1/10 ">
              <Button
                className="flex items-center space-x-2 "
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  toggleRules(row.id);
                  console.log(showSegmentLoops[row.id]);
                }}
              >
                <ChevronRight
                  className={`transition-transform transform ${
                    showSegmentLoops[row.id] ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </div>

            <div className=" flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <ComboboxDropdown
                  content={loops}
                  handleSelect={(option: IDropdown) => {
                    handleSelect(row.id, option, "name");
                  }}
                  selected={loops.find((option) => option.label === row.name)}
                />
              </div>
            </div>

            <div className=" flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <Input
                  type="number"
                  name="max"
                  value={row.max}
                  onChange={(event) => handleInputChange(row.id, event)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-1/10 gap-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <PlusCircle className="fill-green-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => {
                      addSegmentsToLoop(row.id),
                        setShowSegmentLoops((prevShowLoops) => ({
                          ...prevShowLoops,
                          [row.id]: true,
                        }));
                    }}
                  >
                    Add segment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      addLoopToLoop(row.id);
                      setShowSegmentLoops((prevShowLoops) => ({
                        ...prevShowLoops,
                        [row.id]: true,
                      }));
                    }}
                  >
                    Add Loop
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteRow(row.id);
                }}
              >
                <MinusCircle className="  fill-red-300 dark:fill-red-800" />
              </Button>
            </div>
          </div>
          {showSegmentLoops[row.id] && (
            <>
              {row.segments.map((segment) => (
                <div
                  key={segment.id}
                  className={`border-s ms-10 ${
                    row.segments.indexOf(segment) !== 0 ? "border-t" : ""
                  }`}
                >
                  <RowContainer
                    key={segment.id}
                    row={segment}
                    allRows={allRows}
                    deleteRow={deleteRow}
                    handleSelect={handleSelect}
                    handleInputChange={handleInputChange}
                    addSegmentsToLoop={addLoopToLoop}
                    addLoopToLoop={addLoopToLoop}
                    parentId={row.id}
                  />
                </div>
              ))}

              {row.internLoops &&
                row.internLoops.map((loop) => (
                  <div key={loop.id} className=" border-s  ms-10">
                    <RowContainer
                      key={loop.id}
                      row={loop}
                      allRows={allRows}
                      deleteRow={deleteRow}
                      handleSelect={handleSelect}
                      handleInputChange={handleInputChange}
                      addSegmentsToLoop={addSegmentsToLoop}
                      addLoopToLoop={addLoopToLoop}
                      parentId={row.id}
                    />
                  </div>
                ))}
            </>
          )}
        </>
      )}
    </>
  );
}
