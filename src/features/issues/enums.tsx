import React from "react";
import { SegmentOption } from "./components/SegmentControl";
import type { Issue } from "./types";
import PriorityDownIcon from "../../../assets/svgs/priority-down.svg";
import PriorityMediumIcon from "../../../assets/svgs/priority-medium.svg";
import PriorityUpIcon from "../../../assets/svgs/priority-up.svg";
import SystemRestartIcon from "../../../assets/svgs/system-restart.svg";
import CheckCircleIcon from "../../../assets/svgs/check-circle-solid.svg";

export const getPriorityOptions = (): SegmentOption<Issue["priority"]>[] => [
  {
    label: "Low",
    value: "low",
    icon: <PriorityDownIcon width={16} height={16} />,
  },
  {
    label: "Medium",
    value: "medium",
    icon: <PriorityMediumIcon width={16} height={16} />,
  },
  {
    label: "High",
    value: "high",
    icon: <PriorityUpIcon width={16} height={16} />,
  },
];

export const getStatusOptions = (): SegmentOption<Issue["status"]>[] => [
  {
    label: "Opened",
    value: "open",
    icon: <SystemRestartIcon width={16} height={16} />,
  },
  {
    label: "Closed",
    value: "closed",
    icon: <CheckCircleIcon width={16} height={16} />,
  },
];
