/**
 * Teacher-Student Management System
 * Main Google Apps Script file
 */

// Sheet names configuration
const SHEET_NAMES = {
  // Teacher sheets by type
  NORMAL_TEACHERS: 'Normal Teachers',
  INTERNSHIP_TEACHERS: 'Internship Teachers',
  TRIAL_TEACHERS: 'Trial Teachers',
  VIP_TEACHERS: 'VIP Teachers',
  BASIC_TEACHERS: 'Basic Teachers',
  
  // Demo assignment sheets
  DEMO_NORMAL: 'Demo Assigned - Normal',
  DEMO_INTERNSHIP: 'Demo Assigned - Internship',
  DEMO_TRIAL: 'Demo Assigned - Trial',
  DEMO_VIP: 'Demo Assigned - VIP',
  DEMO_BASIC: 'Demo Assigned - Basic',
  
  // Active student sheets
  ACTIVE_NORMAL: 'Active Students - Normal',
  ACTIVE_INTERNSHIP: 'Active Students - Internship',
  ACTIVE_TRIAL: 'Active Students - Trial',
  ACTIVE_VIP: 'Active Students - VIP',
  ACTIVE_BASIC: 'Active Students - Basic',
  
  // Reports
  REPORTS: 'Reports',
  TEACHER_PERFORMANCE: 'Teacher Performance'
};

// Teacher ID prefixes
const TEACHER_PREFIXES = {
  NORMAL: 'N',
  INTERNSHIP: 'Ti',
  TRIAL: 'T',
  VIP: 'V',
  BASIC: 'B'
};

/**
 * Creates the menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Teacher-Student System')
    .addItem('Initialize System', 'initializeSystem')
    .addSeparator()
    .addItem('Add Teacher', 'showAddTeacherDialog')
    .addItem('Remove Teacher', 'showRemoveTeacherDialog')
    .addSeparator()
    .addItem('Assign Demo', 'showAssignDemoDialog')
    .addItem('Process Demo Result', 'showDemoResultDialog')
    .addSeparator()
    .addItem('Generate Teacher Profile', 'showTeacherProfileDialog')
    .addItem('Generate Reports', 'generateDailyReport')
    .addSeparator()
    .addItem('Refresh Teacher Performance', 'updateAllTeacherPerformance')
    .addToUi();
}

/**
 * Initializes the system with all required sheets and headers
 */
function initializeSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create teacher sheets
  createTeacherSheets(ss);
  
  // Create demo assignment sheets
  createDemoSheets(ss);
  
  // Create active student sheets
  createActiveStudentSheets(ss);
  
  // Create report sheets
  createReportSheets(ss);
  
  SpreadsheetApp.getUi().alert('System initialized successfully!');
}

/**
 * Creates teacher sheets for each type
 */
