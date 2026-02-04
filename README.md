# Teacher-Student Management System

A comprehensive Google Apps Script-based system for managing teachers, students, demo assignments, and performance tracking in an educational setting.

## Overview

This system provides an advanced management solution for educational institutions with features including:

- **Teacher Management** with different types (Normal, Internship, Trial, VIP, Basic)
- **Automatic ID Generation** with type-specific prefixes
- **Time Slot Management** for both 30-minute and 40-minute sessions
- **Demo Assignment System** with automatic teacher filtering
- **Performance Tracking** with pass/fail ratios
- **Automated Reporting** for daily activities
- **Student Movement** from demo to active status based on results

## Features

### 1. Teacher ID System

Each teacher type has a unique ID prefix that auto-generates:

- **Normal Teachers**: `N01`, `N02`, `N03`, ...
- **Internship Teachers**: `Ti01`, `Ti02`, `Ti03`, ...
- **Trial Teachers**: `T01`, `T02`, `T03`, ...
- **VIP Teachers**: `V01`, `V02`, `V03`, ...
- **Basic Teachers**: `B01`, `B02`, `B03`, ...

Teacher IDs can be manually edited if needed.

### 2. Time Slot Management

- Define teacher availability with start and end times
- System automatically calculates available slots for both:
  - **30-minute sessions**
  - **40-minute sessions**
- Slots are tracked as occupied or available
- Occupied slots are released when demos fail
- Slots remain occupied when demos pass (until student leaves)

### 3. Demo Assignment

- Type-specific teacher filtering (Basic demos only show Basic teachers, etc.)
- Automatic display of available time slots when teacher is selected
- Two-column display: 30min slots | 40min slots
- Selected slot fades the other column
- Automatic slot occupation upon assignment

### 4. Student Movement

When a demo passes:
- Student automatically moves to the corresponding active sheet
- Example: Demo Assigned - Basic → Active Students - Basic
- Fee paid date is recorded
- Time slot remains occupied for that teacher

When a demo fails:
- Time slot is released back to available slots
- Student remains in demo sheet for reassignment

### 5. Performance Tracking

Teachers are automatically tracked for:
- Total demos assigned
- Demos passed
- Demos failed
- Pass rate percentage
- Consecutive failures

**Automatic Red Flag System:**
- Teachers marked red (Poor Performance) when:
  - 5 consecutive demo failures
  - 10+ demos with ≤20% pass rate
  - Other low-performance indicators

### 6. Reporting

Daily reports include:
- Students who paid fees today
- New active students
- Total active students
- Total demos assigned
- Demos passed/failed today
- Overall pass rate

### 7. Teacher Profiles

Generate downloadable teacher profiles showing:
- Personal information
- Availability and time slots
- Performance metrics
- Current student list
- Complete statistics

## Installation

1. Create a new Google Spreadsheet
2. Go to **Extensions** > **Apps Script**
3. Copy the contents of `Code.gs` into the script editor
4. Create HTML files:
   - `AddTeacherDialog.html`
   - `RemoveTeacherDialog.html`
   - `AssignDemoDialog.html`
   - `DemoResultDialog.html`
   - `TeacherProfileDialog.html`
5. Save all files
6. Close and reopen the spreadsheet
7. A new menu "Teacher-Student System" will appear
8. Click **Initialize System** to create all required sheets

## Sheet Structure

The system creates the following sheets:

### Teacher Sheets
- Normal Teachers
- Internship Teachers
- Trial Teachers
- VIP Teachers
- Basic Teachers

### Demo Assignment Sheets
- Demo Assigned - Normal
- Demo Assigned - Internship
- Demo Assigned - Trial
- Demo Assigned - VIP
- Demo Assigned - Basic

### Active Student Sheets
- Active Students - Normal
- Active Students - Internship
- Active Students - Trial
- Active Students - VIP
- Active Students - Basic

### Reporting Sheets
- Reports
- Teacher Performance

## Usage

### Adding a Teacher

