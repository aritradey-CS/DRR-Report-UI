// Add event listeners to the document once it's loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for "Add New" button
    const addNewButton = document.getElementById('add-new-button');
    addNewButton.addEventListener('click', addNewRow);

    // Add event listeners for date pickers and excluded dates
    const dataRows = document.getElementById('data-rows');
    dataRows.addEventListener('change', handleDateChange);

    // Function to add a new row to the table
    function addNewRow() {
        const newRow = document.createElement('tr');
        // Create cells for each column
        newRow.innerHTML = `
            <td><button class="delete-row">Delete</button></td>
            <td>Generated ID</td>
            <td><input type="date" class="start-date"></td>
            <td><input type="date" class="end-date"></td>
            <td class="month-year"></td>
            <td><input type="text" class="dates-excluded" placeholder="Enter dates (comma-separated)"></td>
            <td class="num-days"></td>
            <td><input type="number" class="lead-count"></td>
            <td class="expected-drr"></td>
            <td>Generated Date</td>
        `;

        dataRows.appendChild(newRow);
    }

    // Function to handle date changes (selection and exclusion)
    function handleDateChange(e) {
        const target = e.target;
        if (target.classList.contains('start-date') || target.classList.contains('end-date') || target.classList.contains('dates-excluded')) {
            // Get the corresponding row
            const row = target.closest('tr');
            if (row) {
                const startDateInput = row.querySelector('.start-date');
                const endDateInput = row.querySelector('.end-date');
                const excludedDatesInput = row.querySelector('.dates-excluded');
                const monthYearCell = row.querySelector('.month-year');
                const numDaysCell = row.querySelector('.num-days');

                // Calculate Month and Year based on selected start date
                if (startDateInput && monthYearCell) {
                    const startDate = new Date(startDateInput.value);
                    const month = startDate.toLocaleString('default', { month: 'long' });
                    const year = startDate.getFullYear();
                    monthYearCell.textContent = `${month}, ${year}`;
                }

                // Calculate Number of Days between Start and End Dates, excluding excluded dates
                if (startDateInput && endDateInput && numDaysCell) {
                    const startDate = new Date(startDateInput.value);
                    const endDate = new Date(endDateInput.value);
                    const excludedDates = excludedDatesInput.value.split(',').map(date => date.trim());
                    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                    const filteredDates = excludedDates.filter(date => date && date >= startDateInput.value && date <= endDateInput.value);
                    const numDays = daysDiff - filteredDates.length;
                    numDaysCell.textContent = numDays;
                }
            }
        }
    }
});
