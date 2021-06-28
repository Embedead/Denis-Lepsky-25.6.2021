export const dayPraser = (day: number) => {
  let dayOfWeek = day % 7;
  switch (dayOfWeek) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "N/A";
  }
};

export const defaultForecast = [
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
];
