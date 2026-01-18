import type { ReactNode } from 'react'

import styles from '../pages/DefaultPage.module.scss'

interface ModalTemplateProps {
  isOpen: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onSave?: () => void
  saveText?: string
}

export default function ModalTemplate({
  isOpen,
  title,
  children,
  onClose,
  onSave,
  saveText = 'Salvar',
}: ModalTemplateProps) {
  if (!isOpen) return null

  return (

    
    <div className = { styles.modalOverlay } >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalContent}>{children}</div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          {onSave && (
            <button className={styles.saveButton} onClick={onSave}>
              {saveText}
            </button>
          )}
        </div>
      </div>
    </div >
  )
}