function createTeacherSheets(ss) {
  const teacherTypes = [
    { name: SHEET_NAMES.NORMAL_TEACHERS, prefix: TEACHER_PREFIXES.NORMAL },
    { name: SHEET_NAMES.INTERNSHIP_TEACHERS, prefix: TEACHER_PREFIXES.INTERNSHIP },
    { name: SHEET_NAMES.TRIAL_TEACHERS, prefix: TEACHER_PREFIXES.TRIAL },
    { name: SHEET_NAMES.VIP_TEACHERS, prefix: TEACHER_PREFIXES.VIP },
    { name: SHEET_NAMES.BASIC_TEACHERS, prefix: TEACHER_PREFIXES.BASIC }
  ];
  
  teacherTypes.forEach(type => {
    let sheet = ss.getSheetByName(type.name);
    if (!sheet) {
      sheet = ss.insertSheet(type.name);
    }
    
    // Set headers
    const headers = [
      'Teacher ID',
      'Name',
      'Email',
      'Phone',
      'Type',
      'Available From',
      'Available Till',
      '30min Slots Available',
      '40min Slots Available',
      'Occupied Slots',
      'Total Demos',
      'Demos Passed',
      'Demos Failed',
      'Pass Rate %',
      'Status',
      'Current Students',
      'Date Added'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  });
}

/**
 * Creates demo assignment sheets
 */
function createDemoSheets(ss) {
  const demoTypes = [
    SHEET_NAMES.DEMO_NORMAL,
    SHEET_NAMES.DEMO_INTERNSHIP,
    SHEET_NAMES.DEMO_TRIAL,
    SHEET_NAMES.DEMO_VIP,
    SHEET_NAMES.DEMO_BASIC
  ];
  
  demoTypes.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    
    const headers = [
      'Student Name',
      'Email',
      'Phone',
      'Teacher (Dropdown)',
      'Session Type',
      'Available 30min Slots',
      'Available 40min Slots',
      'Selected Slot',
      'Demo Date',
      'Demo Result',
      'Notes',
      'Assigned Date'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#34a853').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  });
}

/**
 * Creates active student sheets
 */
function createActiveStudentSheets(ss) {
  const activeTypes = [
    SHEET_NAMES.ACTIVE_NORMAL,
    SHEET_NAMES.ACTIVE_INTERNSHIP,
    SHEET_NAMES.ACTIVE_TRIAL,
    SHEET_NAMES.ACTIVE_VIP,
    SHEET_NAMES.ACTIVE_BASIC
  ];
  
  activeTypes.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    
    const headers = [
      'Student Name',
      'Email',
      'Phone',
      'Teacher ID',
      'Teacher Name',
      'Session Type',
      'Time Slot',
      'Fee Paid Date',
      'Status',
      'Start Date',
      'Notes'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#fbbc04').setFontColor('#000000');
    sheet.setFrozenRows(1);
    
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  });
}

/**
 * Creates report sheets
 */
function createReportSheets(ss) {
  // Reports sheet
  let reportsSheet = ss.getSheetByName(SHEET_NAMES.REPORTS);
  if (!reportsSheet) {
    reportsSheet = ss.insertSheet(SHEET_NAMES.REPORTS);
  }
  
  const reportHeaders = [
    'Date',
    'Students Paid Fee Today',
    'New Active Students',
    'Total Active Students',
    'Total Demos Assigned',
    'Demos Passed Today',
    'Demos Failed Today',
    'Overall Pass Rate %'
  ];
  
  reportsSheet.getRange(1, 1, 1, reportHeaders.length).setValues([reportHeaders]);
  reportsSheet.getRange(1, 1, 1, reportHeaders.length).setFontWeight('bold').setBackground('#ea4335').setFontColor('#ffffff');
  reportsSheet.setFrozenRows(1);
  
  // Teacher Performance sheet
  let perfSheet = ss.getSheetByName(SHEET_NAMES.TEACHER_PERFORMANCE);
  if (!perfSheet) {
    perfSheet = ss.insertSheet(SHEET_NAMES.TEACHER_PERFORMANCE);
  }
  
  const perfHeaders = [
    'Teacher ID',
    'Teacher Name',
    'Type',
    'Total Demos',
    'Passed',
    'Failed',
    'Pass Rate %',
    'Consecutive Failures',
    'Status',
    'Last Updated'
  ];
  
  perfSheet.getRange(1, 1, 1, perfHeaders.length).setValues([perfHeaders]);
  perfSheet.getRange(1, 1, 1, perfHeaders.length).setFontWeight('bold').setBackground('#9900ff').setFontColor('#ffffff');
  perfSheet.setFrozenRows(1);
}

/**
 * Generates next teacher ID for a given type
 */
function generateTeacherId(teacherType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = getTeacherSheetName(teacherType);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error('Teacher sheet not found: ' + sheetName);
  }
  
  const prefix = TEACHER_PREFIXES[teacherType.toUpperCase()];
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return prefix + '01';
  }
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let maxNumber = 0;
  
  ids.forEach(row => {
    const id = row[0];
    if (id && typeof id === 'string' && id.startsWith(prefix)) {
      const num = parseInt(id.substring(prefix.length));
      if (!isNaN(num) && num > maxNumber) {
        maxNumber = num;
      }
    }
  });
  
  const nextNumber = maxNumber + 1;
  return prefix + String(nextNumber).padStart(2, '0');
}

/**
 * Gets teacher sheet name from type
 */
