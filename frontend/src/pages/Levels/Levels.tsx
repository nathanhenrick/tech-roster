import { useState, useEffect, useCallback } from 'react'
import { useIsLoading } from "../../components/isLoading/isLoading"

import {
  BsSearch,
  BsPencilSquare,
  BsTrash,
  BsPlus,
} from 'react-icons/bs'
import styles from '../DefaultPage.module.scss'
import Loader from "../../components/isLoading/Loader"
import ModalTemplate from '../../components/ModalTemplate'
import { LevelsService, DevelopersService } from '../../services'
import { ToastContainer, toast } from 'react-toastify'
import { useSearch } from '../../hooks/useSearch'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import type { AxiosError } from 'axios'

const MySwal = withReactContent(Swal)

interface LevelFromAPI {
  id: number
  nivel: string
}

interface Level extends LevelFromAPI {
  count: number
}

interface LevelPayload {
  nivel: string
}

interface Developer {
  id: number
  nivel_id: number
  nome: string
  nivel: {
    id: number
    nivel: string
  }
}

type ModalMode = 'create' | 'edit'

export default function LevelsPage() {
  const { isLoading, isLoadingStart, isLoadingStop } = useIsLoading()
  const [niveis, setNiveis] = useState<Level[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<ModalMode>('create')
  const [payload, setPayload] = useState<LevelPayload>({ nivel: '' })
  const [activeLevel, setActiveLevel] = useState<Level | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const openModal = (mode: ModalMode, level?: Level) => {
    setModalMode(mode)
    if (level) {
      setActiveLevel(level)
      setPayload({ nivel: level.nivel })
    } else {
      setActiveLevel(null)
      setPayload({ nivel: '' })
    }
    setIsModalOpen(true)
  }

  const fetchData = useCallback(async (page = 1) => {
    try {
      isLoadingStart()

      const [devsRes, lvlsRes] = await Promise.all([
        DevelopersService.getAllPaginations(9999),
        LevelsService.getAll(page)
      ])

      const developers: Developer[] = devsRes.data || []
      const levelsFromAPI: LevelFromAPI[] = lvlsRes.data || []
      const meta = lvlsRes.meta || {}

      const mappedLevels: Level[] = levelsFromAPI.map(lvl => ({
        ...lvl,
        count: developers.filter(dev => dev.nivel_id === lvl.id).length
      }))

      setNiveis(mappedLevels)
      setTotalPages(meta.last_page || 1)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao buscar dados')
    } finally {
      isLoadingStop()
    }
  }, [isLoadingStart, isLoadingStop])

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const handleSave = async () => {
    if (!payload.nivel) return

    try {
      if (modalMode === 'create') {
        await LevelsService.save(payload)
        toast.success('Nível adicionado')
      }

      if (modalMode === 'edit' && activeLevel) {
        await LevelsService.update(activeLevel.id, payload)
        toast.success('Nível atualizado')
      }

      await fetchData(currentPage)
      setIsModalOpen(false)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao salvar nível')
    }
  }

  const handleDelete = async (level: Level) => {
    const result = await MySwal.fire({
      title: 'Confirmar exclusão',
      text: `Deseja excluir ${level.nivel}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Não, cancelar',
      customClass: {
        confirmButton: styles.confirmAlertButton,
        cancelButton: styles.confirmAlertButton
      }
    });

    if (!result.isConfirmed) return;

    try {
      await LevelsService.remove(level.id)
      await fetchData(currentPage)
      toast.success('Nível removido')
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>
      if (axiosError.response?.data?.message?.includes('Foreign key')) {
        toast.error('Não é possível excluir este nível: há desenvolvedores cadastrados nele')
      } else {
        toast.error('Erro ao remover nível')
      }
    }
  }

  const { query, setQuery, filteredItems } = useSearch<Level>(niveis, ['nivel'])

  const displayItems = query ? filteredItems : niveis

  return (
    <div className={styles.pageContent}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Níveis de Desenvolvedor</h1>
          <p className={styles.subtitle}>
            Gerencie e categorize os níveis de senioridade técnica da organização.
          </p>
        </div>
        <button data-testid="level-add" className={styles.addButton} onClick={() => openModal('create')}>
          <BsPlus />
          Adicionar Nível
        </button>

        <ModalTemplate
          isOpen={isModalOpen}
          title={modalMode === 'edit' ? 'Editar Nível' : 'Adicionar Nível'}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          saveButtonTestId="level-save"
          cancelButtonTestId="level-cancel"
        >

          <div className={styles.modalForm}>
            <div>
              <label>Nome do Nível</label>
              <input
                type="text"
                value={payload.nivel}
                data-testid="level-name"
                onChange={e => setPayload({ nivel: e.target.value })}
              />
            </div>
          </div>
        </ModalTemplate>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <BsSearch />
          <input
            type="text"
            placeholder="Buscar por nome ou quantidade..."
            className={styles.searchInput}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NOME DO NÍVEL</th>
              <th>QUANTIDADE DE DESENVOLVEDORES</th>
              <th style={{ textAlign: 'right' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} style={{ margin: "0 auto" }}>
                  <Loader />
                </td>
              </tr>
            ) : displayItems.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center' }}>
                  Nenhum nível foi encontrado
                </td>
              </tr>
            ) : (
              displayItems.map((nivel: Level) => (
                <tr key={nivel.id} data-testid={`level-row-${nivel.id}`}>
                  <td>{nivel.nivel}</td>
                  <td>{nivel.count} desenvolvedores</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        data-testid="level-edit"
                        onClick={() => openModal('edit', nivel)}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        className={styles.actionButton}
                        data-testid="level-delete"
                        onClick={() => handleDelete(nivel)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!query && totalPages > 0 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            {'<'}
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={i + 1 === currentPage ? styles.activePage : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            {'>'}
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}