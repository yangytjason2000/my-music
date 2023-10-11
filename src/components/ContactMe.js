const Contact = () => {
    return (
    <div className='w-full h-screen bg-black flex justify-center text-white items-start p-[120px]'>
        <form method="POST" 
            action="https://getform.io/f/452ba602-ac4e-4018-976b-b68be7e600ff" 
            className='flex flex-col max-w-[600px] w-full'>
            <div>
                <p className="text-4xl font-bold inline border-b-4">Contact</p>
                <p className="py-4">Contact me by submitting the form!</p>
            </div>
            <input className="p-2 rounded-md" type='text' placeholder="Name" name='name'/>
            <input className="my-4 p-2 rounded-md" type='email' placeholder="Email" name='email'/>
            <textarea className="p-2 rounded-md" name="message" rows="4" placeholder="Message Me"></textarea>
            <button 
                className={`border-2 
                    hover:bg-blue-400 
                    hover:border-blue-400 
                    transition-colors 
                    duration-300
                    mx-auto
                    flex
                    items-center
                    px-4
                    my-3
                    py-2
                    rounded-md
                    text-white`}>
                Contact Me
            </button>
        </form>
    </div>
    )
}

export default Contact;