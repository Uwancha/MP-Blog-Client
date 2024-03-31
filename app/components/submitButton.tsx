import { useFormStatus } from "react-dom";

// Submit component with pending status for nearest form element
export const SubmitButton = ({text, pendingStatusText}: { text: string, pendingStatusText: string }) => {
    // Destructure form status for the nearest form element
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className='text-primary btn-shadow rounded-sm py-2' aria-disabled={pending}>
            {pending ? pendingStatusText : text}
        </button>
    );
};