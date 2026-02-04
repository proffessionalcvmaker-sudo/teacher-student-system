# Feature Documentation - Teacher-Student Management System

## Complete Feature List and Implementation Details

This document provides detailed information about each feature of the Teacher-Student Management System.

---

## 1. Teacher ID Management

### Auto-Generation System

**Implementation:**
- Each teacher type has a unique prefix
- System scans existing IDs in the sheet
- Finds the highest number for that prefix
- Generates next sequential ID

**Teacher Types and Prefixes:**

| Teacher Type | Prefix | Example IDs |
|--------------|--------|-------------|
| Normal       | N      | N01, N02, N03, ... |
| Internship   | Ti     | Ti01, Ti02, Ti03, ... |
| Trial        | T      | T01, T02, T03, ... |
| VIP          | V      | V01, V02, V03, ... |
| Basic        | B      | B01, B02, B03, ... |

**Manual Override:**
- Users can manually enter any ID when adding a teacher
- IDs can be edited directly in the sheet
- System respects manually entered IDs
- Next auto-generated ID will be based on the highest number found

**Example Usage:**
```
Auto: System generates N01, N02, N03...
Manual: User can enter N99 for any teacher
Next Auto: System will generate N100 (based on N99 being highest)
```

---

## 2. Time Slot Calculation

### How It Works

**Input:**
- Available From: Start time (e.g., 09:00)
- Available Till: End time (e.g., 17:00)

**Process:**
1. System calculates total minutes available
2. Divides time into both 30-minute and 40-minute slots
3. Creates slot strings with start and end times
4. Stores all slots in teacher profile

**Example Calculation:**

Available: 09:00 - 17:00 (8 hours = 480 minutes)

**30-minute slots:**
```
09:00 - 09:30
09:30 - 10:00
10:00 - 10:30
10:30 - 11:00
... (16 total slots)
```

**40-minute slots:**
```
09:00 - 09:40
09:40 - 10:20
10:20 - 11:00
11:00 - 11:40
... (12 total slots)
```

**Storage:**
- All 30-min slots stored in column H
- All 40-min slots stored in column I
- Occupied slots tracked separately in column J

---

## 3. Demo Assignment System

### Teacher Filtering

**Type-Specific Display:**

When assigning a demo for:
- **Basic Student** → Only shows Basic teachers
- **Normal Student** → Only shows Normal teachers
- **Internship Student** → Only shows Internship teachers
- **Trial Student** → Only shows Trial teachers
- **VIP Student** → Only shows VIP teachers

**Implementation:**
```javascript
function getTeachersByType(type) {
  // Retrieves only teachers from the matching sheet
  // Example: type='BASIC' → queries 'Basic Teachers' sheet only
}
```

### Time Slot Display

**Two-Column Layout:**

```
┌─────────────────────────────┬─────────────────────────────┐
│     30-Minute Slots         │      40-Minute Slots        │
├─────────────────────────────┼─────────────────────────────┤
│  09:00 - 09:30              │  09:00 - 09:40              │
│  09:30 - 10:00              │  09:40 - 10:20              │
│  10:00 - 10:30              │  10:20 - 11:00              │
│  ...                        │  ...                        │
└─────────────────────────────┴─────────────────────────────┘
```

**Interactive Selection:**
1. User clicks on a time slot
2. Selected slot is highlighted
3. Other column automatically fades
4. Slot is marked as occupied in teacher's profile

**Fade Effect:**
- Selected column remains at 100% opacity
- Non-selected column fades to 30% opacity
- Prevents accidental double-selection
- Visual confirmation of choice

---

## 4. Slot Occupation Logic

### When Slot Becomes Occupied

**Triggers:**
1. Demo is assigned to a student
2. Selected time slot is immediately occupied
3. Slot added to teacher's "Occupied Slots" list

**Storage Format:**
```
"09:00 - 09:30, 10:00 - 10:40, 14:00 - 14:30"
```

### When Slot Is Released

**Demo Fails:**
1. Demo result marked as "FAILED"
2. System removes slot from occupied list
3. Slot returns to available slots
4. Can be assigned to another student

**Demo Passes:**
1. Demo result marked as "PASSED"
2. Slot remains occupied
3. Student moves to active sheet
4. Slot stays with that student

**Student Leaves:**
- Manual process: Admin removes student from active sheet
- Then manually release the slot if needed
- Or teacher availability can be updated

---

## 5. Student Movement System

### Automatic Sheet Transfer

**When Demo Passes:**

