# System Flow Diagrams

## Teacher-Student Management System - Visual Guide

---

## 1. Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEACHER-STUDENT SYSTEM                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────────┐
        │         INITIALIZATION PHASE              │
        │  • Creates all required sheets            │
        │  • Sets up headers and formatting         │
        │  • Prepares system for use                │
        └──────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                            │
        ▼                                            ▼
┌──────────────────┐                    ┌──────────────────┐
│  TEACHER MODULE  │                    │  STUDENT MODULE  │
│  • Add Teacher   │                    │  • Assign Demo   │
│  • Track Avail.  │                    │  • Process Result│
│  • Performance   │                    │  • Move Students │
└──────────────────┘                    └──────────────────┘
        │                                            │
        └─────────────────────┬─────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────────┐
        │          REPORTING & ANALYTICS            │
        │  • Daily Reports                          │
        │  • Performance Tracking                   │
        │  • Teacher Profiles                       │
        └──────────────────────────────────────────┘
```

---

## 2. Teacher Addition Flow

```
START: Add Teacher
        │
        ▼
┌──────────────────┐
│ Select Type      │  ◄── Normal/Internship/Trial/VIP/Basic
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Enter Details    │  ◄── Name, Email, Phone
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Set Availability │  ◄── From: 09:00, Till: 17:00
└──────────────────┘
        │
        ▼
┌──────────────────┐      ┌─────────────────────┐
│ Generate ID      │ ───► │ Auto: N01           │
│ (or Manual)      │      │ Manual: User enters │
└──────────────────┘      └─────────────────────┘
        │
        ▼
┌──────────────────┐
│ Calculate Slots  │
│ • 30-min slots   │  ◄── 09:00-09:30, 09:30-10:00, ...
│ • 40-min slots   │  ◄── 09:00-09:40, 09:40-10:20, ...
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Save to Sheet    │  ───► Teacher Sheet (by type)
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Update Perf.     │  ───► Teacher Performance Sheet
└──────────────────┘
        │
        ▼
      SUCCESS
```

---

## 3. Demo Assignment Flow

```
START: Assign Demo
        │
        ▼
┌──────────────────┐
│ Select Student   │  ◄── Type: Basic/Normal/Internship/Trial/VIP
│ Type             │
└──────────────────┘
        │
        ▼
┌──────────────────┐      ┌─────────────────────┐
│ System Filters   │ ───► │ Show ONLY teachers  │
│ Teachers         │      │ of selected type    │
└──────────────────┘      └─────────────────────┘
        │
        ▼
┌──────────────────┐
│ Enter Student    │  ◄── Name, Email, Phone
│ Details          │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Select Teacher   │  ◄── Dropdown (type-filtered)
└──────────────────┘
        │
        ▼
┌──────────────────────────────────┐
│   Display Available Slots         │
│  ┌─────────────┬─────────────┐   │
│  │  30-min     │   40-min    │   │
│  ├─────────────┼─────────────┤   │
│  │ 09:00-09:30 │ 09:00-09:40 │   │
│  │ 09:30-10:00 │ 09:40-10:20 │   │
│  │ 10:00-10:30 │ 10:20-11:00 │   │
│  └─────────────┴─────────────┘   │
└──────────────────────────────────┘
        │
        ▼
┌──────────────────┐      ┌─────────────────────┐
│ User Clicks Slot │ ───► │ Selected: Highlight │
│                  │      │ Other: Fade         │
└──────────────────┘      └─────────────────────┘
        │
        ▼
┌──────────────────┐
│ Occupy Slot      │  ───► Add to teacher's occupied list
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Save Demo        │  ───► Demo Assignment Sheet (by type)
└──────────────────┘
        │
        ▼
      SUCCESS
```

---

## 4. Demo Result Processing Flow

```
START: Demo Completed
        │
        ▼
┌──────────────────┐
│ Process Result   │  ◄── Select Demo Sheet & Row
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Enter Result     │  ◄── PASSED or FAILED
└──────────────────┘
        │
    ┌───┴───┐
    │       │
    ▼       ▼
