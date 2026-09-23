import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import Button from "@/components/common/Button/Button";

/**
 * Replaces native window.confirm() for destructive/important actions
 * (disable user, etc.) with a dialog that actually matches the rest of the
 * app's design system, instead of the browser's unstyled native popup.
 *
 * Usage:
 *   <ConfirmDialog
 *     open={confirmState.open}
 *     title="Disable this user?"
 *     description="They will immediately lose access to their account."
 *     confirmLabel="Disable"
 *     variant="danger"
 *     loading={actionLoading}
 *     onConfirm={handleConfirmedDisable}
 *     onCancel={() => setConfirmState({ open: false })}
 *   />
 */
const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  description = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={loading ? undefined : onCancel}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-dialog-title"
              className="w-full max-w-sm rounded-xl border border-slate-200 bg-surface p-6 shadow-soft-md"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                    variant === "danger"
                      ? "bg-red-100 text-red-600"
                      : "bg-brand-50 text-brand-800"
                  }`}
                >
                  <AlertTriangle size={20} />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h2
                    id="confirm-dialog-title"
                    className="text-lg font-semibold text-slate-900"
                  >
                    {title}
                  </h2>

                  {description && (
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={onCancel}
                  fullWidth
                  className="sm:w-auto"
                >
                  {cancelLabel}
                </Button>

                <Button
                  variant={variant === "danger" ? "danger" : "primary"}
                  size="sm"
                  loading={loading}
                  onClick={onConfirm}
                  fullWidth
                  className="sm:w-auto"
                >
                  {confirmLabel}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
