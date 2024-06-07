import { DATE_FORMAT } from "../../../config/data.js";
import dayjs from "dayjs";

export const getFormatedStartDateEndDate = (duration) => {
  const startDate = new Date();
  let endDate = new Date(startDate);

  if (duration.days) {
    endDate.setDate(startDate.getDate() + duration.days);
  } else if (duration.months) {
    endDate.setMonth(startDate.getMonth() + duration.months);
    if (endDate.getDate() !== startDate.getDate()) {
      endDate.setDate(0);
    }
  } else if (duration.years) {
    endDate.setFullYear(startDate.getFullYear() + duration.years);
  }

  return {
    startDate: {
      timestamp: startDate.getTime(),
      format: dayjs(startDate).format(DATE_FORMAT)
    },
    endDate: {
      timestamp: endDate.getTime(),
      format: dayjs(endDate).format(DATE_FORMAT)
    }
  }
}