PASSED   FAILED
    │       │
    │       └──────► ┌──────────────────┐
    │                │ Release Slot     │
    │                └──────────────────┘
    │                        │
    │                        ▼
    │                ┌──────────────────┐
    │                │ Update Teacher   │
    │                │ Failed +1        │
    │                └──────────────────┘
    │                        │
    │                        ▼
    │                    END: Available
    │
    └──────► ┌──────────────────┐
             │ Keep Slot        │
             │ Occupied         │
             └──────────────────┘
                     │
                     ▼
             ┌──────────────────┐
             │ Move Student to  │
             │ Active Sheet     │
             └──────────────────┘
                     │
                     ▼
             ┌──────────────────┐
             │ Record Fee Paid  │
             │ Date = Today     │
             └──────────────────┘
                     │
                     ▼
             ┌──────────────────┐
             │ Update Teacher   │
             │ Passed +1        │
             └──────────────────┘
                     │
                     ▼
             ┌──────────────────┐
             │ Update Current   │
             │ Students List    │
             └──────────────────┘
                     │
                     ▼
                 END: Active
```

---

## 5. Performance Tracking Logic

```
Every Demo Completion
        │
        ▼
┌──────────────────┐
│ Update Teacher   │
│ Statistics       │
│ • Total Demos+1  │
│ • Passed or      │
│   Failed +1      │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Calculate        │
│ Pass Rate %      │
│ (Passed/Total)   │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Check Red Flag   │
│ Conditions       │
└──────────────────┘
        │
    ┌───┴───┐
    │       │
    ▼       ▼
  YES      NO
    │       │
    │       └──────► ┌──────────────────┐
    │                │ Status: Active   │
    │                │ Color: Normal    │
    │                └──────────────────┘
    │                        │
    │                        ▼
    │                      END
    │
    └──────► ┌──────────────────┐
             │ Check Condition  │
             └──────────────────┘
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐
    │5 Consec.│ │10 Demos │ │ Other   │
    │Failures?│ │≤20% Pass│ │Low Perf?│
    └─────────┘ └─────────┘ └─────────┘
         │           │           │
         └───────────┴───────────┘
                     │
                     ▼ (Any YES)
             ┌──────────────────┐
             │ Status: Poor     │
             │ Performance      │
             │ Color: RED       │
             └──────────────────┘
                     │
                     ▼
                   END
```

---

## 6. Sheet Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                      TEACHER SHEETS                         │
│  Normal │ Internship │ Trial │ VIP │ Basic                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ (Teacher data flows to)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 DEMO ASSIGNMENT SHEETS                      │
│  Demo - Normal │ Demo - Internship │ Demo - Trial │ ...     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ (Demo result determines)
                              ▼
         ┌────────────────────┴────────────────────┐
         ▼ (PASSED)                                 ▼ (FAILED)
┌──────────────────────────┐              ┌──────────────────┐
│  ACTIVE STUDENT SHEETS   │              │ Remains in Demo  │
│  Active - Normal         │              │ Can Reassign     │
│  Active - Internship     │              └──────────────────┘
│  Active - Trial          │
│  Active - VIP            │
│  Active - Basic          │
└──────────────────────────┘
         │
         │ (Data aggregated for)
         ▼
┌─────────────────────────────────────────────────────────────┐
│                      REPORT SHEETS                          │
│  • Reports (Daily summaries)                                │
│  • Teacher Performance (Individual stats)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Time Slot State Machine

```
              ┌─────────────────┐
              │   AVAILABLE     │  ◄── Initial state
              │   (in slots30   │      when teacher added
              │    or slots40)  │
              └─────────────────┘
                      │
                      │ Demo Assigned
                      ▼
              ┌─────────────────┐
              │    OCCUPIED     │  ◄── Moved to occupied
              │  (in occupied   │      slots list
              │     slots)      │
              └─────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          │ Demo Result           │
          ▼                       ▼
    ┌──────────┐           ┌──────────┐
    │ PASSED   │           │ FAILED   │
    └──────────┘           └──────────┘
          │                       │
          │ (Stays)               │ (Released)
          ▼                       ▼
    ┌──────────┐           ┌──────────┐
    │ OCCUPIED │           │AVAILABLE │
    │ Until    │           │ Again    │
    │ Student  │           └──────────┘
    │ Leaves   │
    └──────────┘
          │
          │ Student Removed
          ▼
    ┌──────────┐
    │AVAILABLE │
    │ Again    │
    └──────────┘
