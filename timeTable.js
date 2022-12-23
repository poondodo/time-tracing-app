const uuid = require('uuid').v4;

function makeTimeTable() {

    const id1 = uuid();
    const id2 = uuid();

    const timeTable = {};
    const timeSlots = {
        [id1]: {
            id: id1,
            type: 'study',
            duration: 60,
        },
        [id2]: {
            id: id2,
            type: 'work-out',
            duration: 30,
        },
    };

    // const count = {

    // }

    timeTable.contains = function contains(id) {
        return !!timeSlots[id];
    };

    timeTable.getTimeSlots = function getTimeSlots() {
        return timeSlots;
    }

    timeTable.addTimeSlot = function addTimeSlots(type, duration) {
        const id = uuid();
        timeSlots[id] = {
            id,
            type,
            duration,
        }
        return id;
    }

    timeTable.getTimeSlot = function getTimeSlot(id) {
        return timeSlots[id];
    }

    timeTable.updateTimeSlot = function updateTimeSlot(id, type, duration) {
        timeSlots[id].type = type;
        timeSlots[id].duration = duration;
    }

    timeTable.deleteTimeSlot = function deleteTimeSlot(id) {
        delete timeSlots[id];
    }

    timeTable.getCount = function getCount() {
        const count = {
            "study": {
                type: "study",
                countTime: 0,
            },
            "work-out": {
                type: "work-out",
                countTime: 0,
            },
            "trafic": {
                type: "trafic",
                countTime: 0,
            },
            "dining": {
                type: "dining",
                countTime: 0,
            },
            "shopping": {
                type: "shopping",
                countTime: 0,
            },
            "social-media": {
                type: "social-media",
                countTime: 0,
            },
            "watch-series": {
                type: "watch-series",
                countTime: 0,
            },
            "house-work": {
                type: "house-work",
                countTime: 0,
            },
        };
        Object.values(timeSlots).forEach((timeSlot) => {
            count[timeSlot.type].countTime += parseInt(timeSlot.duration);
        });
        return count;
    }

    return timeTable;
}

module.exports = {
    makeTimeTable,
};