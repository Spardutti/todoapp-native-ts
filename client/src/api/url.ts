let url: string = "";

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:5000/api";
} else url = "";

export default url;
