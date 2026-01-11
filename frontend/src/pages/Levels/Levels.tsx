import { useState } from 'react'
import {
  BsSearch,
  BsChevronDown,
  BsPencilSquare,
  BsTrash,
  BsPlus,
  BsList
} from "react-icons/bs"
import styles from './Levels.module.scss'

export default function LevelsPage() {
  const [levels] = useState([
    { id: 1, name: 'Junior Developer', count: 12, color: '#10b981' },
    { id: 2, name: 'Mid-Level Developer', count: 25, color: '#3b82f6' },
    { id: 3, name: 'Senior Developer', count: 18, color: '#8b5cf6' },
    { id: 4, name: 'Staff Engineer', count: 4, color: '#f59e0b' }
  ])

  return (
    <div className={styles.pageContent}>
      {/* Header do AdminLayout vai receber este slot */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Developer Levels</h1>
          <p className={styles.subtitle}>Manage and categorize technical seniority tiers across the organization.</p>
        </div>
        <button className={styles.addButton}>
          <BsPlus />
          Add New Level
        </button>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <BsSearch />
          <input type="text" placeholder="Search levels by name or count..." className={styles.searchInput} />
        </div>
        <div className={styles.rightControls}>
          <button className={styles.sortButton}>
            Sort by Name
            <BsChevronDown />
          </button>
          <button className={styles.filterButton}>
            Developer Count
            <BsList />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>LEVEL NAME</th>
              <th>DEVELOPER COUNT</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {levels.map(level => (
              <tr key={level.id}>
                <td>
                  <div className={styles.levelName}>
                    <div className={styles.levelDot} style={{ backgroundColor: level.color }}></div>
                    {level.name}
                  </div>
                </td>
                <td>
                  <span className={styles.devCount}>{level.count} developers</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.actions}>
                    <button className={styles.actionButton}><BsPencilSquare /></button>
                    <button className={styles.actionButton}><BsTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
