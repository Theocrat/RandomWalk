const dataStructure = {
    time: [0],
    displacement: [0.0],
    collisions: [0]
}

function tabulateValues() {
    // Schedule self-run to ensure continuous regular updates to the data
    // structure (this is not recursion, it happens via the event loop)
    setTimeout(tabulateValues, 5000);

    // Create variables to store (1) the element where we display the data,
    // and (2) the data structure where we store the data. The data, of course,
    // is the tabulation of time and position of the ball
    let dataDisplay   = document.getElementById("data")
    
    // Note down the starting position
    let startingPosition = pathPoints[0]
    let x_0 = startingPosition.x
    let y_0 = startingPosition.y
    
    // Identify the current position
    let t = time
    let x_t = dots[0].x
    let y_t = dots[0].y

    // Determine the displacement
    let Δx = x_t - x_0
    let Δy = y_t - y_0
    let displacement = Math.sqrt(Δx*Δx + Δy*Δy)

    // Tabulate the positions
    dataStructure.time.push(time)
    dataStructure.displacement.push(displacement)
    dataStructure.collisions.push(pathPoints.length - 1)

    // And finally, write the table into the text area meant for displaying it!
    dataDisplay.value = JSON.stringify(dataStructure, null, 2)
}

setTimeout(tabulateValues, 5000);
