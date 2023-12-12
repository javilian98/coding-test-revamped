export const headCells = [
  {
    id: "app",
    numeric: false,
    disablePadding: false,
    label: "App",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "Rating",
  },
  {
    id: "reviews",
    numeric: true,
    disablePadding: false,
    label: "Reviews",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size",
  },
  {
    id: "installs",
    numeric: true,
    disablePadding: false,
    label: "Installs",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "contentRating",
    numeric: true,
    disablePadding: false,
    label: "Content Rating",
  },
  {
    id: "genres",
    numeric: false,
    disablePadding: false,
    label: "Genres",
  },
  {
    id: "lastUpdated",
    numeric: true,
    disablePadding: false,
    label: "Last Updated",
  },
  {
    id: "currentVersion",
    numeric: true,
    disablePadding: false,
    label: "Current Version",
  },
  {
    id: "androidVersion",
    numeric: true,
    disablePadding: false,
    label: "Android Version",
  },
];

export const columnOptions = headCells.filter((column) => {
  if (column.id === "app" || column.id === "type" || column.id === "genres") {
    return {
      id: column.id,
      label: column.label,
      numeric: column.numeric,
    };
  }
});

export const operatorOptions = [
  {
    id: "equal",
    label: "contains",
  },
  {
    id: "not_equal",
    label: "not contain",
  },
  {
    id: "greater",
    label: ">",
  },
  {
    id: "lesser",
    label: "<",
  },
];
