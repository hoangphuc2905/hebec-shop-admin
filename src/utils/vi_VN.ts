import moment from "moment";
import "moment/locale/vi";
import viVN from "antd/es/locale/vi_VN";
import { Locale } from "antd/es/locale-provider";

moment.locale("vi");

const viVNLocale: Locale = {
  ...viVN,
  DatePicker: {
    ...viVN.DatePicker,
    // @ts-ignore
    lang: {
      ...(viVN.DatePicker?.lang ?? {}),
      placeholder: "Chọn thời điểm",
      yearPlaceholder: "Chọn năm",
      quarterPlaceholder: "Chọn quý",
      monthPlaceholder: "Chọn tháng",
      weekPlaceholder: "Chọn tuần",
      rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
      rangeYearPlaceholder: ["Năm bắt đầu", "Năm kết thúc"],
      rangeQuarterPlaceholder: ["Quý bắt đầu", "Quý kết thúc"],
      rangeMonthPlaceholder: ["Tháng bắt đầu", "Tháng kết thúc"],
      rangeWeekPlaceholder: ["Tuần bắt đầu", "Tuần kết thúc"],
      shortWeekDays: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
      shortMonths: [
        "Th1",
        "Th2",
        "Th3",
        "Th4",
        "Th5",
        "Th6",
        "Th7",
        "Th8",
        "Th9",
        "Th10",
        "Th11",
        "Th12",
      ],
    },
  },
};

export default viVNLocale;
