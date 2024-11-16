function drawPieChart() {
    const input = document.getElementById("dataInput").value;
    const values = input.split(',').map(num => parseFloat(num.trim()));

    if (values.some(isNaN)) {
        alert("Будь ласка, введіть правильні числа, розділені комами.");
        return;
    }

    const canvas = document.getElementById("pieChartCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the total sum
    const total = values.reduce((sum, value) => sum + value, 0);

    // Define start angle
    let startAngle = 0;

    // Colors for the segments
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#E74C3C"];

    // Draw the segments
    values.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2); // Move to center
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            Math.min(canvas.width / 2, canvas.height / 2) - 10, // Radius
            startAngle,
            startAngle + sliceAngle
        );
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        // Update the start angle for the next slice
        startAngle += sliceAngle;
    });
}
