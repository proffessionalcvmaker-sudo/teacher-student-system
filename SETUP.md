# Setup Guide - Teacher-Student Management System

## Quick Start Guide

Follow these steps to set up the Teacher-Student Management System in your Google Spreadsheet.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Teacher-Student Management System" (or your preferred name)

## Step 2: Open Apps Script Editor

1. In your spreadsheet, click on **Extensions** in the menu bar
2. Select **Apps Script**
3. This opens the Apps Script editor in a new tab

## Step 3: Set Up the Script Files

### Create Code.gs

1. Delete any existing code in the editor
2. Copy the entire contents of `Code.gs` from this repository
3. Paste it into the editor
4. The file should be named `Code.gs` (default name)

### Create HTML Files

For each HTML file, you need to:

1. Click the **+** button next to "Files" in the left sidebar
2. Select **HTML**
3. Name the file exactly as specified below
4. Copy and paste the corresponding content

Create these HTML files:

- **AddTeacherDialog.html**
  - Copy contents from `AddTeacherDialog.html`
  
- **RemoveTeacherDialog.html**
  - Copy contents from `RemoveTeacherDialog.html`
  
- **AssignDemoDialog.html**
  - Copy contents from `AssignDemoDialog.html`
  
- **DemoResultDialog.html**
  - Copy contents from `DemoResultDialog.html`
  
- **TeacherProfileDialog.html**
  - Copy contents from `TeacherProfileDialog.html`

### Create appsscript.json (Optional but Recommended)

1. Click on **Project Settings** (gear icon) in the left sidebar
2. Check "Show 'appsscript.json' manifest file in editor"
3. Go back to the Editor
4. You should now see `appsscript.json` in the files list
5. Replace its contents with the content from `appsscript.json`

## Step 4: Save the Project

1. Click the **Save** icon (disk icon) or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. Give your project a name (e.g., "Teacher-Student System")
3. Click **OK**

## Step 5: Authorize the Script

1. Close the Apps Script editor tab
2. Return to your Google Spreadsheet
3. Refresh the page (`F5` or `Ctrl+R`)
4. You should see a new menu called "Teacher-Student System" appear
5. Click on **Teacher-Student System** > **Initialize System**
6. A dialog will appear asking for authorization
7. Click **Review Permissions**
8. Select your Google account
9. Click **Advanced** (if you see a warning)
10. Click **Go to [Your Project Name] (unsafe)**
11. Click **Allow**

## Step 6: Initialize the System

1. After authorization, click **Teacher-Student System** > **Initialize System** again
2. The system will create all required sheets
3. Wait for the success message: "System initialized successfully!"
4. You should now see multiple new sheets in your spreadsheet

## Step 7: Verify Installation

Check that these sheets have been created:

**Teacher Sheets:**
- Normal Teachers
- Internship Teachers
- Trial Teachers
- VIP Teachers
- Basic Teachers

**Demo Assignment Sheets:**
- Demo Assigned - Normal
- Demo Assigned - Internship
- Demo Assigned - Trial
- Demo Assigned - VIP
- Demo Assigned - Basic

**Active Student Sheets:**
- Active Students - Normal
- Active Students - Internship
- Active Students - Trial
- Active Students - VIP
- Active Students - Basic

**Report Sheets:**
- Reports
- Teacher Performance

## Step 8: Add Your First Teacher

1. Click **Teacher-Student System** > **Add Teacher**
2. Fill in the form:
   - Teacher Type: Select one (e.g., Normal)
   - Teacher Name: Enter name
   - Available From: e.g., 09:00
   - Available Till: e.g., 17:00
3. Click **Add Teacher**
4. Check the corresponding teacher sheet to see the new teacher

## Step 9: Test the System

Try these actions to test:

1. **Add multiple teachers** of different types
2. **Assign a demo**:
   - Click **Teacher-Student System** > **Assign Demo**
   - Fill in student details
   - Select a teacher and time slot
