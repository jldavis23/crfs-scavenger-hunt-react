'use client'
export const HuntCompleteModal = () => {
    return (
        <div>
            <dialog id="completed_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-3xl mb-4 font-cabinSketch">Scavenger Hunt Complete!</h3>

                    <div className='flex gap-3 py-3'>
                        <a href="/?page=huntcompleted" className='btn btn-primary text-white order-last'>VIEW YOUR CERTIFICATE →</a>
                        <button className='btn' onClick={() => (document.getElementById('completed_modal') as HTMLDialogElement).close()}>CLOSE</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}