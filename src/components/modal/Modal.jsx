import "./modal.css";
import { useEffect, useRef } from "react";

function Modal({ title, closeModal, children }) {
  const modalRef = useRef(null);

  ////////////////////////////// GESTION FOCUS ///////////////////////////////////
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () => {
      const elements = Array.from(modal.querySelectorAll(focusableSelectors));
      return elements.filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.tabIndex !== -1 &&
          el.offsetParent !== null,
      );
    };

    //////////////////////////// FOCUS INITIAL
    requestAnimationFrame(() => {
      getFocusableElements()[0]?.focus();
    });

    ///////////////////////////// FOCUS TRAP
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (
          document.activeElement === first ||
          !modal.contains(document.activeElement)
        ) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (
          document.activeElement === last ||
          !modal.contains(document.activeElement)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  ///////////////////// FERMETURE MODALE CLAVIER /////////////////////
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  ///////////////////////////////////////////////////////////////
  return (
    <div className="overlay" onClick={closeModal}>
      <div
        className="modal"
        role="dialog"
        ref={modalRef}
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="modal-title" id="modal-title">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