```
Demo Assigned - Basic → Active Students - Basic
Demo Assigned - Normal → Active Students - Normal
Demo Assigned - Internship → Active Students - Internship
Demo Assigned - Trial → Active Students - Trial
Demo Assigned - VIP → Active Students - VIP
```

**Data Transferred:**
- Student Name
- Email
- Phone
- Teacher ID
- Teacher Name
- Session Type (30min or 40min)
- Time Slot
- Fee Paid Date (set to current date)
- Status (set to "Active")
- Notes

**Original Demo Record:**
- Remains in demo sheet with result marked
- Can be archived or deleted manually
- Used for historical tracking

---

## 6. Teacher Performance Tracking

### Metrics Tracked

**For Each Teacher:**

| Metric | Description | Calculation |
|--------|-------------|-------------|
| Total Demos | All demos assigned | Count |
| Demos Passed | Successfully completed | Count |
| Demos Failed | Unsuccessful demos | Count |
| Pass Rate % | Success percentage | (Passed / Total) × 100 |
| Consecutive Failures | Current streak | Tracked separately |
| Status | Performance indicator | Active / Poor Performance |

### Red Flag System

**Teacher Marked as "Poor Performance" (Red) When:**

1. **5 Consecutive Failures**
   - 5 demos in a row failed
   - No passes in between
   
2. **Low Pass Rate on Volume**
   - 10 or more demos assigned
   - Pass rate ≤ 20%
   
3. **Examples:**
   ```
   Scenario 1: 5 demos, 0 passed → RED (100% fail)
   Scenario 2: 10 demos, 2 passed → RED (20% pass)
   Scenario 3: 15 demos, 3 passed → RED (20% pass)
   Scenario 4: 8 demos, 2 passed → Not RED (low volume)
   Scenario 5: 10 demos, 3 passed → Not RED (30% pass)
   ```