1. Click **Teacher-Student System** > **Add Teacher**
2. Select teacher type
3. Enter teacher details
4. Set availability times (e.g., 09:00 to 17:00)
5. Teacher ID is auto-generated (or enter manually)
6. Click **Add Teacher**

### Assigning a Demo

1. Click **Teacher-Student System** > **Assign Demo**
2. Select student type
3. Enter student details
4. Select teacher from dropdown (filtered by type)
5. Available slots appear in two columns (30min | 40min)
6. Click on a time slot to select it
7. The other column fades automatically
8. Click **Assign Demo**

### Processing Demo Results

1. Click **Teacher-Student System** > **Process Demo Result**
2. Select the demo sheet
3. Enter the row number of the demo
4. Select result (PASSED or FAILED)
5. If PASSED: Student moves to active sheet, slot stays occupied
6. If FAILED: Slot is released back to available slots

### Generating Reports

1. Click **Teacher-Student System** > **Generate Reports**
2. System creates a new report entry with today's statistics
3. View in the "Reports" sheet

### Viewing Teacher Performance

1. Navigate to "Teacher Performance" sheet
2. Click **Teacher-Student System** > **Refresh Teacher Performance**
3. View updated statistics for all teachers
4. Teachers with poor performance are highlighted in red

### Generating Teacher Profiles

1. Click **Teacher-Student System** > **Generate Teacher Profile**
2. Enter teacher ID
3. A new sheet is created with the complete profile
4. Download or print the sheet as needed

### Removing a Teacher

1. Click **Teacher-Student System** > **Remove Teacher**
2. Enter teacher ID
3. Confirm removal
4. Note: Teachers with active students cannot be removed

## Manual Editing

You can manually edit:
- Teacher IDs in any teacher sheet
- Time slots
- Student information
- Any other data fields

The system will work with manual edits as long as the structure is maintained.

## Best Practices

1. **Initialize System First**: Always run "Initialize System" before using other features
2. **Regular Backups**: Keep regular backups of your spreadsheet
3. **Daily Reports**: Generate reports daily for accurate tracking
4. **Performance Reviews**: Refresh teacher performance weekly
5. **Clean Data**: Remove completed demos from demo sheets periodically
6. **Student Reassignment**: Before removing teachers, reassign their students

## Troubleshooting

### Teacher ID not auto-generating
- Ensure the teacher sheet exists and is named correctly
- Check that previous IDs follow the format (e.g., N01, N02)

### Slots not showing
- Verify teacher has availability times set
- Check that times are in HH:MM format
- Ensure occupied slots list is properly formatted

### Demo assignment failing
- Confirm teacher exists in the correct type sheet
- Verify student type matches teacher type
- Check that selected slot is available

### Student not moving to active sheet
- Ensure demo result is marked as "PASSED"
- Check that active sheet exists for that type
- Verify all required fields are filled

## Advanced Features

### Consecutive Failure Tracking
The system tracks consecutive failures for each teacher. While simplified in the current implementation, it can be enhanced to maintain a full demo history for more accurate tracking.

### Custom Alerts
You can set up custom email alerts using Google Apps Script triggers for:
- Poor performing teachers
- High demand for specific time slots
- Daily summary reports

### Data Export
All sheets can be exported to:
- PDF for reports
- Excel for external analysis
- CSV for data processing

## System Requirements

- Google Account
- Google Spreadsheet access
- Apps Script execution permissions

## Support

For issues or questions:
1. Check the sheet formulas and data integrity
2. Verify all required sheets exist
3. Ensure teacher IDs follow the correct format
4. Review the Apps Script execution log for errors

## Updates and Maintenance

To update the system:
1. Backup your current spreadsheet
2. Update the Apps Script code
3. Refresh the page
4. Test with sample data

## License

This system is provided as-is for educational management purposes.

## Version

Current Version: 1.0.0

---

**Note**: This system is designed for Google Sheets and requires Apps Script to function. Ensure you have the necessary permissions to run scripts in your Google Workspace environment.