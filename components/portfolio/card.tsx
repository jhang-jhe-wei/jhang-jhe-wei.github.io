import { ProjectProps as Project } from '../../interfaces/portfolio_interface'
import useReveal from '../../lib/use_reveal'
import Modal from 'react-modal'
import { useState } from 'react'

export default function Card ({ project }: { project: Project }): React.ReactElement {
  const [element, reveal] = useReveal()

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal (): void {
    setIsOpen(true)
  }

  function closeModal (): void {
    setIsOpen(false)
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Project Modal"
        className="flex flex-col max-w-md bg-white max-h-screen-80"
        overlayClassName="z-40 fixed inset-0 bg-dark-mask px-5 flex justify-center items-center"
      >
        <div className="flex-1 overflow-y-auto">
          <img className="object-scale-down object-center w-full bg-gray-300 max-h-screen-1/3" src={project.image} alt={project.title} width={300} height={300}/>
          <div className="mx-6 mt-5 text-lg">
            <h3 className="font-bold text-secondary">{project.title}</h3>
            <p className="mt-5 text-sm text-zinc-700">{project.description}</p>
          </div>
          <div className="pb-8 mx-6 mt-8">
            {
              project.demo_link && <a className="px-4 py-2 text-sm mr-2 text-white border rounded-[10px] border-secondary hover:no-underline bg-secondary hover:bg-white hover:text-secondary" href={project.demo_link}>Demo</a>
            }
            {
              project.code_link && <a className="px-4 py-2 text-sm text-white border rounded-[10px] border-secondary hover:no-underline bg-secondary hover:bg-white hover:text-secondary" href={project.code_link}>Source Code</a>
            }
          </div>
        </div>
        <button onClick={closeModal} className="w-full h-10 text-center text-white bg-red-700">close</button>
      </Modal>

      <div ref={element} className={`mx-auto max-w-xs bg-white font-notosans transition-all duration-500 hover:cursor-pointer ${reveal ? 'opacity-100' : 'translate-y-20 opacity-0'} flex flex-col`} onClick={openModal}>
        <img className="object-scale-down object-center bg-gray-300 h-60 w-80" src={project.image} alt={project.title} width={300} height={300} />
        <div className="flex flex-col justify-around flex-1 px-5 py-6 text-lg">
          <h3 className="font-bold text-secondary">{project.title}</h3>
          <p className="mt-5 text-sm line-clamp-5 text-zinc-700">{project.description}</p>
          <div className="mt-8">
            {
              project.demo_link && <a className="px-4 py-2 text-sm mr-2 text-white border rounded-[10px] border-secondary hover:no-underline bg-secondary hover:bg-white hover:text-secondary" href={project.demo_link}>Demo</a>
            }
  {
    project.code_link && <a className="px-4 py-2 text-sm text-white border rounded-[10px] border-secondary hover:no-underline bg-secondary hover:bg-white hover:text-secondary" href={project.code_link}>Source Code</a>
  }
          </div>
        </div>
      </div>
    </>
  )
}
