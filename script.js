let currentID = 1;
const rowData = [];

function generateID() {
  return currentID++;
}

function handleButtonClick(e) {
  const target = e.target;
  if (target.classList.contains("save-row")) {
    const row = target.closest("tr");
    if (row) {
      const startDateInput = row.querySelector(".start-date");
      const endDateInput = row.querySelector(".end-date");
      const leadCountInput = row.querySelector(".lead-count");
      const monthYearCell = row.querySelector(".month-year");
      const numDaysCell = row.querySelector(".num-days");
      const expectedDrrCell = row.querySelector(".expected-drr");
      const excludedDatesInput = row.querySelector(".dates-excluded");

      if (!startDateInput.value || !endDateInput.value || !leadCountInput.value) {
        alert("Please fill in Start Date, End Date, and Lead Count before saving.");
        return;
      }

      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);

      if (startDate >= endDate) {
        alert("End Date should be after Start Date.");
        return;
      }

      const excludedDates = excludedDatesInput.value
        .split(",")
        .map((date) => date.trim())
        .filter(Boolean);

      // Calculate the excluded dates and print to the console
      const excludedDatesStr = excludedDates.join(", ");
      console.log("Excluded Dates: " + excludedDatesStr);

      // Calculate the number of days
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) - excludedDates.length;
      numDaysCell.textContent = daysDiff;

      const leadCount = parseInt(leadCountInput.value);
      const numDays = parseInt(numDaysCell.textContent);

      if (numDays <= 0) {
        alert("The calculated number of days is zero or negative. Please adjust the dates and excluded dates.");
        return;
      }

      const expectedDrr = leadCount / numDays;
      expectedDrrCell.textContent = expectedDrr.toFixed(0);

      const rowObject = {
        id: generateID(),
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        monthYear: monthYearCell.textContent,
        excludedDates: excludedDatesStr,
        leadCount: leadCountInput.value,
        numDays: numDaysCell.textContent,
        expectedDrr: expectedDrrCell.textContent,
        lastUpdated: new Date().toLocaleString(),
      };

      rowData.push(rowObject);

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td><button class="delete-row">Delete</button></td>
        <td>${rowObject.id}</td>
        <td>${rowObject.startDate}</td>
        <td>${rowObject.endDate}</td>
        <td class="month-year">${rowObject.monthYear}</td>
        <td class="dates-excluded">${rowObject.excludedDates}</td>
        <td class="num-days">${rowObject.numDays}</td>
        <td>${rowObject.leadCount}</td>
        <td class="expected-drr">${rowObject.expectedDrr}</td>
        <td class="last-updated">${rowObject.lastUpdated}
            <button class="save-row">Save</button>
            <button class="cancel-row">Cancel</button>
        </td>
      `;

      const dataRows = document.getElementById("data-rows");
      dataRows.appendChild(newRow);
      row.style.display = "none";
    }
  } else if (target.classList.contains("cancel-row")) {
    const row = target.closest("tr");
    if (row) {
      if (confirm("Are you sure you want to cancel this entry?")) {
        row.remove();
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const addNewButton = document.getElementById("add-new-button");
  addNewButton.addEventListener("click", addNewRow);

  function addNewRow() {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><button class="delete-row">Delete</button></td>
        <td>Generated ID</td>
        <td><input type="date" class="start-date"></td>
        <td><input type="date" class="end-date"></td>
        <td class="month-year">Month, Year</td>
        <td><input type="text" class="dates-excluded" placeholder="Enter dates (comma-separated)"></td>
        <td class="num-days">Number of Days</td>
        <td><input type="number" class="lead-count"></td>
        <td class="expected-drr">Expected DRR</td>
        <td class="last-updated">Last Updated
            <button class="save-row">Save</button>
            <button class="cancel-row">Cancel</button>
        </td>
    `;

    const dataRows = document.getElementById("data-rows");
    dataRows.appendChild(newRow);
    updateEventListeners();
  }

  function updateEventListeners() {
    const dataRows = document.getElementById("data-rows");
    dataRows.removeEventListener("input", handleDateChange);
    dataRows.removeEventListener("click", handleButtonClick);
    dataRows.addEventListener("input", handleDateChange);
    dataRows.addEventListener("click", handleButtonClick);
  }

  function handleDateChange(e) {
    const target = e.target;
    if (
      target.classList.contains("start-date") ||
      target.classList.contains("end-date") ||
      target.classList.contains("dates-excluded") ||
      target.classList.contains("lead-count")
    ) {
      const row = target.closest("tr");
      if (row) {
        const startDateInput = row.querySelector(".start-date");
        const endDateInput = row.querySelector(".end-date");
        const excludedDatesInput = row.querySelector(".dates-excluded");
        const monthYearCell = row.querySelector(".month-year");
        const numDaysCell = row.querySelector(".num-days");
        const leadCountInput = row.querySelector(".lead-count");
        const expectedDrrCell = row.querySelector(".expected-drr");

        if (startDateInput && endDateInput && monthYearCell) {
          const startDateFormat = new Date(startDateInput.value);
          const endDateFormat = new Date(endDateInput.value);
          const startMonth = startDateFormat.getMonth() + 1;
          const startYear = startDateFormat.getFullYear();
          const endMonth = endDateFormat.getMonth() + 1;
          const endYear = endDateFormat.getFullYear();
          const monthYear = `${startMonth}, ${startYear} - ${endMonth}, ${endYear}`;
          monthYearCell.textContent = monthYear;
        }

        if (startDateInput && endDateInput && numDaysCell) {
          const startDate = new Date(startDateInput.value);
          const endDate = new Date(endDateInput.value);
          const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

          const excludedDates = excludedDatesInput.value
            .split(",")
            .map((date) => date.trim())
            .filter(Boolean);

          numDaysCell.textContent = daysDiff - excludedDates.length;
        }

        if (leadCountInput && numDaysCell && expectedDrrCell) {
          const leadCount = parseInt(leadCountInput.value);
          const numDays = parseInt(numDaysCell.textContent);
          const expectedDrr = leadCount / numDays;
          expectedDrrCell.textContent = expectedDrr.toFixed(0);
        }
      }
      if (!startDateInput.value || !endDateInput.value || !leadCountInput.value) {
        alert("Please fill in Start Date, End Date, and Lead Count before saving.");
        return;
      }
    }
  }

  updateEventListeners();
});
