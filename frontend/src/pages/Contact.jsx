
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../services/api';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const submit = async (data) => {
    try {
      await API.post('/contact', data);
      toast.success('Message sent! We will respond soon.');
      reset();
    } catch {
      toast.error('Failed to send message');
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: 'Visit Us',
      text: 'Karachi Expo Centre, Karachi'
    },
    {
      icon: Phone,
      title: 'Call Us',
      text: '+92 300 1234567'
    },
    {
      icon: Mail,
      title: 'Email Us',
      text: 'info@eventsphere.pk'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0E0B16] text-white pt-24 pb-16">

      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* PAGE HEADING */}
        <div className="text-center mb-10">
          <p className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase mb-3">
            Contact Us
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Get in <span className="text-[#A855F7]">Touch</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        {/* CONTACT CONTENT */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            <h2 className="text-2xl font-bold mb-3">
              Contact Information
            </h2>

            <p className="text-gray-400 text-sm leading-6 mb-7">
              Get in touch with our team. We're here to help you
              with your questions and event-related inquiries.
            </p>

            <div className="space-y-4">
              {contactDetails.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#17121F] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-[#A855F7]/40 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#A855F7]/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#A855F7]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm break-words">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="lg:col-span-3">

            <form
              onSubmit={handleSubmit(submit)}
              className="bg-[#17121F] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl"
            >

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Send Us a Message
                </h2>

                <p className="text-gray-400 text-sm">
                  Fill out the form and our team will get back to you.
                </p>
              </div>

              <div className="space-y-5">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name', {
                      required: 'Name is required'
                    })}
                    className="w-full bg-[#0E0B16] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] transition"
                  />

                  {errors.name && (
                    <p className="text-rose-400 text-xs mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email', {
                      required: 'Email is required'
                    })}
                    className="w-full bg-[#0E0B16] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] transition"
                  />

                  {errors.email && (
                    <p className="text-rose-400 text-xs mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Enter message subject"
                    {...register('subject')}
                    className="w-full bg-[#0E0B16] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] transition"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Write your message here..."
                    {...register('message', {
                      required: 'Message is required'
                    })}
                    className="w-full bg-[#0E0B16] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] transition resize-none"
                  />

                  {errors.message && (
                    <p className="text-rose-400 text-xs mt-2">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#A855F7] hover:bg-[#9333EA] disabled:opacity-60 text-white font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