function getTeacherSheetName(type) {
  const typeMap = {
    'NORMAL': SHEET_NAMES.NORMAL_TEACHERS,
    'INTERNSHIP': SHEET_NAMES.INTERNSHIP_TEACHERS,
    'TRIAL': SHEET_NAMES.TRIAL_TEACHERS,
    'VIP': SHEET_NAMES.VIP_TEACHERS,
    'BASIC': SHEET_NAMES.BASIC_TEACHERS
  };
  
  return typeMap[type.toUpperCase()];
}

/**
 * Calculates available time slots from a time range
 */
function calculateTimeSlots(fromTime, toTime, slotDuration) {
  const slots = [];
  
  // Parse time strings (format: HH:MM)
  const [fromHour, fromMin] = fromTime.split(':').map(Number);
  const [toHour, toMin] = toTime.split(':').map(Number);
  
  let currentMin = fromHour * 60 + fromMin;
  const endMin = toHour * 60 + toMin;
  
  while (currentMin + slotDuration <= endMin) {
    const startHour = Math.floor(currentMin / 60);
    const startMin = currentMin % 60;
    const endHour = Math.floor((currentMin + slotDuration) / 60);
    const endMin = (currentMin + slotDuration) % 60;
    
    const slotStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - ${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
    slots.push(slotStr);
    
    currentMin += slotDuration;
  }
  
  return slots;
}

/**
 * Adds a new teacher
 */
function addTeacher(teacherData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = getTeacherSheetName(teacherData.type);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error('Teacher sheet not found');
  }
  
  // Generate teacher ID if not provided
  const teacherId = teacherData.id || generateTeacherId(teacherData.type);
  
  // Calculate time slots
  const slots30 = calculateTimeSlots(teacherData.availableFrom, teacherData.availableTill, 30);
  const slots40 = calculateTimeSlots(teacherData.availableFrom, teacherData.availableTill, 40);
  
  const row = [
    teacherId,
    teacherData.name,
    teacherData.email,
    teacherData.phone,
    teacherData.type,
    teacherData.availableFrom,
    teacherData.availableTill,
    slots30.join(', '),
    slots40.join(', '),
    '', // Occupied slots
    0,  // Total demos
    0,  // Passed
    0,  // Failed
    0,  // Pass rate
    'Active',
    '', // Current students
    new Date()
  ];
  
  sheet.appendRow(row);
  
  // Update teacher performance sheet
  updateTeacherPerformance(teacherId, teacherData.name, teacherData.type);
  
  return teacherId;
}

/**
 * Gets available slots for a teacher excluding occupied ones
 */
function getAvailableSlots(teacherId, slotDuration) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    return [];
  }
  
  const allSlots = slotDuration === 30 ? 
    teacherData.slots30.split(', ') : 
    teacherData.slots40.split(', ');
  
  const occupiedSlots = teacherData.occupiedSlots ? 
    teacherData.occupiedSlots.split(', ') : 
    [];
  
  return allSlots.filter(slot => !occupiedSlots.includes(slot));
}

/**
 * Gets teacher data by ID
 */
function getTeacherData(teacherId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    SHEET_NAMES.NORMAL_TEACHERS,
    SHEET_NAMES.INTERNSHIP_TEACHERS,
    SHEET_NAMES.TRIAL_TEACHERS,
    SHEET_NAMES.VIP_TEACHERS,
    SHEET_NAMES.BASIC_TEACHERS
  ];
  
  for (let sheetName of sheets) {
    const sheet = ss.getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === teacherId) {
        return {
          row: i + 1,
          sheet: sheet,
          id: data[i][0],
          name: data[i][1],
          email: data[i][2],
          phone: data[i][3],
          type: data[i][4],
          availableFrom: data[i][5],
          availableTill: data[i][6],
          slots30: data[i][7],
          slots40: data[i][8],
          occupiedSlots: data[i][9],
          totalDemos: data[i][10],
          passed: data[i][11],
          failed: data[i][12],
          passRate: data[i][13],
          status: data[i][14],
          currentStudents: data[i][15]
        };
      }
    }
  }
  
  return null;
}

/**
 * Occupies a time slot for a teacher
 */
function occupySlot(teacherId, slot) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    throw new Error('Teacher not found');
  }
  
  const occupiedSlots = teacherData.occupiedSlots ? 
    teacherData.occupiedSlots.split(', ').filter(s => s) : 
    [];
  
  if (!occupiedSlots.includes(slot)) {
    occupiedSlots.push(slot);
    const newOccupiedStr = occupiedSlots.join(', ');
    teacherData.sheet.getRange(teacherData.row, 10).setValue(newOccupiedStr);
  }
}

