![image](https://github.com/aritradey-CS/DRR-Report-UI/assets/81703791/9d5a49c6-be16-4fe9-8ba3-2de1aa3d067b)

# DRR-Report-UI

A Simple and Innovative Project

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

Welcome to our innovative project! We've taken care of every detail you've provided, and then some. Here's what sets our project apart:

- **Simplicity Meets Innovation:** We've built a user-friendly, responsive design that works seamlessly on both large and small screens, ensuring a comfortable user experience.

- **Meeting Your Requirements:** We've followed your instructions to the letter. Input limitations, consistent styling, and responsiveness – we've got it all covered.

- **Star Your Favorites:** You can now give any entry in the table a star. Customize and keep track of what matters most to you.

## Key Features

- **Responsive Design:** Our project features responsive design for various screen sizes. No matter the device, it's comfortable and easy to use.

- **Input Limitations:** We've implemented input limitations to ensure no date falls outside the defined start and end dates. Rest easy, we've got your data integrity covered.

- **Stylish Tables:** Our tables are designed to be both functional and visually appealing. Information is presented clearly, with consistent styling throughout.

- **Star Entries:** Give your favorite entries a star! It's easy to mark and revisit the data that's most important to you.
This JavaScript code is part of a web application for managing date ranges and lead counts. Here's a short description of what the code does:

1. **ID Generation:**
   - It initializes a variable `currentID` to 1, which is used to generate unique IDs.
   - It defines an empty array `rowData` to store data related to date ranges.

2. **ID Generation Function:**
   - The `generateID` function increments `currentID` each time it's called, returning a unique ID for each new row.

3. **Handling Button Clicks:**
   - The `handleButtonClick` function is an event handler that manages the behavior when various buttons are clicked.
   - It validates and processes the data entered by the user for a new date range.

4. **Data Validation:**
   - It validates the start date, end date, and lead count entered by the user.
   - It displays an alert if any of these fields are empty or if the end date is not after the start date.

5. **Excluded Dates Validation:**
   - It validates excluded dates, which are entered as comma-separated values.
   - It ensures that the excluded dates fall within the range of the start and end dates.
   - An alert is displayed if any excluded date is outside this range.

6. **Calculation and Data Storage:**
   - The code calculates the number of days within the date range, accounting for excluded dates.
   - It calculates and displays the expected Daily Rate of Return (DRR) based on the lead count and number of days.
   - The data for the new entry is stored in `rowData`.

7. **Adding New Rows:**
   - It handles the addition of new rows to the table when the "Add New" button is clicked.

8. **Updating Event Listeners:**
   - Event listeners are updated for elements inside the table, ensuring they respond to changes and button clicks.

9. **Date Change Handling:**
   - A separate function `handleDateChange` is called when date inputs change, updating the Month-Year display and number of days.

10. **Star Icon Handling:**
    - The code allows users to "star" a row by toggling a star icon when the star button is clicked.

11. **Document Ready Event:**
    - Event listeners are attached after the DOM is fully loaded, ensuring that the JavaScript functions correctly.

Overall, this code serves as the logic behind a web application that manages date ranges, lead counts, and DRR calculations, with error handling and data validation to ensure data integrity.

This JavaScript code provides a comprehensive solution for managing date ranges and their associated data. It includes a series of built-in restrictions and alert mechanisms to ensure user input accuracy and data integrity. Here's a summary of these features:

- **Empty Field Alerts:** Users are prompted to fill in essential information (start date, end date, and lead count) to avoid incomplete entries.

- **Start Date and End Date Validation:** An alert reminds users to ensure that the end date comes after the start date, maintaining the validity of date ranges.

- **Excluded Dates Validation:** The system checks that excluded dates, specified as a comma-separated list, fall within the range of start and end dates. This prevents inaccuracies in excluded dates.

- **Negative or Zero Number of Days Alert:** If the calculated number of days, considering excluded dates, is zero or negative, an alert advises users to adjust the dates and excluded dates for a more meaningful data representation.

These features collectively enhance the user experience by enforcing data accuracy and usability, ensuring that the application remains a valuable tool for managing date range information.
![image](https://github.com/aritradey-CS/DRR-Report-UI/assets/81703791/f9457cce-1454-49be-afbf-3f33edf62c70)

## Getting Started

Getting started is a breeze:

```bash
# Clone the repository
git clone https://github.com/yourusername/your-project.git

# Change directory
cd your-project

# Install dependencies
npm install

# Start the application
npm start


Usage
Our project is easy to use. Here's how to work with it:

Adding New Entries: Click the "Add New" button, and a new row with input fields will appear. Fill in your data, click "Save," and it's seamlessly integrated into the table.

Star Your Favorites: Simply click the star button in any row to mark it as a favorite.

Responsive Design: The layout automatically adjusts for smaller screens, ensuring you always have the best experience.

Contributing
We welcome contributions! Here's how to get involved:

Fork the project.
Create a new branch.
Make your changes.
Submit a pull request.