3. **Process a demo result**:
   - Click **Teacher-Student System** > **Process Demo Result**
   - Enter the demo sheet and row number
   - Mark as PASSED or FAILED
4. **Generate a report**:
   - Click **Teacher-Student System** > **Generate Reports**
   - Check the Reports sheet

## Troubleshooting Setup

### Menu Not Appearing

**Problem:** The "Teacher-Student System" menu doesn't appear after refreshing.

**Solution:**
1. Close the spreadsheet completely
2. Reopen it from Google Drive
3. Wait 10-15 seconds for scripts to load
4. If still not appearing, check the Apps Script editor for errors

### Authorization Issues

**Problem:** Can't authorize the script or getting permission errors.

**Solution:**
1. Make sure you're the owner of the spreadsheet
2. Check your Google Workspace admin settings if in an organization
3. Try using a personal Google account if organizational restrictions apply
4. Contact your IT administrator if you can't authorize scripts

### Script Errors

**Problem:** Getting errors when running functions.

**Solution:**
1. Open the Apps Script editor
2. Click on **Executions** (clock icon) in the left sidebar
3. Check for error messages
4. Common issues:
   - Missing HTML files: Create all 5 HTML files
   - Typos in file names: Ensure exact names
   - Missing code: Verify all code is copied completely

### Sheets Not Created

**Problem:** Initialize System runs but sheets aren't created.

**Solution:**
1. Check for error messages in the UI
2. Manually delete any partially created sheets
3. Run Initialize System again
4. Check the Apps Script execution log for errors

### Function Not Found Errors

**Problem:** Getting "function not found" errors.

**Solution:**
1. Make sure `Code.gs` contains all the code
2. Verify the file is named exactly `Code.gs`
3. Save the script again
4. Refresh the spreadsheet

## Advanced Setup Options

### Custom Time Zone

Edit `appsscript.json` and change:
```json
"timeZone": "America/New_York"
```
to your timezone (e.g., "Asia/Kolkata", "Europe/London", etc.)

### Email Notifications

To add email notifications for poor-performing teachers:

1. Add this function to `Code.gs`:
```javascript
function sendPerformanceAlerts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const perfSheet = ss.getSheetByName(SHEET_NAMES.TEACHER_PERFORMANCE);
  const data = perfSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === 'Poor Performance') {
      const teacherName = data[i][1];
      const teacherId = data[i][0];
      const passRate = data[i][6];
      
      // Send email
      MailApp.sendEmail({
        to: 'admin@example.com', // Change to your email
        subject: 'Teacher Performance Alert: ' + teacherName,
        body: `Teacher ${teacherName} (${teacherId}) has a low pass rate of ${passRate}%`
      });
    }
  }
}
```

2. Set up a daily trigger:
   - In Apps Script editor, click on **Triggers** (clock icon)
   - Click **Add Trigger**
   - Function: `sendPerformanceAlerts`
   - Event source: Time-driven
   - Type: Day timer
   - Time: Select preferred time
   - Click **Save**

### Automatic Daily Reports

To automatically generate daily reports:

1. In Apps Script editor, click **Triggers**
2. Add Trigger for `generateDailyReport`
3. Set to run daily at your preferred time

## Next Steps

After setup:
1. Read the full README.md for detailed usage instructions
2. Add all your teachers to the system
3. Start assigning demos
4. Monitor performance regularly
5. Generate weekly reports

## Support

If you encounter issues:
1. Check the execution logs in Apps Script
2. Verify all files are correctly named
3. Ensure you have proper permissions
4. Review the Troubleshooting section in README.md

## Video Tutorial

For a visual guide, consider creating a video tutorial showing:
1. Opening Apps Script
2. Copying files
3. Authorizing the script
4. Initializing the system
5. Adding a teacher
6. Assigning a demo

---

**Congratulations!** Your Teacher-Student Management System is now set up and ready to use.
