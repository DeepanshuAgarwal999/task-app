import React, { useCallback } from 'react'

const Modal = ({ children, title="Add Task" }: { children: (closeModal: () => void) => React.ReactNode; title: string }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const closeModal = useCallback(() => setIsOpen(false), [])
    if (!isOpen) {
        return <button onClick={() => setIsOpen(true)} className='bg-red-500 capitalize rounded-lg text-white p-2'>{title}</button>
    }
    return (
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center h-screen justify-center w-full bg-black/10'>
            <div className='bg-white rounded-lg w-full max-w-[380px] p-8 relative'>
              <div>
                    {
                        children(closeModal)
                    }
              </div>
                <button onClick={() => setIsOpen(false)} className='absolute top-0 right-4 text-black'>X</button>
            </div>
        </div>
    )
}

export default Modal