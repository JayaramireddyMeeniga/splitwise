import { AlertCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const ConfirmDialog = ({
  open,
  title = 'Confirm action',
  description = 'This action needs your confirmation.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <Modal
    open={open}
    onClose={onCancel}
    title={title}
    description={description}
    size="sm"
    footer={
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant={danger ? 'danger' : 'primary'}
          loading={loading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    }
  >
    <div className="flex gap-4 rounded-2xl bg-stone-50 p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface text-secondary">
        <AlertCircle className="h-6 w-6" />
      </div>
      <p className="text-sm leading-6 text-stone-600">{description}</p>
    </div>
  </Modal>
)

export default ConfirmDialog
