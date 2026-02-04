# Quick Reference Guide

## Teacher-Student Management System - Cheat Sheet

### Quick Actions

| Action | Menu Path | Shortcut |
|--------|-----------|----------|
| Add Teacher | Teacher-Student System → Add Teacher | Alt+T, A |
| Assign Demo | Teacher-Student System → Assign Demo | Alt+T, D |
| Process Result | Teacher-Student System → Process Demo Result | Alt+T, P |
| Generate Report | Teacher-Student System → Generate Reports | Alt+T, R |
| View Performance | Go to "Teacher Performance" sheet | - |

---

## Teacher ID Prefixes

| Type | Prefix | Example |
|------|--------|---------|
| Normal | N | N01, N02, N03 |
| Internship | Ti | Ti01, Ti02, Ti03 |
| Trial | T | T01, T02, T03 |
| VIP | V | V01, V02, V03 |
| Basic | B | B01, B02, B03 |

---

## Demo Assignment Flow

```
1. Select Student Type (e.g., Basic)
   ↓
2. System filters to show only Basic teachers
   ↓
3. Select Teacher
   ↓
4. System displays available slots in 2 columns
   30-minute slots | 40-minute slots
   ↓
5. Click on desired time slot
   ↓
6. Other column fades automatically
   ↓
7. Slot is occupied for that teacher
```

---

## Demo Result Processing

### When Demo PASSES:
- ✅ Student moves to Active Students sheet
- ✅ Time slot stays occupied
- ✅ Fee paid date recorded
- ✅ Teacher gets +1 passed demo

### When Demo FAILS:
- ❌ Time slot released (available again)
- ❌ Student stays in Demo sheet
- ❌ Teacher gets +1 failed demo
- ❌ Can reassign to another teacher/time

---

## Performance Red Flags

Teacher marked **RED** when:

1. **5 consecutive failures**
   ```
   Demo 1: FAILED
   Demo 2: FAILED
   Demo 3: FAILED
   Demo 4: FAILED
   Demo 5: FAILED → 🔴 RED
   ```

2. **10+ demos with ≤20% pass rate**
   ```
   10 demos, 2 passed = 20% → 🔴 RED
   10 demos, 0 passed = 0%  → 🔴 RED
   10 demos, 3 passed = 30% → ✅ OK
   ```

---

## Common Tasks

### Add a New Teacher
```
1. Click: Teacher-Student System → Add Teacher
2. Select Type: Normal/Internship/Trial/VIP/Basic
3. Enter Name: John Doe
4. Set Time: 09:00 to 17:00
5. Click: Add Teacher
   Result: ID generated (e.g., N01)
```

### Assign First Demo
```
1. Click: Teacher-Student System → Assign Demo
2. Student Type: Basic
3. Student Name: Jane Smith
4. Teacher: Select from dropdown (only Basic teachers shown)
5. Click on time slot: e.g., 10:00 - 10:30
6. Click: Assign Demo
   Result: Demo added, slot occupied
```

### Process Demo Result
```
1. Go to: Demo Assigned - Basic sheet
2. Find: Jane Smith's row (e.g., row 2)
3. Click: Teacher-Student System → Process Demo Result
4. Sheet: Demo Assigned - Basic
5. Row: 2
6. Result: PASSED
7. Click: Mark Passed
   Result: Jane moves to Active Students - Basic
```

### Generate Daily Report
```
1. Click: Teacher-Student System → Generate Reports
2. Check: Reports sheet
3. View: Today's statistics
```

### Download Teacher Profile
```
1. Click: Teacher-Student System → Generate Teacher Profile
2. Enter: Teacher ID (e.g., N01)
3. Click: Generate Profile
4. New sheet created: Profile_N01
5. File → Download → PDF/Excel/CSV
```

---

## Sheet Navigation

### Teacher Sheets (View/Edit Teachers)
- Normal Teachers
- Internship Teachers
- Trial Teachers
- VIP Teachers
- Basic Teachers