```

---

## 8. Data Entry → Output Flow

```
INPUT (User Entry)
        │
        ▼
┌──────────────────┐
│ Teacher Info     │  ─► Name, Type, Availability
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ PROCESSING       │
│ • Generate ID    │
│ • Calculate Slots│
│ • Validate Data  │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ STORAGE          │
│ • Teacher Sheet  │
│ • Performance Sh.│
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ USAGE            │
│ • Demo Assign    │
│ • Slot Selection │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ TRACKING         │
│ • Results        │
│ • Performance    │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ OUTPUT           │
│ • Reports        │
│ • Profiles       │
│ • Analytics      │
└──────────────────┘
```

---

## 9. User Interface Menu Structure

```
Teacher-Student System (Menu)
│
├─ Initialize System
│
├─ Teacher Management
│  ├─ Add Teacher
│  └─ Remove Teacher
│
├─ Demo Management
│  ├─ Assign Demo
│  └─ Process Demo Result
│
├─ Reports & Analytics
│  ├─ Generate Teacher Profile
│  ├─ Generate Reports
│  └─ Refresh Teacher Performance
│
└─ Help (Documentation)
```

---

## 10. Decision Tree: Should Teacher Be Marked Red?

```
                    START
                      │
                      ▼
              Has 5 consecutive
               failures? ────── YES ───► MARK RED
                      │
                      NO
                      │
                      ▼
              Has 10+ demos
                assigned? ────── NO ────► Stay Active
                      │
                      YES
                      │
                      ▼
              Pass rate
               ≤ 20%? ────────── YES ───► MARK RED
                      │
                      NO
                      │
                      ▼
                 Stay Active
```

---

## 11. System Initialization Sequence

```
User clicks "Initialize System"
        │
        ▼
Create Teacher Sheets (5)
├─ Normal Teachers
├─ Internship Teachers
├─ Trial Teachers
├─ VIP Teachers
└─ Basic Teachers
        │
        ▼
Create Demo Sheets (5)
├─ Demo Assigned - Normal
├─ Demo Assigned - Internship
├─ Demo Assigned - Trial
├─ Demo Assigned - VIP
└─ Demo Assigned - Basic
        │
        ▼
Create Active Student Sheets (5)
├─ Active Students - Normal
├─ Active Students - Internship
├─ Active Students - Trial
├─ Active Students - VIP
└─ Active Students - Basic
        │
        ▼
Create Report Sheets (2)
├─ Reports
└─ Teacher Performance
        │
        ▼
Set Headers & Formatting
        │
        ▼
Success Message
        │
        ▼
System Ready to Use
```

---

## 12. Daily Workflow Diagram

```
    MORNING              DURING DAY           EVENING
       │                      │                   │
       ▼                      ▼                   ▼
┌──────────┐         ┌──────────────┐    ┌──────────┐
│ Review   │         │ Assign Demos │    │ Process  │
│Yesterday │         │              │    │ Results  │
│Report    │         │ Process      │    │          │
└──────────┘         │ Results      │    └──────────┘
       │             │ (as needed)  │            │
       ▼             └──────────────┘            ▼
┌──────────┐                │             ┌──────────┐
│ Check    │                │             │ Generate │
│Teacher   │                │             │ Daily    │
│Performnce│                │             │ Report   │
└──────────┘                │             └──────────┘
       │                    │                    │
       └────────────────────┴────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Update       │
                    │ Performance  │
                    │ Metrics      │
                    └──────────────┘
```

---

**End of Visual Diagrams**

For more information, refer to:
- README.md - Full documentation
- FEATURES.md - Feature details
- QUICKREF.md - Quick reference
