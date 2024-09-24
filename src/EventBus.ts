type Data = { message: string; type: string };
type Listener<T> = (data: T) => void;
type TopicsMapType<T> = Map<string, Listener<T>[]>;

const EventBus = () => {
    const topics: TopicsMapType<{ message: string; type: string }> = new Map();

    const subscribe = (topic: string, listener: Listener<Data>) => {
        if (!topics.has(topic)) {
            topics.set(topic, []);
        }
        topics.get(topic)!.push(listener);

        return () => {
            const listeners = topics.get(topic);
            if (listeners) {
                listeners.splice(listeners.indexOf(listener), 1);
            }
        };
    };

    const publish = (topic: string, data: Data) => {
        if (!topics.has(topic)) return;
        topics.get(topic)!.forEach((listener) => listener(data));
    };

    return { subscribe, publish };
};

export default EventBus();