/**
 * Releases a time slot for a teacher
 */
function releaseSlot(teacherId, slot) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    throw new Error('Teacher not found');
  }
  
  const occupiedSlots = teacherData.occupiedSlots ? 
    teacherData.occupiedSlots.split(', ').filter(s => s) : 
    [];
  
  const updatedSlots = occupiedSlots.filter(s => s !== slot);
  const newOccupiedStr = updatedSlots.join(', ');
  teacherData.sheet.getRange(teacherData.row, 10).setValue(newOccupiedStr);
}

/**
 * Records a demo result and updates teacher statistics
 */
function recordDemoResult(demoSheetName, row, result) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const demoSheet = ss.getSheetByName(demoSheetName);
  
  if (!demoSheet) {
    throw new Error('Demo sheet not found');
  }
  
  const data = demoSheet.getRange(row, 1, 1, 12).getValues()[0];
  const teacherName = data[3];
  const selectedSlot = data[7];
  
  // Find teacher by name
  const teacherData = findTeacherByName(teacherName);
  
  if (!teacherData) {
    throw new Error('Teacher not found');
  }
  
  // Update demo result in sheet
  demoSheet.getRange(row, 10).setValue(result);
  
  // Update teacher statistics
  const totalDemos = teacherData.totalDemos + 1;
  let passed = teacherData.passed;
  let failed = teacherData.failed;
  
  if (result === 'PASSED') {
    passed++;
    // If demo passed, move student to active sheet
    moveStudentToActive(data, teacherData, selectedSlot, demoSheetName);
  } else if (result === 'FAILED') {
    failed++;
    // Release the time slot
    releaseSlot(teacherData.id, selectedSlot);
  }
  
  const passRate = totalDemos > 0 ? (passed / totalDemos * 100).toFixed(2) : 0;
  
  teacherData.sheet.getRange(teacherData.row, 11).setValue(totalDemos);
  teacherData.sheet.getRange(teacherData.row, 12).setValue(passed);
  teacherData.sheet.getRange(teacherData.row, 13).setValue(failed);
  teacherData.sheet.getRange(teacherData.row, 14).setValue(passRate);
  
  // Check if teacher should be marked red
  updateTeacherStatus(teacherData.id);
  
  // Update performance sheet
  updateTeacherPerformance(teacherData.id, teacherData.name, teacherData.type);
}

/**
 * Finds teacher by name
 */
function findTeacherByName(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    SHEET_NAMES.NORMAL_TEACHERS,
    SHEET_NAMES.INTERNSHIP_TEACHERS,
    SHEET_NAMES.TRIAL_TEACHERS,
    SHEET_NAMES.VIP_TEACHERS,
    SHEET_NAMES.BASIC_TEACHERS
  ];
  
  for (let sheetName of sheets) {
    const sheet = ss.getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === name) {
        return {
          row: i + 1,
          sheet: sheet,
          id: data[i][0],
          name: data[i][1],
          email: data[i][2],
          phone: data[i][3],
          type: data[i][4],
          availableFrom: data[i][5],
          availableTill: data[i][6],
          slots30: data[i][7],
          slots40: data[i][8],
          occupiedSlots: data[i][9],
          totalDemos: data[i][10],
          passed: data[i][11],
          failed: data[i][12],
          passRate: data[i][13],
          status: data[i][14],
          currentStudents: data[i][15]
        };
      }
    }
  }
  
  return null;
}

/**
 * Moves student to active sheet after passing demo
 */
function moveStudentToActive(studentData, teacherData, timeSlot, demoSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Determine the active sheet based on demo sheet
  const activeSheetName = demoSheetName.replace('Demo Assigned - ', 'Active Students - ');
  const activeSheet = ss.getSheetByName(activeSheetName);
  
  if (!activeSheet) {
    throw new Error('Active sheet not found');
  }
  
  const row = [
    studentData[0], // Student name
    studentData[1], // Email
    studentData[2], // Phone
    teacherData.id,
    teacherData.name,
    studentData[4], // Session type
    timeSlot,
    new Date(), // Fee paid date
    'Active',
    new Date(), // Start date
    studentData[10] // Notes
  ];
  
  activeSheet.appendRow(row);
  
  // Update teacher's current students
  updateTeacherCurrentStudents(teacherData.id);
}

