import "./Toast.css";
import { useEffect, useState } from "react";
import EventBus from "./EventBus";
import { createPortal } from "react-dom";

interface ToastType {
    id?: number;
    type: string;
    message: string;
}

const Toast = () => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    useEffect(() => {
        const handleToastEvent = (toast: ToastType): void => {
            setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);

            setTimeout(() => {
                setToasts((prevToasts) => prevToasts.slice(1));
            }, 10000);
        };

        const unsubscribe = EventBus.subscribe("SHOW_TOAST", handleToastEvent);

        return () => unsubscribe();
    }, []);

    const toastWrapDiv = document.getElementById("toast-wrapper");

    return toastWrapDiv
        ? createPortal(
              <div className="toast-container">
                  {toasts.map((toast) => (
                      <div key={toast.id} className={`toast ${toast.type}`}>
                          {toast.message}
                          <button
                              className="toast-close"
                              onClick={() => {
                                  setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id));
                              }}
                          >
                              ×
                          </button>
                      </div>
                  ))}
              </div>,
              toastWrapDiv
          )
        : null;
};

export default Toast;
