import React from 'react'
import HeroImg from '../../assets/Container.png'
import Lines from '../../assets/SVG.png'
import { Droplet, HeartHandshake, HandHeart, Asterisk } from 'lucide-react'

export default function LandingPage() {
  const stats = [
    { value: '10k+', label: 'ACTIVE DONORS' },
    { value: '25k+', label: 'LIVES SAVED' },
    { value: '150+', label: 'HOSPITALS JOINED' },
    { value: '24/7', label: 'RAPID RESPONSE' },
  ]
  const wStats = [
    {
      value: "1. Request",
      label: `Submit an urgent blood request
through our secure platform.
Specify type and hospital details.`,
      icon: <Asterisk className='w-6 h-6 text-white' strokeWidth={2.5} />
    },
    {
      value: "2. Match",
      label: `Our AI-driven matching system
identifies the closest available
donors with the matching blood
type.`, icon: <HeartHandshake className='w-6 h-6 text-white' strokeWidth={2} />
    },
    {
      value: "3. Donate",
      label: `Donors are verified and the
contribution is delivered safely to
the designated clinical facility.`,
      icon: <HandHeart className='w-6 h-6 text-white' strokeWidth={2} />
    },
  ]
  return (
    
    <div className=' font-[Inter]'>

      <section className="min-h-screen bg-[#fcfcfc] flex items-center justify-center px-8 pb-32 pt-20 md:p-12">
        <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16'>
          <div className="flex-1 flex flex-col items-start max-w-xl">
            <span className="mb-6 inline-block rounded-full bg-[#fee2e2] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#be123c]">
              Emergency Network
            </span>
            <div className="mb-6 text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <h1>Connect.</h1>
              <h1 className="text-[#B80035]">Donate.</h1>
              <h1>Save Lives.</h1>
            </div>
            <p className="mb-10 text-lg text-gray-600 leading-relaxed max-w-115">
              Join the world's most advanced clinical sanctuary for
              blood donation. We bridge the gap between those in
              urgent need and our community of life-savers.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className='flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#E11D48] to-[#B80035] px-8 py-4 text-base font-semibold text-[#FFFFFF] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] hover:-translate-0.5'>
                <Droplet className="h-5 w-5" />
                Donate Now
              </button>
              <button
                className='rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#B80035] border border-[#E5BDBE] shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5'>
                Request Blood
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <img
              src={HeroImg}
              alt="Hero"
              className='w-full max-w-lg object-contain drop-shadow-2xl'
            />
          </div>
        </div>
      </section>
      <section className='w-full bg-[#F2F4F6] py-24 px-8 '>
        <div className='mx-auto max-w-7xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
          {stats.map((stat) => (
            <div className='flex flex-col items-center justify-center rounded-3xl bg-white p-10 shadow-2xl transition-transform hover:translate-y-1  '>
              <h2 className="text-2xl font-extrabold leading-12 tracking-[-2.4px] text-[#B80035] ">{stat.value}</h2>
              <span className="text-extrabold text-[12px] leading-4 tracking-[1.2px] text-[#5C3F40] ">{stat.label}</span>
            </div>
          ))}

        </div>
      </section>
      <section className='py-32 bg-[#F7F9FB] '>
        <div className=' mx-auto max-w-7xl px-8 flex flex-col  items-center'>
          <div className='text-center max-w-xl mb-20'>
            <h2 className='font-extrabold text-4xl text-[#191C1E] leading-10 tracking-[-0.9px] mb-4 '>How It Works</h2>
            <p className="text-grey-500 leading-relaxed text-[16px]">Our streamlined process ensures that blood reaches those who need it
              exactly when they need it most.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 w-full'>
            {wStats.map((stat) => (
              <div className='bg-[#F2F4F6] rounded-3xl p-12 flex flex-col items-start transition-transform duration-300 hover:translate-y-1 '>
                <span className='w-14 h-14 bg-linear-to-r from-[#E11D48] to-[#B80035] rounded-full flex items-center justify-center mb-4  '>{stat.icon}</span>
                <h2 className='text-xl font-bold mb-4 leading-8 tracking-normal'>{stat.value}</h2>
                <span className='text-[#5C3F40] font-extralight'>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
      className="relative mx-auto w-5xl bg-linear-to-r from-[#E11D48] to-[#B80035] p-24 rounded-[48px] text-white flex flex-col items-center my-32 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-no-repeat bg-cover opacity-100"
          style={{ backgroundImage: `url(${Lines})` }}
        ></div>
        <h2 className=' font-extrabold text-6xl leading-3.5 tracking-[-3px] mb-8 '>Ready to become a hero?</h2>
        <span className=' font-normal mx-20 text-center text-[20px] leading-8 mb-8 '>Join thousands of others in creating a safer future for everyone. Your
          single donation can save up to three lives.
        </span>
        <div className='pt-4 flex flex-wrap items-center gap-6 text-[20px] leading-7 font-bold'>
          <button className='rounded-[9999px] bg-white px-12 py-5.5 text-base font-semibold border-white text-[#B80035] border shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5' >Register as Donor</button>
          <button className='rounded-[9999px] px-12 py-5 text-base font-semibold  border border-[#E5BDBE] shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5'>Learn More</button>
        </div>
      </section>
    </div>
  )
}
