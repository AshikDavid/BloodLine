import React, { useState } from 'react';
import { ChevronDown, MapPin, Send } from 'lucide-react';
import { createRequest } from '../../services/requestService';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function RequestBlood() {
  const [activeUrgency, setActiveUrgency] = useState('urgent');
  const [form, setForm] = useState({
    patientName: '',
    bloodGroup: 'A+',
    units: 1,
    hospital: '',
    city: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const labelClass = 'block text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-2';
  const inputClass = 'w-full bg-[#f4f5f7] text-sm text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all';

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await createRequest({ ...form, units: Number(form.units), urgency: activeUrgency, status: 'open' });
      setMessage('Blood request submitted');
      setForm({ patientName: '', bloodGroup: 'A+', units: 1, hospital: '', city: '' });
      setActiveUrgency('urgent');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f1f4f8] p-4 sm:p-8 flex justify-center items-start font-sans">
      <div className="relative bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.04)] w-full max-w-2xl p-8 sm:p-12 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="mb-10">
            <h2 className="text-[32px] leading-tight font-extrabold text-gray-900 tracking-tight mb-2">Request Blood</h2>
            <p className="text-sm text-gray-500 font-medium">Please provide accurate patient and hospital details to ensure a rapid response.</p>
          </div>

          {message && <div className="mb-5 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</div>}
          {error && <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className={labelClass}>Patient Name</label>
              <input name="patientName" value={form.patientName} onChange={handleChange} required type="text" placeholder="Full legal name" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Blood Group</label>
                <div className="relative">
                  <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Units Required</label>
                <input name="units" value={form.units} onChange={handleChange} min="1" required type="number" placeholder="e.g. 2" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Urgency Level</label>
              <div className="flex gap-3">
                {['normal', 'urgent', 'critical'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setActiveUrgency(level)}
                    className={`flex-1 py-3.5 text-sm font-semibold rounded-xl capitalize transition-all ${activeUrgency === level ? 'bg-white text-[#c1122f] border border-[#c1122f]/30 shadow-[0_4px_12px_rgb(193,18,47,0.08)]' : 'bg-[#f4f5f7] text-gray-600 hover:bg-gray-200 border border-transparent'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Hospital</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input name="hospital" value={form.hospital} onChange={handleChange} required type="text" placeholder="Hospital name" className={`${inputClass} pl-11`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input name="city" value={form.city} onChange={handleChange} required type="text" placeholder="City" className={inputClass} />
            </div>

            <button type="submit" disabled={loading} className="w-full mt-4 flex items-center justify-center gap-2 bg-[#c1122f] text-white rounded-full py-4 text-[15px] font-bold shadow-[0_8px_20px_rgb(193,18,47,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-60">
              <Send className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Submit Emergency Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
