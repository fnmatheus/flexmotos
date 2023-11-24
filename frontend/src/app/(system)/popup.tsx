interface IPopup {
  text: string,
  handleYes(): void,
  handleNo(): void 
}

export default function Popup({text, handleYes, handleNo}: IPopup) {
  return (
    <div>
      <div>
        <p>{text}</p>
        <div className='flex gap-2'>
          <button onClick={handleYes}>
            Yes
          </button>
          <button onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
