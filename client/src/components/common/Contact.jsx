import React from 'react'
import {
    MapPin,
    Phone,
    Mail,
    ChevronDown,
    HelpCircle,
    Asterisk,
    ChevronRight
} from 'lucide-react';
export default function Contact() {
    return (
        <div className="flex flex-col items-start mx-6 my-10 font-sans">
            <section className="w-full flex flex-col gap-4 max-w-4xl">

                <h1 className=" text-[56px] font-bold text-gray-900 tracking-[-1.4px] leading-17.5">
                    Contact Us
                </h1>

                {/* Paragraph: Muted gray, readable size, and comfortable line height */}
                <p className="text-[#5C3F40] text-lg leading-7.5 max-w-2xl mb-16">
                    Whether you have questions about the donation process, need assistance with
                    your appointment, or want to partner with us—our team is here to support your
                    life-saving journey.
                </p>
            </section>

            <section className=' min-h-screen bg-[#fcfcfc] py-16 px-4 md:px-8'>
                <div className='mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 '>
                    <div className="lg:col-span-3 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-4xl p-8 md:p-12">

                        <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-10 tracking-tight">
                            Send a Message
                        </h2>

                        <form className="flex flex-col">

                            {/* Row 1: Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="flex flex-col">
                                    <label className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Julian Thorne"
                                        className="w-full rounded-2xl bg-[#f4f5f7] px-5 py-4 text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="j.thorne@editorial.com"
                                        className="w-full rounded-2xl bg-[#f4f5f7] px-5 py-4 text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Subject */}
                            <div className="flex flex-col mb-6 relative">
                                <label className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    Subject
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-2xl bg-[#f4f5f7] px-5 py-4 text-[15px] text-gray-600 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Blood Donation</option>
                                        <option>Hospital Partnership</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Row 3: Message Textarea */}
                            <div className="flex flex-col mb-8">
                                <label className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    Message
                                </label>
                                <textarea
                                    placeholder="How can we assist you today?"
                                    rows={5}
                                    className="w-full rounded-2xl bg-[#f4f5f7] px-5 py-4 text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="w-full rounded-2xl bg-[#c1122f] py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgb(193,18,47,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Send Message
                            </button>

                        </form>
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Top Card: Contact Information */}
                        <div className="bg-[#f4f5f7] rounded-4xl p-8">
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-8">
                                Contact Information
                            </h3>

                            <div className="flex flex-col gap-6 mb-8">

                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <MapPin className="w-5 h-5 text-[#c1122f]" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col mt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c1122f] mb-1">
                                            Our Center
                                        </span>
                                        <span className="text-[15px] font-medium text-gray-800">
                                            St. Jude's Medical Center
                                        </span>
                                        <span className="text-sm text-gray-500 mt-0.5">
                                            2100 O'Farrell St, San Francisco, CA
                                        </span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Phone className="w-5 h-5 text-[#c1122f]" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col mt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c1122f] mb-1">
                                            Phone Support
                                        </span>
                                        <span className="text-[15px] font-medium text-gray-800">
                                            +1 (415) 555-0192
                                        </span>
                                        <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                                            Mon-Fri: 8am - 6pm PST
                                        </span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Mail className="w-5 h-5 text-[#c1122f]" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col mt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c1122f] mb-1">
                                            Email Support
                                        </span>
                                        <span className="text-[15px] font-medium text-gray-800">
                                            care@thelifestream.org
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder Image */}
                            <img
                                src="/api/placeholder/400/200"
                                alt="Map Location"
                                className="w-full h-36 object-cover rounded-[20px] mix-blend-multiply opacity-80"
                            />
                        </div>

                        {/* Bottom Card: Help & Support */}
                        <div className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">
                                Help & Support
                            </h3>

                            <div className="flex flex-col gap-3">
                                {/* FAQ Button */}
                                <button className="flex items-center justify-between w-full p-4 bg-[#f4f5f7] rounded-2xl hover:bg-gray-200 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                                        <span className="text-[14px] font-semibold text-gray-800">
                                            Browse FAQs
                                        </span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </button>

                                {/* Emergency Support Button */}
                                <button className="flex items-center justify-between w-full p-4 bg-[#fff5f5] rounded-2xl hover:bg-[#ffebeb] transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <Asterisk className="w-5 h-5 text-[#c1122f]" strokeWidth={3} />
                                        <span className="text-[14px] font-semibold text-gray-800">
                                            Emergency Support
                                        </span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </button>
                            </div>

                        </div>
                    </div>



                </div>
            </section>
        </div>
    )
}
