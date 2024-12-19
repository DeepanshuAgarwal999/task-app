import React from 'react'

const Modal = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    if (!isOpen) {
        return <button onClick={() => setIsOpen(true)}>open</button>
    }
    return (
        <>
            {isOpen && <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 flex items-center h-screen justify-center w-full bg-black/10'>
                <div className='bg-white rounded-lg w-full max-w-[380px] p-6'>
                    {
                        children
                    }
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </div>}
        </>
    )
}

export default Modal