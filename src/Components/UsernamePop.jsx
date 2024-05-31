export function UsernamePop({ setGuestname, isOpen, setIsOpen }) {
  const closeSubmit = () => setIsOpen(false);

  return (
    <div>
      {/* <button onClick={openNamePopup}>Set Your Highscore Name</button> */}
      {isOpen && (
        <div className="score-popup">
          <form>
            {/* Form fields for guestname */}
            <input
              type="text"
              placeholder="Less than 25 characters"
              onChange={(e) => setGuestname(e.target.value)}
            />
            <button type="submit" onChange={(e) => closeSubmit()}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
