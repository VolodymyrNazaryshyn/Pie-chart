function drawPieChart() {
    const input = document.getElementById("dataInput").value;
    const entries = input.split(',').map(entry => {
        const [value, label] = entry.split(':').map(item => item.trim());
        return { value: parseFloat(value), label };
    });

    if (entries.some(entry => isNaN(entry.value) || !entry.label)) {
        alert("Будь ласка, введіть коректні значення у форматі «value:label» (наприклад, 20:text1, 80:text2).");
        return;
    }

    const canvas = document.getElementById("pieChartCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the total sum
    const total = entries.reduce((sum, entry) => sum + entry.value, 0);

    // Define start angle
    let startAngle = 0;

    // Colors for the segments
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#E74C3C"];

    // Draw the segments and labels
    entries.forEach((entry, index) => {
        const sliceAngle = (entry.value / total) * 2 * Math.PI;
        const midAngle = startAngle + sliceAngle / 2;

        // Draw the pie slice
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
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

        // Draw the label
        const labelX = canvas.width / 2 + Math.cos(midAngle) * (canvas.width / 4);
        const labelY = canvas.height / 2 + Math.sin(midAngle) * (canvas.height / 4);

        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(entry.label, labelX, labelY);

        // Update the start angle for the next slice
        startAngle += sliceAngle;
    });
}
