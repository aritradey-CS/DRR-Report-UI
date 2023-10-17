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

      if (
        !startDateInput.value ||
        !endDateInput.value ||
        !leadCountInput.value
      ) {
        alert(
          "Please fill in Start Date, End Date, and Lead Count before saving."
        );
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

      // Check if excluded dates are outside the range
      const invalidDates = excludedDates.filter((date) => {
        const dateObj = new Date(date);
        return dateObj < startDate || dateObj > endDate;
      });

      if (invalidDates.length > 0) {
        alert(
          "Some excluded dates are outside the range of Start Date and End Date."
        );
        return;
      }

      // Calculate the excluded dates and print to the console
      const excludedDatesStr = excludedDates.join(", ");
      console.log("Excluded Dates: " + excludedDatesStr);

      // Calculate the number of days
      const daysDiff =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) -
        excludedDates.length;
      numDaysCell.textContent = daysDiff;

      const leadCount = parseInt(leadCountInput.value);
      const numDays = parseInt(numDaysCell.textContent);

      if (numDays <= 0) {
        alert(
          "The calculated number of days is zero or negative. Please adjust the dates and excluded dates."
        );
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
        starred: false, // Initialize as not starred
      };

      rowData.push(rowObject);

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>
  <button class="star-row"
    style="
      display: flex;
      outline: none;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      border-radius: 500px;
      transition: background-color 0.3s ease 0s, transform 0.3s ease 0s, box-shadow 0.3s ease 0s;
      border: 1px solid transparent;
      letter-spacing: 2px;
      min-width: 0px;
      min-width: 29px;
      align-items: center;
      justify-content: center;
      white-space: normal;
      font-weight: 100;
      text-align: center;
      padding: 15px 10px;
      color: rgb(255, 255, 255);
      background-color: rgb(30, 215, 96);
      height: 20px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
      transform: scale(1);
    "
    onmouseover="this.style.transform='scale(1.04)'; this.style.backgroundColor='#21e065'; this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';"
    onmouseout="this.style.transform='scale(1)'; this.style.backgroundColor='#1ED760'; this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';"
  >
    <i class="far fa-star" style="margin-right: 5px;"></i> Star
  </button>
