import { useState } from "react";

function NewTimeSlot({ onAddTimeSlot }) {
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
      onAddTimeSlot(type, duration);
    }
  }

  return (
    <div className="add-new-timeslot">
      <p>Add New Time Slot:</p>
      <form className="add-new-timeslot-form" onSubmit={onSubmit}>
        <label for="type">Type</label>
        <select className="add-type-select" id="type" onChange={onChangeType}>
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
        <select className="add-duration-select" id="duration" onChange={onChangeDuration}>
          <option value="15">15</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="60">60</option>
        </select>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
}
export default NewTimeSlot;
