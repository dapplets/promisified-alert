import React from "react";
import { useModal } from "../contexts/ModalContext";

function FirstPage() {
  const { modals, confirm, alert } = useModal();

  async function handleAlertClick() {
    await alert('Be or not to be?')
    window.alert('User clicked OK');
  }

  async function handleConfirmClick() {
    const result = await confirm('Be or not to be?')
    window.alert('User clicked: ' + result);
  }

  return (
    <div>
      <div>
        {modals.map((modal) => (
          <div
            key={modal.id}
            style={{ border: "2px solid #000", marginBottom: 10, padding: 10 }}
          >
            {modal.type === "alert" ? (
              <>
                <p>ALERT (id = {modal.id}): {modal.message}</p>
                <button onClick={() => modal.onResolve(true)}>OK</button>
              </>
            ) : (
              <>
                <p>CONFIRM (id = {modal.id}): {modal.message}</p>
                <button onClick={() => modal.onResolve(true)}>Yes</button>
                <button onClick={() => modal.onResolve(false)}>No</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleConfirmClick}>
          Call Confirm
        </button>
        <button onClick={handleAlertClick}>
          Call Alert
        </button>
      </div>
    </div>
  );
}

export default FirstPage;