</td>

        <td>${rowObject.id}</td>
        <td>${rowObject.startDate}</td>
        <td>${rowObject.endDate}</td>
        <td class="month-year">${rowObject.monthYear}</td>
        <td class="dates-excluded">${rowObject.excludedDates}</td>
        <td class="num-days">${rowObject.numDays}</td>
        <td>${rowObject.leadCount}</td>
        <td class="expected-drr">${rowObject.expectedDrr}</td>
        <td class="last-updated">${rowObject.lastUpdated}
        <button class="save-row" 
        style="
        background-color: var(--secondary-color); 
        color: #fff; border: none; 
        border-radius: 3px; 
        margin-left: 2px; 
        cursor: pointer; 
        width: 6.4vw;
        margin: 5px 0px 5px 55px; 
        display: flex; 
        align-items: center; 
        padding: 10px 15px; 
        font-size: 14px;" 
        
        onmouseover="this.style.transform='scale(1.04)'; 
        this.style.backgroundColor='var(--secondary-color)'; 
        this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';" 
        
        onmouseout="this.style.transform='scale(1)'; 
        this.style.backgroundColor='var(--primary-color)'; 
        this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';
        ">
        <i class="fas fa-save" style="margin-right: 5px;"></i> Save
      </button>
      
      <button class="cancel-row" style="
      background-color: var(--danger-color); 
      color: #fff; border: none; 
      border-radius: 3px; 
      margin-left: 2px; 
      cursor: pointer; 
      width: 6.4vw; 
      margin: 5px 0px 5px 55px;
      display: flex; 
      align-items: center; 
      padding: 10px 15px; 
      font-size: 14px;" 
      
      onmouseover="this.style.transform='scale(1.04)'; 
      this.style.backgroundColor='#ff5555'; 
      this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';" 
      
      onmouseout="this.style.transform='scale(1)'; 
      this.style.backgroundColor='#ff0000'; 
      this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';
      ">
        <i class="fas fa-times" style="margin-right: 5px;"></i> Cancel
      </button>
      
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
  } else if (target.classList.contains("star-row")) {
    // Toggle the star on click
    const row = target.closest("tr");
    if (row) {
      const starIcon = target.querySelector("i"); // Find the star icon inside the button
      const rowObject = rowData.find(
        (item) => item.id === parseInt(row.children[1].textContent)
      );
      if (rowObject) {
        rowObject.starred = !rowObject.starred;
        if (rowObject.starred) {
          starIcon.classList.remove("far");
          starIcon.classList.add("fas");
        } else {
          starIcon.classList.remove("fas");
          starIcon.classList.add("far");
        }
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
    <td>
  <button class="star-row"
    style="
      display: flex;
      outline: none;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      border-radius: 500px;
      transition: background-color 0.3s ease 0s, transform 0.3s ease 0s, box-shadow 0.3s ease 0s;
      border: 1px solid transparent;
      letter-spacing: 2px;
      min-width: 0px;
      min-width: 29px;
      align-items: center;
      justify-content: center;
      white-space: normal;
      font-weight: 100;
      text-align: center;
      padding: 15px 10px;
      color: rgb(255, 255, 255);
      background-color: rgb(30, 215, 96);
      height: 20px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
      transform: scale(1);
    "
    onmouseover="this.style.transform='scale(1.04)'; this.style.backgroundColor='#21e065'; this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';"
    onmouseout="this.style.transform='scale(1)'; this.style.backgroundColor='#1ED760'; this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';"
  >
    <i class="far fa-star" style="margin-right: 5px;"></i> Star
  </button>
</td>

      <td>Generated ID</td>
      <td><input type="date" class="start-date"></td>
      <td><input type="date" class="end-date"></td>
      <td class="month-year">Month, Year</td>
      <td><input type="text" class="dates-excluded" placeholder="Enter dates (comma-separated)"></td>
      <td class="num-days">Number of Days</td>
      <td><input type="number" class="lead-count"></td>
      <td class="expected-drr">Expected DRR</td>
      <td class="last-updated">Last Updated
      <button class="save-row" style="
      background-color: var(--secondary-color);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 3px;
    /* margin-left: 2px; */
    margin: 5px 0px 5px 5px;
    cursor: pointer;
    width: 6.4vw;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    font-size: 14px;
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;

      
    onmouseover="this.style.transform='scale(1.04)'; 
    this.style.backgroundColor='var(--secondary-color)'; 
    this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';" 
    
    onmouseout="this.style.transform='scale(1)'; 
    this.style.backgroundColor='var(--primary-color)'; 
    this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';"
      >
  <i class="fas fa-save" style="margin-right: 5px;"></i> Save
</button>

<button class="cancel-row" style="
background-color: var(--danger-color); 
color: #fff; 
border: none; 
border-radius: 3px; 
margin-left: 5px; 
cursor: pointer; 
width: 6.4vw; 
display: flex; 
align-items: 
center; 
padding: 10px 15px; 
font-size: 14px;" 

onmouseover="this.style.transform='scale(1.04)'; 
this.style.backgroundColor='#ff5555'; 
this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';" 

onmouseout="this.style.transform='scale(1)'; 
this.style.backgroundColor='#ff0000'; 
this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';"
>
  <i class="fas fa-times" style="margin-right: 5px;"></i> Cancel
</button>


    
    </td>
    `;

    const dataRows = document.getElementById("data-rows");
    dataRows.appendChild(newRow);
    row.style.display = "none";
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
    const row = target.closest("tr");
    if (!row) return;

    const startDateInput = row.querySelector(".start-date");
    const endDateInput = row.querySelector(".end-date");
    const excludedDatesInput = row.querySelector(".dates-excluded");
    const monthYearCell = row.querySelector(".month-year");
    const numDaysCell = row.querySelector(".num-days");
    const leadCountInput = row.querySelector(".lead-count");
    const expectedDrrCell = row.querySelector(".expected-drr");

    if (
      target.classList.contains("start-date") ||
      target.classList.contains("end-date")
    ) {
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
        const daysDiff = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        numDaysCell.textContent = daysDiff;
      }
    }

    if (
      startDateInput &&
      endDateInput &&
      excludedDatesInput &&
      numDaysCell &&
      leadCountInput &&
      expectedDrrCell
    ) {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
      const excludedDates = excludedDatesInput.value
        .split(",")
        .map((date) => date.trim())
        .filter(Boolean);

      // Check if excluded dates are outside the range
      const invalidDates = excludedDates.filter((date) => {
        const dateObj = new Date(date);
        return dateObj < startDate || dateObj > endDate;
      });

      if (invalidDates.length > 0) {
        alert(
          "Some excluded dates are outside the range of Start Date and End Date."
        );
        return;
      }

      // Calculate the number of days
      const daysDiff =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) -
        excludedDates.length;
      numDaysCell.textContent = daysDiff;

      const leadCount = parseInt(leadCountInput.value);
      const numDays = parseInt(numDaysCell.textContent);
      const expectedDrr = leadCount / numDays;
      expectedDrrCell.textContent = expectedDrr.toFixed(0);
    }
  }

  updateEventListeners();
});
