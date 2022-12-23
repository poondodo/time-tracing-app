import { useState } from "react";

function TimeSlot({ timeSlot, onUpdateTimeSlot, onDeleteTimeSlot }) {
  const [isEditing, setIsEditing] = useState(false);
  const DISPLAYTYPE = {
    "study": "Study",
    "work-out": "Work Out",
    "trafic": "Trafic",
    "dining": "Dining",
    "shopping": "Shopping",
    "social-media": "Social Media",
    "watch-series": "Watch Series",
    "house-work": "House Work",
  };
  const [type, setType] = useState("study");
  const [duration, setDuration] = useState(15);

  function onChangeType(e) {
    setType(e.target.value);
  }

  function onChangeDuration(e) {
    setDuration(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (type && duration) {
      onUpdateTimeSlot(e.target.dataset.id, type, duration);
      setIsEditing(false);
    }
  }

  return (
    <>
      {!isEditing && (
        <div className="time-slot">
          <span className="time-slot-info" data-id={timeSlot.id}>
            {DISPLAYTYPE[timeSlot.type]} -- {timeSlot.duration} min
          </span>
          <button
            className="edit-button"
            data-id={timeSlot.id}
            onClick={(e) => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
          <button
            className="delete-button"
            data-id={timeSlot.id}
            onClick={(e) => {
              const id = e.target.dataset.id;
              onDeleteTimeSlot(id);
            }}
          >
            &#10060;
          </button>
        </div>
      )}
      {isEditing && <div className="update-timeslot">
      <form className="add-new-timeslot-form" data-id={timeSlot.id} onSubmit={onSubmit}>
        <label for="type">Type</label>
        <select className="edit-type-select" id="type" onChange={onChangeType}>
          <option value="study">Study</option>
          <option value="work-out">Work Out</option>
          <option value="trafic">Trafic</option>
          <option value="dining">Dining</option>
          <option value="shopping">Shopping</option>
          <option value="social-media">Social Media</option>
          <option value="watch-series">Watch Series</option>
          <option value="house-work">House Work</option>
        </select>
        <label for="duration">Duration</label>
        <select className="edit-duration-select" id="duration" onChange={onChangeDuration}>
            <option value="15">15</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="60">60</option>
        </select>
        <button type="submit" data-id={timeSlot.id} className="save-button">Save</button>
      </form>
    </div>}
    </>
  );
}

export default TimeSlot;
