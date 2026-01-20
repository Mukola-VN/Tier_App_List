import { useState } from "react"

import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core"

type Draggable = {
  id: string
  src: string
  dz?: string
}

//«Цей масив МОЖЕ містити ТІЛЬКИ обʼєкти типу Draggable»
const defaultDraggables: Draggable[] = [
  { id: crypto.randomUUID(), src: "dreamland.png", dz: undefined },
  { id: crypto.randomUUID(), src: "kill_bill.png", dz: undefined },
  { id: crypto.randomUUID(), src: "kingdom_of_heaven.png", dz: undefined },
  { id: crypto.randomUUID(), src: "mulholland_drive.png", dz: undefined },
  { id: crypto.randomUUID(), src: "mystic_river.png", dz: undefined },
  { id: crypto.randomUUID(), src: "pulp_fiction.png", dz: undefined },
  { id: crypto.randomUUID(), src: "seven.png", dz: undefined },
  { id: crypto.randomUUID(), src: "shutter_island.png", dz: undefined },
  { id: crypto.randomUUID(), src: "The Neon Demon.png", dz: undefined },
  { id: crypto.randomUUID(), src: "the_god_father.png", dz: undefined },
  { id: crypto.randomUUID(), src: "the_lord_of_the_rings_the_fellowship_of_the_ring.png", dz: undefined },
  { id: crypto.randomUUID(), src: "the_lord_of_the_rings_the_return_of_the_rings.png", dz: undefined },
  { id: crypto.randomUUID(), src: "the_lord_of_the_rings_the_two_towers.png", dz: undefined },
  { id: crypto.randomUUID(), src: "the_silence_of_lambs.png", dz: undefined },
  { id: crypto.randomUUID(), src: "Troy.png", dz: undefined },
  { id: crypto.randomUUID(), src: "watchman.png", dz: undefined },
]

export default function App() {
  const [draggables, setDraggables] = useState<Draggable[]>(defaultDraggables)

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
    if (!e.over) return;
    const dropZoneId = e.over.id as string
    const activeDraggableId = e.active.id as string
    setDraggables(prev => prev.map(draggable => 
      draggable.id !== activeDraggableId 
      ? draggable 
      : { ...draggable, dz: dropZoneId }))
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-16 jusrify-center items-center">
      <DndContext onDragEnd={handleDragEnd}>
        <DropZone draggables={draggables} />
        <div className="flex gap-1">
          {draggables.filter(draggable => !draggable.dz).map(draggable => (
            <Draggable key={draggable.id} draggable={draggable} />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

function DropZone({ draggables }: { draggables: Draggable[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'dropZone' })

  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-white bg-[#333] h-34 w-full flex gap-4"
    >
      {draggables
        .filter(draggable => draggable.dz === 'dropZone')
        .map(draggable => (
          <Draggable key={draggable.id} draggable={draggable} />
        ))}
    </div>
  )
}

function Draggable({ draggable }: { draggable: Draggable }) {  /*{ цей код перевіряє props і гарантує правильні типи} */
  const { id, src } = draggable

  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  }

  return (
    <button
      className='cursor-pointer'
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <img
        src={`/src/assets/${src}`}
        className='max-h-32 aspect-[0.833] object-cover'
      />
    </button>
  )
}


