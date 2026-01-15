import React, { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor,
  useSensor, useSensors, DragOverlay
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy
} from '@dnd-kit/sortable'
import ActivityCard from './ActivityCard'
import Modal from './Modal'
import { itineraryAPI } from '../api'
import { useToast } from '../context/ToastContext'
import { Calendar, RefreshCw } from 'lucide-react'

const formatDayHeader = (day, tripStartDate) => {
  if (!tripStartDate) return `Day ${day}`
  const d = new Date(tripStartDate)
  d.setDate(d.getDate() + day - 1)
  return `Day ${day} — ${d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`
}

const ItineraryBoard = ({ items, tripId, trip, onItemsChange, socket, lockedItems = {}, onRegenerateDay }) => {
  const { addToast } = useToast()
  const [activeId, setActiveId] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      await itineraryAPI.delete(tripId, itemToDelete.id)
      handleItemDeleted(itemToDelete.id)
      // Broadcast deletion to other collaborators
      if (socket) socket.emit('card_deleted', { tripId, itemId: itemToDelete.id })
      addToast('Activity deleted', 'info')
    } catch {
      addToast('Failed to delete', 'error')
    } finally {
      setIsDeleting(false)
      setItemToDelete(null)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  // Group items by day, sorted
  const days = [...new Set(items.map(i => i.day))].sort((a, b) => a - b)
  const byDay = {}
  for (const day of days) {
    byDay[day] = items.filter(i => i.day === day).sort((a, b) => a.position - b.position)
  }

  const activeItem = activeId ? items.find(i => i.id === activeId) : null

  const handleDragStart = ({ active }) => setActiveId(active.id)

  const handleDragEnd = async ({ active, over }) => {
    setActiveId(null)
    if (!over || active.id === over.id) return

    const activeItem = items.find(i => i.id === active.id)
    const overItem = items.find(i => i.id === over.id)
    if (!activeItem || !overItem) return

    const targetDay = overItem.day
    const dayItems = byDay[targetDay] || []
    const overIdx = dayItems.findIndex(i => i.id === over.id)

    let newPosition
    if (overIdx === 0) {
      newPosition = dayItems[0].position - 1
    } else if (overIdx === dayItems.length - 1) {
      newPosition = dayItems[dayItems.length - 1].position + 1
    } else {
      newPosition = (dayItems[overIdx - 1].position + dayItems[overIdx].position) / 2
    }

    // Optimistic update
    const updatedItems = items.map(i =>
      i.id === activeItem.id ? { ...i, position: newPosition, day: targetDay } : i
    )
    onItemsChange(updatedItems)

    try {
      await itineraryAPI.reorder(tripId, {
        itemId: activeItem.id,
        newPosition,
        day: targetDay
      })
      // Broadcast reorder to other collaborators
      if (socket) {
        socket.emit('card_reordered', { tripId, itemId: activeItem.id, newPosition, newDay: targetDay })
      }
    } catch (err) {
      addToast('Failed to reorder', 'error')
      onItemsChange(items) // revert
    }
  }

  const handleItemUpdated = (updatedItem) => {
    onItemsChange(items.map(i => i.id === updatedItem.id ? updatedItem : i))
  }

  const handleItemDeleted = (itemId) => {
    onItemsChange(items.filter(i => i.id !== itemId))
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--color-text-secondary)' }}>
        <Calendar size={40} style={{ margin: '0 auto 16px', color: 'var(--color-border)' }} />
        <p style={{ fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>No itinerary yet</p>
        <p style={{ fontSize: 14 }}>Click "Generate with AI" to create your day-by-day plan</p>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board-scroll">
        {days.map(day => (
          <div key={day} className="day-column">
            <div className="day-column-header">
              <span>{formatDayHeader(day, trip?.startDate)}</span>
              {onRegenerateDay && (
                <button
                  className="day-regen-btn"
                  onClick={() => onRegenerateDay(day)}
                  title={`Regenerate Day ${day}`}
                >
                  <RefreshCw size={11} /> Regenerate
                </button>
              )}
            </div>
            <SortableContext
              items={byDay[day]?.map(i => i.id) || []}
              strategy={verticalListSortingStrategy}
            >
              <div className="day-column-items">
                {byDay[day]?.map(item => (
                  <ActivityCard
                    key={item.id}
                    item={item}
                    tripId={tripId}
                    onUpdated={handleItemUpdated}
                    onDeleted={handleItemDeleted}
                    onRequestDelete={setItemToDelete}
                    socket={socket}
                    lockInfo={lockedItems[item.id] || null}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeItem && (
          <div style={{ pointerEvents: 'none', width: 280 }}>
            <ActivityCard
              item={activeItem}
              tripId={tripId}
              onUpdated={() => {}}
              onDeleted={() => {}}
            />
          </div>
        )}
      </DragOverlay>

      <Modal
        isOpen={!!itemToDelete}
        onClose={() => !isDeleting && setItemToDelete(null)}
        title="Delete Activity"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setItemToDelete(null)} disabled={isDeleting}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </>
        }
      >
        <div className="modal-body">
          <p style={{ margin: 0 }}>Are you sure you want to delete <strong>{itemToDelete?.activity}</strong>?</p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 8 }}>This action cannot be undone.</p>
        </div>
      </Modal>
    </DndContext>
  )
}

export default ItineraryBoard
