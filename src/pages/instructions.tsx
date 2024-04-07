'use client'
import crfsLogo from "../assets/images/logos/crfs-logo.png"
import uvuLogo from "../assets/images/logos/uvu-dgm-logo.png"
import iconChip from "../assets/images/iconChip.jpg"
import scanExample from "../assets/images/scan-example.gif"
import readInfo from "../assets/images/read-info.gif"
import homePage from "../assets/images/homePage.jpg"


export default function InstructionsPage() {
    const instructions: {text: string, imagePath: string, alt: string}[] = [
        {
            text: 'Search around the field station for small white tags with icons.',
            imagePath: iconChip,
            alt: 'An example of a tag'
        },
        {
            text: 'When you have located a tag, place your phone over the tag to bring up a new webpage. Hold your phone flat against the tag for a few seconds.',
            imagePath: scanExample,
            alt: 'GIF demonstrating how to scan the tag'
        },
        {
            text: 'Read the information on the page and complete the activity.',
            imagePath: readInfo,
            alt: 'GIF showing an example of a scavenger hunt page'
        },
        {
            text: 'Look for more tags! Your progress will be tracked in the progress bar at the top of the screen as well as the home page. (Hint: the icon on the home page corresponds to the icon on the tag)',
            imagePath: homePage,
            alt: 'screenshot of the home page with the progress bar at the top and tags to find listed below, each with a corresponding icon'
        },
        {
            text: 'Once you have located and completed the activity for each tag, show your completed screen to the site manager to earn a small prize!',
            imagePath: '',
            alt: ''
        },
        {
            text: 'IMPORTANT! Make sure to NOT use a private/incognito tab and to NOT clear your browsing history while playing the scavenger hunt or else your progress will not be saved correctly!',
            imagePath: '',
            alt: ''
        },
        {
            text: 'If you need these instructions again, simply tap the "?" icon at the top of the screen.',
            imagePath: '',
            alt: ''
        }
    ]

    return (
        <main className="bg-primary">
            <div className="p-5 flex flex-col gap-10 text-white max-w-[600px] m-auto">
                <div className='flex gap-5 justify-between'>
                    <figure><img src={crfsLogo} alt='CRFS Logo' className="w-20" /></figure>
                    <figure><img src={uvuLogo} alt="UVU DGM Logo" className="w-32" /></figure>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-semibold font-cabinSketch">Welcome to the Captiol Reef Field Station Scavenger Hunt!</h1>

                    <div className='flex flex-col gap-12 mb-10'>
                        {instructions.map((step, i) => (
                            <div key={i}>
                                <div className="flex gap-3 mb-3">
                                    <p className="text-4xl font-semibold text-[#BCCE95] flex items-center">{i + 1}</p>
                                    <p className="text-lg">{step.text}</p>
                                </div>

                                {step.imagePath ? (
                                    <img src={step.imagePath} alt={step.alt} className='rounded-3xl'/>
                                ) : ''}
                            </div>
                        ))}
                    </div>

                    <a href="/" className="btn btn-accent text-accent-content border border-white mb-10">START</a>
                    <p className="text-center">© UVU DWDD 490R | 2024</p>
                </div>
            </div>
        </main>
    )
}
