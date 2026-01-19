import { useState, useEffect, useCallback } from 'react'
import { useIsLoading } from "../../components/isLoading/isLoading"

import {
  BsSearch,
  BsPencilSquare,
  BsTrash,
  BsPlus,
  BsEye
} from 'react-icons/bs'
import styles from '../DefaultPage.module.scss'
import Loader from "../../components/isLoading/Loader"
import ModalTemplate from '../../components/ModalTemplate'
import { DevelopersService, LevelsService } from '../../services'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSearch } from '../../hooks/useSearch'

const MySwal = withReactContent(Swal)

interface Developer {
  id: number
  nivel_id: number
  nome: string
  sexo: string
  data_nascimento: string
  hobby: string
}

interface Level {
  id: number
  nome: string
}

type ModalMode = 'create' | 'edit' | 'view'

interface DeveloperPayload {
  nome: string
  nivel_id: number
  sexo: string
  data_nascimento: string
  hobby: string
}

export default function DevelopersPage() {
  const { isLoading, isLoadingStart, isLoadingStop } = useIsLoading()
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<ModalMode>('create')
  const [activeDev, setActiveDev] = useState<Developer | null>(null)
  const [payload, setPayload] = useState<DeveloperPayload>({
    nome: '',
    nivel_id: 0,
    sexo: '',
    data_nascimento: '',
    hobby: ''
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchData = useCallback(async (page = 1) => {
    try {
      isLoadingStart()

      const [devsRes, lvlsRes] = await Promise.all([
        DevelopersService.getAll(page),
        LevelsService.getAll()
      ])

      const devs = devsRes.data || []
      const lvls = lvlsRes.data || []
      const meta = devsRes.meta || {}

      setDevelopers(devs)
      setLevels(lvls.map(l => ({ id: l.id, nome: l.nivel })))
      setTotalPages(meta.last_page || 1)

      if (lvls.length === 0) {
        toast.error('Nenhum nível cadastrado. Cadastre um nível primeiro.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao buscar dados')
    } finally {
      isLoadingStop()
    }
  }, [isLoadingStart, isLoadingStop])

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const openModal = (mode: ModalMode, dev?: Developer) => {
    setModalMode(mode)

    if (dev) {
      setActiveDev(dev)
      setPayload({
        nome: dev.nome,
        nivel_id: dev.nivel_id,
        sexo: dev.sexo,
        data_nascimento: dev.data_nascimento,
        hobby: dev.hobby
      })
    } else {
      setActiveDev(null)
      setPayload({
        nome: '',
        nivel_id: 0,
        sexo: '',
        data_nascimento: '',
        hobby: ''
      })
    }

    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      if (modalMode === 'create') {
        await DevelopersService.save(payload)
        toast.success('Desenvolvedor adicionado')
        fetchData(currentPage)
      }

      if (modalMode === 'edit' && activeDev) {
        await DevelopersService.update(activeDev.id, payload)
        toast.success('Desenvolvedor atualizado')
        fetchData(currentPage)
      }

      setIsModalOpen(false)
    } catch {
      toast.error('Erro ao salvar desenvolvedor')
    }
  }

  const handleDelete = async (dev: Developer) => {
    const result = await MySwal.fire({
      title: 'Confirmar exclusão',
      text: `Deseja excluir ${dev.nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Não, cancelar',
      customClass: {
        confirmButton: styles.confirmAlertButton,
        cancelButton: styles.confirmAlertButton
      }
    })

    if (result.isConfirmed) {
      await DevelopersService.remove(dev.id)
      toast.success('Desenvolvedor removido')
      fetchData(currentPage)
    }
  }

  const { query, setQuery, filteredItems } = useSearch<Developer>(
    developers,
    ['nome', 'hobby', 'data_nascimento']
  )

  const displayItems = query ? filteredItems : developers

  return (
    <div className={styles.pageContent}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Desenvolvedores</h1>
          <p className={styles.subtitle}>
            Gerencie os desenvolvedores e seus níveis de senioridade.
          </p>
        </div>

        <button
          className={styles.addButton}
          data-testid="developer-add"
          onClick={() => openModal('create')}
        >
          <BsPlus />
          Adicionar Desenvolvedor
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <BsSearch />
          <input
            type="text"
            placeholder="Buscar por nome, hobby ou nascimento..."
            className={styles.searchInput}
            data-testid="developer-search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Nível</th>
              <th>Sexo</th>
              <th>Nascimento</th>
              <th>Hobby</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} style={{ margin: "0 auto" }}>
                  <Loader />
                </td>
              </tr>
            ) :
              displayItems.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    Nenhum desenvolvedor encontrado
                  </td>
                </tr>
              ) : (
                displayItems.map(dev => (
                  <tr key={dev.id} data-testid={`developer-row-${dev.id}`}>
                    <td>{dev.nome}</td>
                    <td>{levels.find(l => l.id === dev.nivel_id)?.nome || '-'}</td>
                    <td>{{
                      M: 'Masculino',
                      F: 'Feminino',
                      O: 'Outro'
                    }[dev.sexo] || '-'}</td>
                    <td>
                      {dev.data_nascimento
                        ? dev.data_nascimento.split('-').reverse().join('/')
                        : '-'}
                    </td>
                    <td>{dev.hobby}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionButton}
                          data-testid="developer-view"
                          onClick={() => openModal('view', dev)}
                        >
                          <BsEye />
                        </button>

                        <button
                          className={styles.actionButton}
                          data-testid="developer-edit"
                          onClick={() => openModal('edit', dev)}
                        >
                          <BsPencilSquare />
                        </button>

                        <button
                          className={styles.actionButton}
                          data-testid="developer-delete"
                          onClick={() => handleDelete(dev)}
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>

                ))
              )
            }
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

      <ModalTemplate
        isOpen={isModalOpen}
        title={
          modalMode === 'view'
            ? 'Visualizar Desenvolvedor'
            : modalMode === 'edit'
              ? 'Editar Desenvolvedor'
              : 'Adicionar Desenvolvedor'
        }
        onClose={() => setIsModalOpen(false)}
        onSave={modalMode === 'view' ? undefined : handleSave}
        saveButtonTestId="developer-save"
        cancelButtonTestId="developer-cancel"
      >
        <div className={styles.modalForm}>
          <div>
            <label>Nome</label>
            <input
              disabled={modalMode === 'view'}
              value={payload.nome}
              data-testid="developer-name"
              onChange={e => setPayload(prev => ({ ...prev, nome: e.target.value }))}
            />
          </div>

          <div>
            <label>Nível</label>
            <select
              disabled={modalMode === 'view'}
              value={payload.nivel_id}
              data-testid="developer-level"
              onChange={e =>
                setPayload(prev => ({ ...prev, nivel_id: Number(e.target.value) }))
              }
            >
              <option value={0} disabled>Selecione</option>
              {levels.map(l => (
                <option key={l.id} value={l.id}>{l.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Sexo</label>
            <select
              disabled={modalMode === 'view'}
              data-testid="developer-gender"
              value={payload.sexo}
              onChange={e =>
                setPayload(prev => ({ ...prev, sexo: e.target.value }))
              }
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>

          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              disabled={modalMode === 'view'}
              data-testid="developer-birth"
              value={payload.data_nascimento}
              onChange={e =>
                setPayload(prev => ({ ...prev, data_nascimento: e.target.value }))
              }
            />
          </div>

          <div>
            <label>Hobby</label>
            <input
              disabled={modalMode === 'view'}
              data-testid="developer-hobby"
              value={payload.hobby}
              onChange={e =>
                setPayload(prev => ({ ...prev, hobby: e.target.value }))
              }
            />
          </div>
        </div>
      </ModalTemplate>

      <ToastContainer />
    </div>
  )
}