### Demo Sheets (Assign/Track Demos)
- Demo Assigned - Normal
- Demo Assigned - Internship
- Demo Assigned - Trial
- Demo Assigned - VIP
- Demo Assigned - Basic

### Active Sheets (Current Students)
- Active Students - Normal
- Active Students - Internship
- Active Students - Trial
- Active Students - VIP
- Active Students - Basic

### Report Sheets (Analytics)
- Reports (Daily summaries)
- Teacher Performance (Individual stats)

---

## Keyboard Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Open Menu | Alt+T | Cmd+Option+T |
| Find in Sheet | Ctrl+F | Cmd+F |
| Filter | Ctrl+Shift+L | Cmd+Shift+L |
| Sort | Alt+D, S | Cmd+Option+D, S |

---

## Data Entry Shortcuts

### Time Format
- **Correct**: 09:00, 13:30, 17:45
- **Incorrect**: 9am, 1:30pm, 17.45

### Date Format
- System uses Google Sheets default
- Typically: MM/DD/YYYY or DD/MM/YYYY based on locale

### ID Format
- **Auto**: Leave blank for auto-generation
- **Manual**: Enter with prefix (e.g., N99, Ti15)

---

## Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Menu not showing | Refresh page (F5) |
| Teacher not in dropdown | Check teacher type matches student type |
| Can't remove teacher | Check for active students, reassign first |
| Slots not displaying | Verify time format (HH:MM) |
| Demo won't assign | Ensure all required fields filled |
| Report shows 0 | Check date fields in records |

---

## Daily Workflow Example

### Morning (9:00 AM)
```
1. Check yesterday's report
2. Review teacher performance sheet
3. Note any red-flagged teachers
```

### During Day
```
For each new student inquiry:
1. Add to demo assignment sheet
2. Select appropriate teacher
3. Choose time slot
4. After demo, process result immediately
```

### End of Day (5:00 PM)
```
1. Process all remaining demo results
2. Generate daily report
3. Update teacher performance
4. Review tomorrow's schedule
```

---

## Formula Quick Reference

### Manual Formulas (if needed)

**Count Active Students:**
```
=COUNTA(A2:A) - 1
```

**Calculate Pass Rate:**
```
=(Passed / Total) * 100
```

**Count Today's Records:**
```
=COUNTIF(H:H, TODAY())
```

---

## Export Options

### Individual Teacher Profile
1. Generate profile sheet
2. File → Download → PDF/Excel

### Full Report
1. Select Reports sheet
2. File → Download → Excel
3. Use for external analysis

### Backup Entire System
1. File → Make a copy
2. Name: "System Backup YYYY-MM-DD"
3. Store safely

---

## Contact & Support

**For Technical Issues:**
- Check execution log in Apps Script
- Review SETUP.md troubleshooting section
- Verify all sheets exist

**For Feature Requests:**
- Document desired functionality
- Consider customization options
- Check if manual process exists

---

## Version Info

**Current Version:** 1.0.0  
**Last Updated:** 2024  
**Platform:** Google Apps Script / Google Sheets  

---

## Pro Tips

💡 **Tip 1:** Use filters on sheets to quickly find specific teachers or students

💡 **Tip 2:** Archive old demo records monthly to keep sheets fast

💡 **Tip 3:** Set up daily time-based triggers for automatic reports

💡 **Tip 4:** Use conditional formatting to highlight important data

💡 **Tip 5:** Create views with Google Sheets "Filter views" for different user roles

💡 **Tip 6:** Export Reports sheet to Excel for advanced charting

💡 **Tip 7:** Use VLOOKUP to cross-reference data between sheets

💡 **Tip 8:** Set up email notifications for poor-performing teachers

💡 **Tip 9:** Keep a separate "Archive" spreadsheet for historical data

💡 **Tip 10:** Document your customizations in a separate notes sheet

---

**End of Quick Reference**

For detailed information, see:
- **README.md** - Full documentation
- **SETUP.md** - Installation guide
- **FEATURES.md** - Feature details