**Visual Indication:**
- Status cell changes to "Poor Performance"
- Cell background becomes red (#ff0000)
- Text color changes to white for contrast

---

## 7. Reporting System

### Daily Reports

**Report Generation:**
- Click: Teacher-Student System > Generate Reports
- Creates new row in "Reports" sheet
- Timestamp: Current date

**Metrics Included:**

1. **Students Paid Fee Today**
   - Count of students with fee paid date = today
   - From all active student sheets

2. **New Active Students**
   - Same as students paid fee today
   - Students who became active today

3. **Total Active Students**
   - Count of all students in all active sheets
   - Regardless of date

4. **Total Demos Assigned**
   - Count of all rows in all demo sheets
   - Historical total

5. **Demos Passed Today**
   - Demos marked PASSED today
   - Based on demo date field

6. **Demos Failed Today**
   - Demos marked FAILED today
   - Based on demo date field

7. **Overall Pass Rate %**
   - (Passed Today / Total Demos Today) × 100

### Teacher Performance Report

**Located in:** "Teacher Performance" sheet

**Columns:**
- Teacher ID
- Teacher Name
- Type
- Total Demos
- Passed
- Failed
- Pass Rate %
- Consecutive Failures
- Status (Active / Poor Performance)
- Last Updated

**Refresh:** 
- Click: Teacher-Student System > Refresh Teacher Performance
- Updates all teacher statistics
- Recalculates pass rates
- Updates status flags

---

## 8. Teacher Profile Generation

### Profile Contents

**Personal Information:**
- Teacher ID
- Name
- Email
- Phone
- Type

**Availability:**
- Available From
- Available Till
- All 30-minute slots
- All 40-minute slots
- Currently occupied slots

**Performance:**
- Total Demos
- Demos Passed
- Demos Failed
- Pass Rate %
- Status

**Current Teaching:**
- List of current student names
- Click-through to view details

**Generation Process:**
1. Click: Teacher-Student System > Generate Teacher Profile
2. Enter Teacher ID
3. System creates new sheet: "Profile_[TeacherID]"
4. Sheet is formatted and ready to download

**Download Options:**
- File > Download > PDF
- File > Download > Excel
- File > Download > CSV
- File > Print

---

## 9. Teacher Management

### Adding Teachers

**Required Fields:**
- Teacher Type
- Teacher Name
- Available From
- Available Till

**Optional Fields:**
- Teacher ID (auto-generated if empty)
- Email
- Phone

**Process:**
1. System generates/validates ID
2. Calculates time slots
3. Creates row in appropriate teacher sheet
4. Initializes performance tracking
5. Returns success with Teacher ID

### Removing Teachers

**Restrictions:**
- Cannot remove teachers with active students
- Must reassign students first

**Process:**
1. System checks for active students
2. If none, deletes row from teacher sheet
3. Removes from performance sheet
4. Confirms deletion

**Safety:**
- Confirmation dialog required
- Warning about permanent action
- Lists active students if any

---

## 10. Advanced Features

### Manual Editing

**Supported:**
- Edit teacher IDs directly in cells
- Modify availability times
- Update occupied slots list
- Change teacher information
- Edit student data

**Format Requirements:**
- Time slots: "HH:MM - HH:MM"
- Multiple slots: comma-separated
- Dates: Standard date format
- IDs: Text format with prefix

### Data Validation

**Automatic Checks:**
- Time format validation
- ID uniqueness (when auto-generating)
- Required fields verification
- Sheet existence validation

### Error Handling

**Common Errors:**
- "Teacher not found" → Check ID spelling
- "Sheet not found" → Run Initialize System
- "Cannot remove teacher" → Active students exist
- "Invalid time format" → Use HH:MM format

---

## 11. System Architecture

### Sheet Dependencies

```
Teacher Sheets
    ↓
Demo Assignment Sheets ← (Filtered by type)
    ↓
Demo Results Processing
    ↓ (if PASSED)
Active Student Sheets
    ↓
Reports & Performance Tracking
```

### Data Flow

1. **Teacher Added** → Teacher Sheet → Performance Sheet
2. **Demo Assigned** → Demo Sheet → Occupy Slot
3. **Demo Result** → Update Performance → Move Student (if passed)
4. **Report Generated** → Aggregate Data → Reports Sheet

### Function Dependencies

**Core Functions:**
- `initializeSystem()` - Must run first
- `generateTeacherId()` - Used by addTeacher
- `calculateTimeSlots()` - Used by addTeacher
- `getTeacherData()` - Used by many functions
- `occupySlot()` / `releaseSlot()` - Slot management

---

## 12. Customization Options

### Modifying Time Slot Durations

To add different slot durations (e.g., 60 minutes):

1. Add column in teacher sheets
2. Update `createTeacherSheets()` function
3. Add calculation in `addTeacher()` function
4. Update demo assignment dialog

### Adding Custom Fields

For additional teacher/student fields:

1. Add column to relevant sheet
2. Update dialog HTML files
3. Modify corresponding functions
4. Update profile generation

### Changing Performance Criteria

To modify red flag thresholds:

Edit `updateTeacherStatus()` function:
```javascript
if (consecutiveFailures >= 5) {  // Change 5 to desired number
  shouldMarkRed = true;
}

if (teacherData.totalDemos >= 10 && teacherData.passRate <= 20) {
  // Modify 10 and 20 to desired thresholds
  shouldMarkRed = true;
}
```

---

## 13. Best Practices

### Daily Operations

**Morning:**
1. Check Reports sheet for yesterday's summary
2. Review Teacher Performance for any red flags
3. Assign today's demos

**During Day:**
1. Process demo results as they complete
2. Monitor active student count
3. Handle any teacher requests

**End of Day:**
1. Generate daily report
2. Update teacher performance
3. Review occupied slots

### Weekly Tasks

1. Archive old demo records
2. Backup spreadsheet
3. Review teacher performance trends
4. Generate teacher profiles for reviews
5. Clean up completed students

### Monthly Tasks

1. Full system audit
2. Performance reviews for all teachers
3. Update availability schedules
4. Archive historical data
5. Generate summary reports

---

## 14. Performance Optimization

### For Large Datasets

**Recommended Limits:**
- Teachers per type: Up to 100
- Active students: Up to 1000
- Demo records: Archive monthly

**Optimization Tips:**
1. Archive old demo records to separate sheet
2. Use filters instead of searching
3. Generate reports during off-hours
4. Limit real-time calculations

### Script Execution

**Timeouts:**
- Google Apps Script: 6-minute limit per execution
- Batch operations for large datasets
- Use time-based triggers for long tasks

---

## 15. Security and Privacy

### Data Protection

**Built-in:**
- All data stored in Google Sheets
- Google's security infrastructure
- Access control via Google Drive sharing

**Recommendations:**
1. Limit edit access to admins only
2. Use view-only access for reports
3. Regular backups to prevent data loss
4. Don't share personal information externally

### Access Levels

**Owner/Admin:**
- Full access to all features
- Can add/remove teachers
- Can modify system

**Editor:**
- Can assign demos
- Can process results
- Can generate reports

**Viewer:**
- Read-only access
- Can view reports
- Cannot modify data

---

## Version History

**Version 1.0.0 (Current)**
- Initial release
- All core features implemented
- Full documentation included

---

**End of Feature Documentation**
