import type { ReactNode } from 'react'
import styles from '../pages/DefaultPage.module.scss'

interface ModalTemplateProps {
  isOpen: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onSave?: () => void
  saveText?: string
  saveButtonTestId?: string
  cancelButtonTestId?: string
}

export default function ModalTemplate({
  isOpen,
  title,
  children,
  onClose,
  onSave,
  saveText = 'Salvar',
  saveButtonTestId = 'modal-save',
  cancelButtonTestId = 'modal-cancel',
}: ModalTemplateProps) {
  if (!isOpen) return null

  return (
    <div
      className={styles.modalOverlay}
      data-testid="modal-overlay"
    >
      <div
        className={styles.modal}
        data-testid="modal-container"
      >
        <div className={styles.modalHeader}>
          <h2 data-testid="modal-title">{title}</h2>

          <button
            className={styles.closeButton}
            data-testid="modal-close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div
          className={styles.modalContent}
          data-testid="modal-content"
        >
          {children}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            data-testid={cancelButtonTestId}
            onClick={onClose}
          >
            Cancelar
          </button>

          {onSave && (
            <button
              className={styles.saveButton}
              data-testid={saveButtonTestId}
              onClick={onSave}
            >
              {saveText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
