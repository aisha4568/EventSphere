import { useEffect, useState } from 'react';
import API from '../../services/api';
import EmptyState from '../../components/EmptyState';
import { MessageSquare, Inbox, Send, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

export default function Messages() {
  const { user } = useAuth();

  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [tab, setTab] = useState('inbox');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  // Sirf Admin message compose kar sakta hai
  const canCompose = user?.role === 'admin';

  const load = async () => {
    try {
      const [inboxResponse, sentResponse] = await Promise.all([
        API.get('/messages/inbox'),
        API.get('/messages/sent')
      ]);

      setInbox(inboxResponse.data.data || []);
      setSent(sentResponse.data.data || []);
    } catch (err) {
      toast.error('Failed to load messages');
    }
  };

  const loadRecipients = async () => {
    if (!canCompose) return;

    try {
      const response = await API.get('/messages/recipients');
      setRecipients(response.data.data || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to load recipients'
      );
    }
  };

  useEffect(() => {
    load();

    if (user?.role === 'admin') {
      loadRecipients();
    }
  }, [user?.role]);

  const openMessageModal = () => {
    reset();
    setIsModalOpen(true);
    loadRecipients();
  };

  const closeMessageModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const sendMessage = async (data) => {
    try {
      await API.post('/messages', {
        receiverId: data.receiverId,
        subject: data.subject,
        body: data.body
      });

      toast.success('Message sent successfully!');

      closeMessageModal();
      await load();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to send message'
      );
    }
  };

  const list = tab === 'inbox' ? inbox : sent;

  return (
    <div className="text-white max-w-4xl relative">

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>

        {canCompose && (
          <button
            onClick={openMessageModal}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Message
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('inbox')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'inbox'
              ? 'bg-purple-600 text-white'
              : 'bg-[#17121F] border border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Inbox className="w-4 h-4" />
          Inbox
        </button>

        <button
          onClick={() => setTab('sent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'sent'
              ? 'bg-purple-600 text-white'
              : 'bg-[#17121F] border border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Send className="w-4 h-4" />
          Sent
        </button>
      </div>

      {/* Messages List */}
      {list.length === 0 ? (
        <EmptyState
          title="No messages"
          message={
            tab === 'inbox'
              ? 'Your received messages will appear here.'
              : 'Your sent messages will appear here.'
          }
          icon={MessageSquare}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {list.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#17121F] border border-white/10 p-5 rounded-2xl hover:border-purple-500/30 transition-colors"
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                  <p className="font-semibold text-sm text-purple-400">
                    {tab === 'inbox'
                      ? `From: ${message.sender?.name || 'Unknown'}`
                      : `To: ${message.receiver?.name || 'Unknown'}`}
                  </p>

                  <span className="text-xs text-gray-500 bg-[#211A2B] px-2 py-1 rounded border border-white/5">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleDateString('en-PK')
                      : ''}
                  </span>
                </div>

                {message.subject && (
                  <p className="text-sm font-bold text-white mb-2">
                    {message.subject}
                  </p>
                )}

                <p className="text-sm text-gray-400 leading-relaxed">
                  {message.body}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Compose Modal - Sirf Admin */}
      {canCompose && isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#17121F] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/10">
              <h3 className="font-bold text-lg text-white">
                Compose Message
              </h3>

              <button
                type="button"
                onClick={closeMessageModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(sendMessage)}
              className="p-5 space-y-4"
            >
              {/* Recipient */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Select Recipient
                </label>

                <select
                  {...register('receiverId', {
                    required: 'Please select a recipient'
                  })}
                  defaultValue=""
                  className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                >
                  <option value="" disabled>
                    Select Attendee or Exhibitor
                  </option>

                  {recipients.map((recipient) => (
                    <option
                      key={recipient._id}
                      value={recipient._id}
                    >
                      {recipient.name} ({recipient.role}) - {recipient.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Subject
                </label>

                <input
                  {...register('subject', {
                    required: 'Subject is required'
                  })}
                  className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                  placeholder="Message subject..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>

                <textarea
                  rows="4"
                  {...register('body', {
                    required: 'Message is required'
                  })}
                  className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || recipients.length === 0}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold w-full py-3 rounded-xl transition-all"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}