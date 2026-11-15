"use client"

interface ConfirmDialogProps {
    title?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
    buttonColor?: "danger" | "primary" | "success" | "info" | "warning" | "secondary";
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    setResult: (value: boolean) => void;
}

export default function ConfirmDialog({
    title,
    message,
    cancelText,
    confirmText,
    isOpen,
    setIsOpen,
    setResult,
    buttonColor = "danger"
}: ConfirmDialogProps) {

    const buttonColors = {
        danger: "bg-danger",
        primary: "bg-primary",
        success: "bg-success",
        info: "bg-info",
        warning: "bg-warning",
        secondary: "bg-secondary"
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-modal sm:p-7">

                <h2 className="text-xl font-semibold text-title">
                    {title || "Are you sure you want to delete it?"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-text">
                    {message || "This action is permanent and cannot be undone. Once deleted, the item will be removed from your account."}
                </p>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <button
                        onClick={() => {
                            setResult(false);
                            setIsOpen(false);
                        }}
                        className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-title transition hover:bg-gray-100"
                    >
                        {cancelText || "No, Cancel"}
                    </button>

                    <button
                        onClick={() => {
                            setResult(true);
                            setIsOpen(false);
                        }}
                        className={`${buttonColors[buttonColor]} cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90`}
                    >
                        {confirmText || "Yes, Confirm"}
                    </button>

                </div>
            </div>
        </div>
    );
}