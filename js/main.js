const startYear = 1997;
const endYear = 2014;

const grid = document.getElementById("year-grid");

for (let year = startYear; year <= endYear; year++) {
    const link = document.createElement("a");

    link.className = "year-card";
    link.href = `years/${year}.html`;
    link.textContent = year;

    grid.appendChild(link);
}