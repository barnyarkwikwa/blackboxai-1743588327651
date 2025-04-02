// Schedule data for April
const schedule = [
    ["C", "A", "B", "C", "A", "B+C"], // 1-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 2-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 3-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 4-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 5-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 6-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 7-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 8-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 9-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 10-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 11-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 12-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 13-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 14-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 15-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 16-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 17-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 18-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 19-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 20-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 21-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 22-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 23-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 24-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 25-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 26-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 27-Apr
    ["C", "A", "B", "C", "A", "B+C"], // 28-Apr
    ["A", "B", "C", "A", "B", "C+A"], // 29-Apr
    ["B", "C", "A", "B", "C", "A+B"], // 30-Apr
];

// Function to get the current time slot based on hour
function getCurrentTimeSlot() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 9) return 0;
    if (hour >= 9 && hour < 13) return 1;
    if (hour >= 13 && hour < 17) return 2;
    if (hour >= 17 && hour < 21) return 3;
    if (hour >= 21 && hour < 24) return 4;
    return 5; // 1-5 AM
}

// Function to format date and time
function formatDateTime(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Function to get status message
function getStatusMessage(selectedOption) {
    try {
        const today = new Date();
        const day = today.getDate() - 1; // Adjust for zero-based index
        const timeSlot = getCurrentTimeSlot();

        // Validate date range
        if (day < 0 || day >= schedule.length) {
            throw new Error("Invalid date: Date is outside the schedule range");
        }

        const status = schedule[day][timeSlot];
        const isOn = status.includes(selectedOption);
        
        // Update last checked time
        const lastUpdated = document.getElementById('lastUpdated');
        lastUpdated.textContent = `Last updated: ${formatDateTime(today)}`;
        
        return isOn ? "မီးလာပါတယ်" : "မီးပျက်ပါတယ်";
    } catch (error) {
        console.error('Error getting status:', error);
        return "Error: Unable to determine status";
    }
}

// Function to handle option selection
function selectOption(option) {
    try {
        const resultDiv = document.getElementById("result");
        const statusMessage = getStatusMessage(option);
        
        // Add animation class
        resultDiv.style.opacity = "0";
        
        // Update text and fade in
        setTimeout(() => {
            resultDiv.textContent = `Selected Option ${option}: ${statusMessage}`;
            resultDiv.style.opacity = "1";
        }, 200);

        // Highlight selected cube
        const cubes = document.querySelectorAll('.cube');
        cubes.forEach(cube => {
            cube.style.transform = 'scale(1)';
            cube.style.opacity = '0.8';
        });
        
        const selectedCube = document.getElementById(`cube${option}`);
        selectedCube.style.transform = 'scale(1.05)';
        selectedCube.style.opacity = '1';
    } catch (error) {
        console.error('Error in selectOption:', error);
        const resultDiv = document.getElementById("result");
        resultDiv.textContent = "Error: Unable to process selection";
    }
}

// Add fade transition to result div
document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById("result");
    resultDiv.style.transition = 'opacity 0.2s ease-in-out';
});