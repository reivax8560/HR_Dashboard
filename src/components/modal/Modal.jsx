import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

function Modal(props) {
  const {
    isBackgroundDisplayed,
    backgroundColor,
    title,
    closureFunction,
    closureIconSize,
    classModal = "classModal-default",
    classTitle = "classTitle-default",
    children,
  } = props;

  return (
    <div
      className={isBackgroundDisplayed ? "classBackground-default" : ""}
      style={{ background: backgroundColor }}
    >
      <div className={classModal}>
        {closureFunction && (
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={closureFunction}
            className="closureIcon"
            style={{ fontSize: closureIconSize }}
          />
        )}

        {title && <h2 className={classTitle}>{title}</h2>}

        {children}
      </div>
    </div>
  );
}

export default Modal;
