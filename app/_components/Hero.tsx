import React from 'react'

function Hero() {
  return (
    <section className="bg-black  ">
      <div className='flex items-baseline justify-center pt-20 '>
        <h2 className='text-white text-center border border-white px-3 p-2 rounded-full '>see Whats's New | 
        <span className='text-sky-300'> Ai Diagram</span></h2>
      </div>

        <div className="mx-auto max-w-screen-xl px-4 py-12 h-screen lg:flex ">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl text-sky-300 font-extrabold sm:text-5xl">
             Documents & diagrams
              <strong className="font-extrabold text-white sm:block">for engineering teams</strong>
            </h1>

            <p className="mt-4 text-slate-200 sm:text-xl/relaxed">
            All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-black">
              <a
                className="block w-full rounded text-black bg-white px-12 py-3 text-sm font-medium  shadow  focus:outline-none focus:ring hover:bg-sky-300 active:bg-sky-200 sm:w-auto"
                href="#"
              >
                Learn more
              </a>

              
            </div>
          </div>
        </div>
    </section>
  )
}

export default Hero