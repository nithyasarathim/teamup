import React, { useState, useEffect, useContext } from 'react';
import { X, Inbox, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserContext from '../../Context/UserContext';

const MailModal = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const [view, setView] = useState('inbox');
  const [emails, setEmails] = useState({ inbox: [], outbox: [] });
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [readStatus, setReadStatus] = useState({});

  const fetchEmails = async () => {
    try {
      const inboxRes = await fetch('http://localhost:8000/mail/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const outboxRes = await fetch('http://localhost:8000/mail/outbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const inboxData = await inboxRes.json();
      const outboxData = await outboxRes.json();

      setEmails({
        inbox: inboxData,
        outbox: outboxData,
      });

      // Initialize read status map from inbox
      const statusMap = {};
      inboxData.forEach(email => {
        statusMap[email._id] = email.status;
      });
      setReadStatus(statusMap);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchEmails();
    }
  }, [user?.email]);

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);

    if (view === 'inbox' && !email.status) {
      try {
        await fetch('http://localhost:8000/mail/read', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: email._id }),
        });

        setReadStatus(prev => ({ ...prev, [email._id]: true }));

        // Optionally re-fetch to sync with DB
        fetchEmails();
      } catch (err) {
        console.error('Error marking email as read:', err);
      }
    }
  };

  const EmailList = () => {
    const list = emails[view];
    if (!list || list.length === 0) {
      return (
        <div className='h-full flex items-center justify-center text-gray-400 bg-white rounded-lg border'>
          No mail here!
        </div>
      );
    }

    return (
      <div className='h-full bg-white shadow-sm rounded-lg p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
        {list.map((email) => (
          <div
            key={email._id}
            onClick={() => handleEmailClick(email)}
            className={`p-3 mb-2 rounded-md shadow-sm hover:bg-sky-50 cursor-pointer 
              ${view === 'inbox' && !readStatus[email._id] ? 'bg-sky-50 font-semibold' : 'bg-white'}`}
          >
            <p className='text-sm text-gray-600'>
              <strong>{view === 'inbox' ? 'From' : 'To'}:</strong> {view === 'inbox' ? email.from : email.to}
            </p>
            <p className='text-sm font-medium text-gray-800'>{email.subject}</p>
          </div>
        ))}
      </div>
    );
  };

  const EmailDetail = () => (
    selectedEmail ? (
      <div className='bg-white shadow-sm rounded-lg p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
        <h2 className='text-lg font-semibold text-sky-700'>{selectedEmail.subject}</h2>
        <p className='text-sm text-gray-600 mb-1'>
          <strong>From:</strong> {selectedEmail.from || 'You'} | <strong>To:</strong> {selectedEmail.to || 'You'}
        </p>
        <hr className='my-2' />
        <p className='text-sm text-gray-800 whitespace-pre-line'>{selectedEmail.message}</p>
      </div>
    ) : (
      <div className='h-full bg-white shadow-sm rounded-lg flex items-center justify-center text-gray-400'>
        Select a mail to read
      </div>
    )
  );

  return (
    <AnimatePresence>
      <motion.div
        className='fixed top-0 left-0 w-full h-full bg-[#00000090] flex items-center justify-center z-50'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='relative bg-white rounded-2xl p-6 w-full max-w-screen-lg mx-auto shadow-lg'
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          >
            <X size={20} />
          </button>

          {/* Inbox/Outbox Buttons */}
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => { setView('inbox'); setSelectedEmail(null); }}
              className={`px-4 py-2 rounded-md text-sm font-medium shadow inline-flex items-center gap-2 
                ${view === 'inbox' ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Inbox size={16} />
              Inbox
            </button>
            <button
              onClick={() => { setView('outbox'); setSelectedEmail(null); }}
              className={`px-4 py-2 rounded-md text-sm font-medium shadow inline-flex items-center gap-2 
                ${view === 'outbox' ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Send size={16} />
              Outbox
            </button>
          </div>

          {/* Content Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]'>
            <div className='col-span-1 overflow-x-auto '>
              <EmailList />
            </div>
            <div className='col-span-2 overflow-x-auto'>
              <EmailDetail />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MailModal;
