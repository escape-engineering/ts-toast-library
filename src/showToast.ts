import EventBus from "./EventBus";

export const showToast = (message: string, type: string = "normal"): void => {
    EventBus.publish("SHOW_TOAST", { message, type });
};
