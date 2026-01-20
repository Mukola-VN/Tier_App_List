import { useState } from "react"
import { DndContext, useDraggable } from "@dnd-kit/core"

type Draggables = {
  id: string
  src: string
}

//«Цей масив МОЖЕ містити ТІЛЬКИ обʼєкти типу Draggables»
const defaultDraggables: Draggables[] = [
  { id: crypto.randomUUID(), src: "dreamland.png" },
  { id: crypto.randomUUID(), src: "kill_bill.png" },
  { id: crypto.randomUUID(), src: "kingdom_of_heaven.png" },
  { id: crypto.randomUUID(), src: "mulholland_drive.png" },
  { id: crypto.randomUUID(), src: "mystic_river.png" },
  { id: crypto.randomUUID(), src: "pulp_fiction.png" },
  { id: crypto.randomUUID(), src: "seven.png" },
  { id: crypto.randomUUID(), src: "shutter_island.png" },
  { id: crypto.randomUUID(), src: "The Neon Demon.png" },
  { id: crypto.randomUUID(), src: "the_god_father.png" },
  { id: crypto.randomUUID(), src: "the_lord_of_the_rings_the_fellowship_of_the_ring.png" },
  { id: crypto.randomUUID(), src: "the_lord_of_the_rings_the_return_of_the_rings.png" },
  { id: crypto.randomUUID(), src: "the_lord_of_the_rings_the_two_towers.png" },
  { id: crypto.randomUUID(), src: "the_silence_of_lambs.png" },
  { id: crypto.randomUUID(), src: "Troy.png" },
  { id: crypto.randomUUID(), src: "watchman.png" },
]

export default function App() {
  const [draggables, setDraggables] = useState<Draggables[]>(defaultDraggables)

  return (
    <div className="w-screen h-screen flex jusrify-center items-center">
      <DndContext>
        <div className="flex gap-2">
          {draggables.map(draggable => (
            <Draggable key={draggable.id} draggable={draggable} />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

function Draggable({ draggable }: { draggable: Draggables }) {  /*{ цей код перевіряє props і гарантує правильні типи} */
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