/**
 * Updates the list of current students for a teacher
 */
function updateTeacherCurrentStudents(teacherId) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheets = [
    SHEET_NAMES.ACTIVE_NORMAL,
    SHEET_NAMES.ACTIVE_INTERNSHIP,
    SHEET_NAMES.ACTIVE_TRIAL,
    SHEET_NAMES.ACTIVE_VIP,
    SHEET_NAMES.ACTIVE_BASIC
  ];
  
  const students = [];
  
  activeSheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][3] === teacherId) {
          students.push(data[i][0]); // Student name
        }
      }
    }
  });
  
  const studentList = students.join(', ');
  teacherData.sheet.getRange(teacherData.row, 16).setValue(studentList);
}

/**
 * Updates teacher status based on performance
 */
function updateTeacherStatus(teacherId) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    return;
  }
  
  let status = 'Active';
  let shouldMarkRed = false;
  
  // Check for consecutive failures (need to track this separately)
  const consecutiveFailures = getConsecutiveFailures(teacherId);
  
  if (consecutiveFailures >= 5) {
    shouldMarkRed = true;
  }
  
  // Check if 10 demos with low pass rate (<=20%)
  if (teacherData.totalDemos >= 10 && teacherData.passRate <= 20) {
    shouldMarkRed = true;
  }
  
  if (shouldMarkRed) {
    status = 'Poor Performance';
    teacherData.sheet.getRange(teacherData.row, 15).setValue(status);
    teacherData.sheet.getRange(teacherData.row, 15).setBackground('#ff0000').setFontColor('#ffffff');
  } else {
    teacherData.sheet.getRange(teacherData.row, 15).setValue(status);
    teacherData.sheet.getRange(teacherData.row, 15).setBackground('#ffffff').setFontColor('#000000');
  }
}

/**
 * Gets consecutive failures for a teacher (simplified)
 */
function getConsecutiveFailures(teacherId) {
  // This is a simplified version - in a real implementation,
  // you'd need to track demo history more carefully
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    return 0;
  }
  
  // If recently all failed, return failed count
  // This is approximate - a full implementation would need demo history
  if (teacherData.totalDemos > 0 && teacherData.passed === 0 && teacherData.totalDemos <= 5) {
    return teacherData.failed;
  }
  
  return 0;
}

/**
 * Updates teacher performance sheet
 */
function updateTeacherPerformance(teacherId, teacherName, teacherType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const perfSheet = ss.getSheetByName(SHEET_NAMES.TEACHER_PERFORMANCE);
  
  if (!perfSheet) {
    return;
  }
  
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    return;
  }
  
  const data = perfSheet.getDataRange().getValues();
  let row = -1;
  
  // Find existing row
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === teacherId) {
      row = i + 1;
      break;
    }
  }
  
  const consecutiveFailures = getConsecutiveFailures(teacherId);
  const status = teacherData.status;
  
  const perfRow = [
    teacherId,
    teacherName,
    teacherType,
    teacherData.totalDemos,
    teacherData.passed,
    teacherData.failed,
    teacherData.passRate,
    consecutiveFailures,
    status,
    new Date()
  ];
  
  if (row > 0) {
    perfSheet.getRange(row, 1, 1, perfRow.length).setValues([perfRow]);
  } else {
    perfSheet.appendRow(perfRow);
  }
}

/**
 * Updates all teacher performance data
 */
function updateAllTeacherPerformance() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    SHEET_NAMES.NORMAL_TEACHERS,
    SHEET_NAMES.INTERNSHIP_TEACHERS,
    SHEET_NAMES.TRIAL_TEACHERS,
    SHEET_NAMES.VIP_TEACHERS,
    SHEET_NAMES.BASIC_TEACHERS
  ];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        const teacherId = data[i][0];
        const teacherName = data[i][1];
        const teacherType = data[i][4];
        
        if (teacherId) {
          updateTeacherStatus(teacherId);
          updateTeacherPerformance(teacherId, teacherName, teacherType);
        }
      }
    }
  });
  
  SpreadsheetApp.getUi().alert('Teacher performance updated!');
}

