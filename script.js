// Function to handle button clicks (Save and Cancel)
function handleButtonClick(e) {
    const target = e.target;
    if (target.classList.contains('save-row')) {
        const row = target.closest('tr');
        if (row) {
            const startDateInput = row.querySelector('.start-date');
            const endDateInput = row.querySelector('.end-date');
            const leadCountInput = row.querySelector('.lead-count');
            if (!startDateInput.value || !endDateInput.value || !leadCountInput.value) {
                alert('Please fill in Start Date, End Date, and Lead Count before saving.');
                return;
            }

            // Create a new row with the entered data
            const newRow = document.createElement('tr');
            // Create cells for each column
            newRow.innerHTML = `
                <td><button class="delete-row">Delete</button></td>
                <td>Generated ID</td>
                <td>${startDateInput.value}</td>
                <td>${endDateInput.value}</td>
                <td class="month-year">Month, Year</td>
                <td><input type="text" class="dates-excluded" placeholder="Enter dates (comma-separated)"></td>
                <td class="num-days"></td>
                <td>${leadCountInput.value}</td>
                <td class="expected-drr">Expected DRR</td>
                <td>Generated Date</td>
                <td>
                    <button class="save-row">Save</button>
                    <button class="cancel-row">Cancel</button>
                </td>
            `;

            const dataRows = document.getElementById('data-rows');
            dataRows.appendChild(newRow);
            // Call the handleDateChange function to update the new row's Month, Year, and Number of Days
            handleDateChange({ target: newRow });
        }
    } else if (target.classList.contains('cancel-row')) {
        const row = target.closest('tr');
        if (row) {
            if (confirm('Are you sure you want to cancel this entry?')) {
                // Remove the row if the user confirms
                row.remove();
            }
        }
    }
}

// Add event listeners to the document once it's loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for "Add New" button
    const addNewButton = document.getElementById('add-new-button');
    addNewButton.addEventListener('click', addNewRow);

    // Add event listeners for date pickers, excluded dates, and buttons
    const dataRows = document.getElementById('data-rows');
    dataRows.addEventListener('input', handleDateChange);
    dataRows.addEventListener('click', handleButtonClick);

    // Function to add a new row to the table
    function addNewRow() {
        const newRow = document.createElement('tr');
        // Create cells for each column
        newRow.innerHTML = `
            <td><button class="delete-row">Delete</button></td>
            <td>Generated ID</td>
            <td><input type="date" class="start-date"></td>
            <td><input type="date" class= "end-date"></td>
            <td class="month-year">Month, Year</td>
            <td><input type="text" class="dates-excluded" placeholder="Enter dates (comma-separated)"></td>
            <td class="num-days">Number of Days</td>
            <td><input type="number" class="lead-count"></td>
            <td class="expected-drr">Expected DRR</td>
            <td>
                <button class="save-row">Save</button>
                <button class="cancel-row">Cancel</button>
            </td>
        `;

        dataRows.appendChild(newRow);
    }

    // Function to handle date changes (selection and exclusion)
    function handleDateChange(e) {
        const target = e.target;
        if (target.classList.contains('start-date') || target.classList.contains('end-date') || target.classList.contains('dates-excluded') || target.classList.contains('lead-count')) {
            // Get the corresponding row
            const row = target.closest('tr');
            if (row) {
                const startDateInput = row.querySelector('.start-date');
                const endDateInput = row.querySelector('.end-date');
                const excludedDatesInput = row.querySelector('.dates-excluded');
                const monthYearCell = row.querySelector('.month-year');
                const numDaysCell = row.querySelector('.num-days');
                const leadCountInput = row.querySelector('.lead-count');
                const expectedDrrCell = row.querySelector('.expected-drr');

                // Calculate numeric representation of Month, Year based on selected start and end dates
                if (startDateInput && endDateInput && monthYearCell) {
                    const startDateFormat = new Date(startDateInput.value);
                    const endDateFormat = new Date(endDateInput.value);
                    const startMonth = startDateFormat.getMonth() + 1; // Adding 1 to adjust for zero-based months
                    const startYear = startDateFormat.getFullYear();
                    const endMonth = endDateFormat.getMonth() + 1;
                    const endYear = endDateFormat.getFullYear();
                    const monthYear = `${startMonth}, ${startYear} - ${endMonth}, ${endYear}`;
                    monthYearCell.textContent = monthYear;
                }

                // Calculate Number of Days between Start and End Dates
                if (startDateInput && endDateInput && numDaysCell) {
                    const startDate = new Date(startDateInput.value);
                    const endDate = new Date(endDateInput.value);
                    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

                    // Exclude dates from the total number of days
                    const excludedDates = excludedDatesInput.value.split(',').map(date => date.trim());
                    excludedDates.forEach(date => {
                        if (date && date >= startDateInput.value && date <= endDateInput.value) {
                            daysDiff--;
                        }
                    });

                    numDaysCell.textContent = daysDiff;
                }

                // Calculate Expected DDR by dividing Lead Count by Number of Days
                if (leadCountInput && numDaysCell && expectedDrrCell) {
                    const leadCount = parseInt(leadCountInput.value);
                    const numDays = parseInt(numDaysCell.textContent);
                    const expectedDrr = leadCount / numDays;
                    expectedDrrCell.textContent = expectedDrr.toFixed(0); // Display as an integer
                }
            }
        }
    }
});