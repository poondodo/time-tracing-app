import Loading from './Loading';
import TimeSlot from './TimeSlot';

function TimeTable({ timeSlots, isTimetablePending, onUpdateTimeSlot, onDeleteTimeSlot }) {
  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    TIMESLOTS: "timeslots",
  };

  let show;
  if (isTimetablePending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(timeSlots).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TIMESLOTS;
  }
  return (
    <div className="time-table">
      {show === SHOW.PENDING && (
        <Loading className="timetable__waiting">Loading Timetable...</Loading>
      )}
      {show === SHOW.EMPTY && <p>No time slots yet, add one!</p>}
      {show === SHOW.TIMESLOTS && (
        <ul className="timeslots">
          {Object.values(timeSlots).map((timeSlot) => (
            <li className="timeslot" key={timeSlot.id}>
                <TimeSlot 
                    timeSlot={timeSlot}
                    onUpdateTimeSlot={onUpdateTimeSlot}
                    onDeleteTimeSlot={onDeleteTimeSlot}
                />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TimeTable;
