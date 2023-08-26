const originalDate = "2023-08-26";
const formattedDate = new Date(originalDate).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});
console.log(formattedDate); // 08/26/2023