/**
 * Generates daily report
 */
function generateDailyReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reportsSheet = ss.getSheetByName(SHEET_NAMES.REPORTS);
  
  if (!reportsSheet) {
    return;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Count students who paid fee today
  let studentsPaidToday = 0;
  let newActiveStudents = 0;
  let totalActiveStudents = 0;
  
  const activeSheets = [
    SHEET_NAMES.ACTIVE_NORMAL,
    SHEET_NAMES.ACTIVE_INTERNSHIP,
    SHEET_NAMES.ACTIVE_TRIAL,
    SHEET_NAMES.ACTIVE_VIP,
    SHEET_NAMES.ACTIVE_BASIC
  ];
  
  activeSheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        totalActiveStudents++;
        
        const feePaidDate = new Date(data[i][7]);
        feePaidDate.setHours(0, 0, 0, 0);
        
        if (feePaidDate.getTime() === today.getTime()) {
          studentsPaidToday++;
          newActiveStudents++;
        }
      }
    }
  });
  
  // Count demos
  let totalDemosAssigned = 0;
  let demosPassedToday = 0;
  let demosFailedToday = 0;
  
  const demoSheets = [
    SHEET_NAMES.DEMO_NORMAL,
    SHEET_NAMES.DEMO_INTERNSHIP,
    SHEET_NAMES.DEMO_TRIAL,
    SHEET_NAMES.DEMO_VIP,
    SHEET_NAMES.DEMO_BASIC
  ];
  
  demoSheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      totalDemosAssigned += data.length - 1;
      
      for (let i = 1; i < data.length; i++) {
        const result = data[i][9];
        const demoDate = data[i][8] ? new Date(data[i][8]) : null;
        
        if (demoDate) {
          demoDate.setHours(0, 0, 0, 0);
          
          if (demoDate.getTime() === today.getTime()) {
            if (result === 'PASSED') {
              demosPassedToday++;
            } else if (result === 'FAILED') {
              demosFailedToday++;
            }
          }
        }
      }
    }
  });
  
  const totalDemosToday = demosPassedToday + demosFailedToday;
  const passRate = totalDemosToday > 0 ? (demosPassedToday / totalDemosToday * 100).toFixed(2) : 0;
  
  const reportRow = [
    new Date(),
    studentsPaidToday,
    newActiveStudents,
    totalActiveStudents,
    totalDemosAssigned,
    demosPassedToday,
    demosFailedToday,
    passRate
  ];
  
  reportsSheet.appendRow(reportRow);
  
  SpreadsheetApp.getUi().alert('Daily report generated!');
}

/**
 * Gets list of teachers by type
 */
function getTeachersByType(type) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = getTeacherSheetName(type);
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const teachers = [];
  
  for (let i = 1; i < data.length; i++) {
    teachers.push({
      id: data[i][0],
      name: data[i][1],
      status: data[i][14]
    });
  }
  
  return teachers;
}

/**
 * Assigns a demo to a student with a teacher
 */
function assignDemo(demoData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Determine demo sheet based on student type
  const demoSheetMap = {
    'NORMAL': SHEET_NAMES.DEMO_NORMAL,
    'INTERNSHIP': SHEET_NAMES.DEMO_INTERNSHIP,
    'TRIAL': SHEET_NAMES.DEMO_TRIAL,
    'VIP': SHEET_NAMES.DEMO_VIP,
    'BASIC': SHEET_NAMES.DEMO_BASIC
  };
  
  const demoSheetName = demoSheetMap[demoData.studentType];
  const demoSheet = ss.getSheetByName(demoSheetName);
  
  if (!demoSheet) {
    throw new Error('Demo sheet not found');
  }
  
  // Find teacher to get ID
  const teacher = findTeacherByName(demoData.teacherName);
  
  if (!teacher) {
    throw new Error('Teacher not found');
  }
  
  // Occupy the selected slot
  occupySlot(teacher.id, demoData.selectedSlot);
  
  // Get available slots for display
  const duration = parseInt(demoData.sessionType);
  const available30 = getAvailableSlots(teacher.id, 30).join(', ');
  const available40 = getAvailableSlots(teacher.id, 40).join(', ');
  
  const row = [
    demoData.studentName,
    demoData.studentEmail,
    demoData.studentPhone,
    demoData.teacherName,
    demoData.sessionType,
    available30,
    available40,
    demoData.selectedSlot,
    '', // Demo date - to be filled when demo happens
    '', // Result
    demoData.notes,
    new Date()
  ];
  
  demoSheet.appendRow(row);
  
  return true;
}

