export const useKeyDown = () => ({
    handleOnEnter: (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
        callbackFn: (...args: any[]) => void
    ) => {
        if (event.key === 'Enter') {
            callbackFn();
        }
    },
    handleOnCtrlEnter: (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
        callbackFn: (...args: any[]) => void
    ) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            callbackFn();
        }
    },
});
