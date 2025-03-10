# Data Viewer Application

You can access the live Data Viewer application at the following link:

[Data Viewer Application](https://gs-data-viewer.netlify.app/)

This is a ReactJS application developed for managing stores, SKUs, and planning data. The application uses various modern tools and libraries, including Tailwind CSS, Zustand for state management, AG-Grid for data grids, and AG-Charts for charting.

## Login Credentials:

- **Email**: `test@gmail.com`
- **Password**: `12345`

## Features

1. **Top Navigation Bar**:

   - Displays the company logo on the left.
   - Contains sign-out on the right.

2. **Login Page**:

   - Users can sign in to the application using the provided credentials.

3. **Left Navigation Menu**:

   - Displays icons and labels for easy navigation between screens.

4. **Store Screen**:

   - Add, remove, edit, and reorder stores.

5. **SKU Screen**:

   - Add, remove, edit and reorder SKUs.
   - Manage SKU prices and costs.

6. **Planning Screen**:

   - Displays an AG-Grid with stores and SKUs along the rows and Calendar along the columns.
   - Editable sales units.
   - Non-editable calculated fields for Sales Dollars, GM Dollars, and GM %.
   - Conditional formatting for GM %:
     - Green: ≥ 40%
     - Yellow: 10% - 40%
     - Orange: 5% - 10%
     - Red: ≤ 5%

7. **Chart Screen**:
   - Allows users to select a store and view GM Dollars and GM % in a dual-axis bar chart, with values on the Y-Axis and weeks along the X-Axis. The chart displays cumulative week-wise data for GM Dollars and GM %.

### Key Updates:

- **LocalStorage Persistence**: The app uses localStorage to persist data such as stores, SKUs, and plans, even after the browser is closed or refreshed.
- **Planning Page Data**: You need to add at least one **SKU** and one **Store** to see the data in the **Planning Page**.

This should make it clear to users how the data is persisted and what actions are required to see data on the Planning Page. Let me know if you need further changes!

## Technologies Used

- **ReactJS**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zustand**: A small, fast state management tool.
- **Headless UI**: Completely unstyled, fully accessible UI components for React.
- **AG-Grid**: A feature-rich data grid for displaying and managing tabular data.
- **AG-Charts**: Charting library for displaying various types of charts.
- **Vite**: Build tool that focuses on speed and performance.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anndy25/GS2552001_Aniket_Mane.git
   cd GS2552001_Aniket_Mane
   ```