/**
 * Removes a teacher
 */
function removeTeacher(teacherId) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    throw new Error('Teacher not found');
  }
  
  // Check if teacher has active students
  if (teacherData.currentStudents) {
    throw new Error('Cannot remove teacher with active students. Please reassign students first.');
  }
  
  // Delete the row
  teacherData.sheet.deleteRow(teacherData.row);
  
  // Remove from performance sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const perfSheet = ss.getSheetByName(SHEET_NAMES.TEACHER_PERFORMANCE);
  
  if (perfSheet) {
    const data = perfSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === teacherId) {
        perfSheet.deleteRow(i + 1);
        break;
      }
    }
  }
}

/**
 * Generates teacher profile for download
 */
function generateTeacherProfile(teacherId) {
  const teacherData = getTeacherData(teacherId);
  
  if (!teacherData) {
    throw new Error('Teacher not found');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create a new sheet for the profile
  const profileSheetName = 'Profile_' + teacherId;
  let profileSheet = ss.getSheetByName(profileSheetName);
  
  if (profileSheet) {
    ss.deleteSheet(profileSheet);
  }
  
  profileSheet = ss.insertSheet(profileSheetName);
  
  // Add profile data
  const profileData = [
    ['TEACHER PROFILE', ''],
    ['', ''],
    ['Teacher ID', teacherData.id],
    ['Name', teacherData.name],
    ['Email', teacherData.email],
    ['Phone', teacherData.phone],
    ['Type', teacherData.type],
    ['', ''],
    ['AVAILABILITY', ''],
    ['Available From', teacherData.availableFrom],
    ['Available Till', teacherData.availableTill],
    ['30min Slots', teacherData.slots30],
    ['40min Slots', teacherData.slots40],
    ['Occupied Slots', teacherData.occupiedSlots],
    ['', ''],
    ['PERFORMANCE', ''],
    ['Total Demos', teacherData.totalDemos],
    ['Demos Passed', teacherData.passed],
    ['Demos Failed', teacherData.failed],
    ['Pass Rate', teacherData.passRate + '%'],
    ['Status', teacherData.status],
    ['', ''],
    ['CURRENT STUDENTS', ''],
    ['Students', teacherData.currentStudents || 'None'],
    ['', ''],
    ['Generated On', new Date()]
  ];
  
  profileSheet.getRange(1, 1, profileData.length, 2).setValues(profileData);
  
  // Format the sheet
  profileSheet.getRange('A1:B1').merge().setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  profileSheet.getRange('A9').setFontWeight('bold').setBackground('#e0e0e0');
  profileSheet.getRange('A16').setFontWeight('bold').setBackground('#e0e0e0');
  profileSheet.getRange('A23').setFontWeight('bold').setBackground('#e0e0e0');
  
  profileSheet.autoResizeColumns(1, 2);
  
  return profileSheetName;
}

// Placeholder functions for UI dialogs (will be implemented in HTML files)
function showAddTeacherDialog() {
  const html = HtmlService.createHtmlOutputFromFile('AddTeacherDialog')
    .setWidth(400)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add New Teacher');
}

function showRemoveTeacherDialog() {
  const html = HtmlService.createHtmlOutputFromFile('RemoveTeacherDialog')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Remove Teacher');
}

function showAssignDemoDialog() {
  const html = HtmlService.createHtmlOutputFromFile('AssignDemoDialog')
    .setWidth(500)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Assign Demo');
}

function showDemoResultDialog() {
  const html = HtmlService.createHtmlOutputFromFile('DemoResultDialog')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Process Demo Result');
}

function showTeacherProfileDialog() {
  const html = HtmlService.createHtmlOutputFromFile('TeacherProfileDialog')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Generate Teacher Profile');
}
