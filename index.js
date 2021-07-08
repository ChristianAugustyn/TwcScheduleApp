const fs = require('fs');
const { type } = require('os');

const shiftTypes = {
    OPEN: "7:30-5:30",
    CLOSE: "11:00-9:00",
    KITCHEN: "7:30-3:30",
    TECH: "9:00-7:00",
    TWCE: "7:30-5:30",
    MID: "9:00-2:00"
}

isolatedSchedule = []

const containsShift = (shift) => {
    for(shiftType of Object.entries(shiftTypes)){
        if (shiftType.includes(shift)) return true
    }

    return false
}

const parseShift = (schedule, row, col, shiftType) => {
    
    shift = {
        type: shiftType,
        day: null,
    }

    //find date in column for shift
    for(i = row; i >= 0; i--) {
        day = parseInt(schedule[i][col])

        if (!isNaN(day)) {

            shift.day = day
            return shift
        }
    }
}

fs.readFile('sample.csv', 'utf8', (err, data) => {
    var scheduleArray = []
    //turn the csv into a 2d array
    data.split(/\r?\n/).forEach(line => {
        scheduleArray.push(line.split(','))
    })
    


    scheduleArray.forEach((rowArray, rowIndex)  => {
        if (rowArray[0] == 'ISABEL'){

            rowArray.forEach((col, colIndex) => {
                shiftType = scheduleArray[rowIndex][colIndex]
                if (containsShift(shiftType)){

                    shift = parseShift(scheduleArray, rowIndex, colIndex, shiftType[0])
                    isolatedSchedule.push(shift)
                }
            })
        }
    })

    console.log(isolatedSchedule)

});
