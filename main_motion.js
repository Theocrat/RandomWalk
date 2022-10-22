const π = 3.141592653589793
var N_dots = 10
const room = {
    width: 640,
    height: 480
}
var dotRadius = 20
var dots
var paused = false
const dotVelocity = 10;
var pathPoints = [{x:room.width / 2, y:room.height / 2, t:0}]
const frameTime = 20
var time = 0

const beginMotion = () => {
    // Create the balls which float around
    dots = fillUpDots(N_dots + 1)

    // Render the starting stage of the canvas
    renderSpace()

    // Beginning the set of events that will make the motion happen
    collisionCheck()
    setTimeout(motionStep, frameTime)
}

const fillUpDots = (n_dots) => {
    let dotDirection = 2 * π * Math.random()
    let someDots = [{
        x: room.width / 2,
        y: room.height / 2,
        v_x: dotVelocity * Math.cos(dotDirection),
        v_y: dotVelocity * Math.sin(dotDirection),
        color: "#ee0000"
    }]
    for(let i = 1; i < n_dots; i++) {
        dotDirection = 2 * π * Math.random()
        someDots.push({
            x: 640 * Math.random(),
            y: 480 * Math.random(),
            v_x: dotVelocity * Math.cos(dotDirection),
            v_y: dotVelocity * Math.sin(dotDirection),
            color: shadeGenerator(
                Math.floor( 48 + Math.random() * 48 ),
                Math.floor( 144 + Math.random() * 96),
                Math.floor( 240 + Math.random() * 16),
            )
        })
    }

    return someDots
}

const renderSpace = () => {
    let space = document.getElementById('main_event')
    let dotCode = []
    let colorCode
    
    dots.forEach((dot, i) => {

        dotCode.push(`
            <circle 
                id="${i}"
                r="${dotRadius}px"
                cx="${dot.x}px"
                cy="${dot.y}px"
                stroke="none"
                fill="${dot.color}"
            />
        `)
    });

    pathLines = []
    let trajectory = []
    pathPoints.forEach( point => { trajectory.push(point) } )
    trajectory.push( { x: dots[0].x, y: dots[0].y } )
    for(let i = 1; i < trajectory.length; i++) {
        pathLines.push(`
            <path
                id="path_${i}"
                style="stroke:red; stroke-width:1px;"
                d="M ${trajectory[i-1].x} ${trajectory[i-1].y} L ${trajectory[i].x} ${trajectory[i].y} Z"
            />
        `)
    }

    space.innerHTML = pathLines.join('\n') + '\n' + dotCode.join('\n')
    if(pathPoints.length > 1)
        document.getElementById('rtime').innerHTML = `${Math.round(100 * (time / (pathPoints.length - 1))) / 100}`
    else
        document.getElementById('rtime').innerHTML = "--"
    document.getElementById('time').innerHTML = `${Math.round(time)}`
}

const collisionCheck = () => {
    for(let i = 0; i < dots.length; i++) {
        for(let j = 0; j < dots.length; j++) {
            if(i == j)
                continue
            if(distance(dots[i], dots[j]) <= dotRadius * 2) {
                let i2j_vec = {
                    x: dots[j].x - dots[i].x,
                    y: dots[j].y - dots[i].y 
                }

                let i2j_dir = {
                    x: i2j_vec.x / (2 * dotRadius),
                    y: i2j_vec.y / (2 * dotRadius)
                }

                dots[j].v_x = i2j_dir.x * dotVelocity
                dots[j].v_y = i2j_dir.y * dotVelocity

                if(j == 0 && distance(dots[0], pathPoints[pathPoints.length - 1]) > dotRadius) {
                    pathPoints.push( {x:dots[j].x, y:dots[j].y, t:time} )
                }

                /*
                while(distance(dots[i], dots[j]) <= dotRadius * 2) {
                    dots[i].x -= i2j_dir.x
                    dots[j].x += i2j_dir.x
                    dots[i].y -= i2j_dir.y
                    dots[j].y += i2j_dir.y
                }
                */

                /*
                dots[i].v_x = -1 * i2j_dir.x * dotVelocity
                dots[i].v_y = -1 * i2j_dir.y * dotVelocity
                */
            }
        }

        if(dots[i].x <= dotRadius) {
            dots[i].v_x *= -1
            dots[i].x = dotRadius
            if(i == 0 && distance(dots[0], pathPoints[pathPoints.length - 1]) > dotRadius) {
                pathPoints.push( {x:dots[i].x, y:dots[i].y, t:time} )
            }
        }

        if(dots[i].x + dotRadius >= room.width) {
            dots[i].v_x *= -1
            dots[i].x = room.width - dotRadius
            if(i == 0 && distance(dots[0], pathPoints[pathPoints.length - 1]) > dotRadius) {
                pathPoints.push( {x:dots[i].x, y:dots[i].y, t:time} )
            }
        }

        if(dots[i].y <= dotRadius) {
            dots[i].v_y *= -1
            dots[i].y = dotRadius
            if(i == 0 && distance(dots[0], pathPoints[pathPoints.length - 1]) > dotRadius) {
                pathPoints.push( {x:dots[i].x, y:dots[i].y, t:time} )
            }
        }

        if(dots[i].y + dotRadius >= room.height) {
            dots[i].v_y *= -1
            dots[i].y = room.height - dotRadius
            if(i == 0 && distance(dots[0], pathPoints[pathPoints.length - 1]) > dotRadius) {
                pathPoints.push( {x:dots[i].x, y:dots[i].y, t:time} )
            }
        }
    }
}

const distance = (dot1, dot2) => (
    Math.sqrt((dot1.x - dot2.x)**2 + (dot1.y - dot2.y)**2)
)

const motionStep = () => {
    setTimeout(motionStep, frameTime)

    if(!paused) {
        time += frameTime / 1000 ;
        dots.forEach( dot => {
            dot.x += dot.v_x
            dot.y += dot.v_y
        })

        collisionCheck()
        renderSpace()
    }
}

const shadeGenerator = (r, g, b) => {
    let hexDigits = "0123456789abcdef".split('')
    
    let hexcode = (n) => (
        `${hexDigits[Math.floor(n / 16)]}${hexDigits[n % 16]}`
    )

    shadeCode = `#${hexcode(r)}${hexcode(g)}${hexcode(b)}`
    return shadeCode
}

const restartMotion = () => {
    // Create the balls which float around
    dots = fillUpDots(N_dots + 1)

    // Reset the path
    pathPoints = [{
        x: room.width / 2,
        y: room.height / 2,
        t: 0
    }]

    // Interactively set up the "constants"
    dotRadius = parseInt(document.getElementById('r_dots').value)
    N_dots = parseInt(document.getElementById('n_dots').value)

    // Reset the timer
    time = 0

    // Render the starting stage of the canvas
    renderSpace()

    // Beginning the set of events that will make the motion happen
    collisionCheck()
}
