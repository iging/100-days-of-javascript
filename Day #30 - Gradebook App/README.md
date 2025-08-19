# Gradebook App

A comprehensive tool for students and teachers to track academic performance with beautiful visualizations.

![Gradebook App](../assets/js.png)

## 📝 Description

The Gradebook App is a dual-purpose educational tool that provides separate interfaces for both students and teachers. Students can quickly check their grades and standing within a class, while teachers can manage multiple students, calculate statistics, and visualize grade distributions.

## 🔑 Features

- **Dual Interface**: Separate views for students and teachers
- **Student Features**:
  - Check individual grades and passing status
  - Compare performance to class average
  - View grade in letter format (A++, A, B, C, D, F)
- **Teacher Features**:
  - Add/remove multiple students and their scores
  - Calculate class statistics (average, highest/lowest scores)
  - Visualize grade distribution
  - Calculate pass rate percentage
- **Smart Grading System**:
  - Automatic letter grade assignment
  - Pass/fail determination
  - Performance comparison to average

## 🛠️ Technical Implementation

The app is built using:

- **HTML**: Structured with semantic elements and tab navigation
- **CSS**: Responsive dark theme with CSS variables and modern animations
- **JavaScript**: Dynamic DOM manipulation and real-time calculations

### Key Components

- **Tab System**: Toggles between student and teacher views
- **Form Validation**: Ensures accurate data entry
- **Dynamic Student Entry**: Allows teachers to add/remove student records
- **Statistical Calculations**: Processes score data for meaningful insights
- **Visual Feedback**: Color-coded grades and animated statistics

## 📋 Usage

### Student View

1. Enter your name in the input field
2. Enter your score (0-100)
3. Click "Check Result"
4. View your grade and passing status

### Teacher View

1. Enter a class name (optional)
2. Add student names and their scores
3. Use "+" button to add more students or "-" to remove entries
4. Click "Calculate Class Results"
5. View comprehensive statistics and grade distribution

## 📊 Grade Scale

| Letter Grade | Score Range | Status |
| ------------ | ----------- | ------ |
| A++          | 100         | Pass   |
| A            | 90-99       | Pass   |
| B            | 80-89       | Pass   |
| C            | 70-79       | Pass   |
| D            | 60-69       | Pass   |
| F            | 0-59        | Fail   |

## 🧪 Technical Features

- **Real-time Validation**: Immediate feedback on input errors
- **Responsive Design**: Works on devices of all sizes
- **CSS Variables**: Theme consistency with easy customization
- **Event Delegation**: Optimized event handling for dynamically added elements
- **Error Handling**: User-friendly alerts for invalid inputs

## 🚀 Future Enhancements

- Data persistence using local storage
- Export results as PDF or CSV
- Custom grading scales
- Individual student history tracking
- Course categorization and semester organization

## 📝 License

This project is part of the "100 Days of JavaScript" challenge and is licensed under the MIT License.
