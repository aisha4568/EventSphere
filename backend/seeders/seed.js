// backend/seeders/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Event = require('../models/Event');
const Exhibitor = require('../models/Exhibitor');
const ExhibitorApplication = require('../models/ExhibitorApplication');
const Booth = require('../models/Booth');
const BoothReservation = require('../models/BoothReservation');
const AttendeeRegistration = require('../models/AttendeeRegistration');
const Speaker = require('../models/Speaker');
const Session = require('../models/Session');
const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');

const venues = {
  Karachi: 'Karachi Expo Centre',
  Lahore: 'Lahore Expo Centre',
  Islamabad: 'Pak-China Friendship Centre',
  Faisalabad: 'Faisalabad Expo Centre',
  Rawalpindi: 'Convention Centre, Islamabad',
  Multan: 'Multan Expo Centre',
  Peshawar: 'Peshawar Expo Centre',
  Quetta: 'Quetta Expo Centre',
  Hyderabad: 'Hyderabad Expo Centre',
  Sialkot: 'Sialkot Expo Centre',
};

const run = async () => {
  try {
    await connectDB();
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}), Event.deleteMany({}), Exhibitor.deleteMany({}),
      ExhibitorApplication.deleteMany({}), Booth.deleteMany({}),
      BoothReservation.deleteMany({}), AttendeeRegistration.deleteMany({}),
      Speaker.deleteMany({}), Session.deleteMany({}), Feedback.deleteMany({}),
      Notification.deleteMany({}),
    ]);

    // ─── Users ──────────────────────────────────────────────────────────
    console.log('👤 Creating users...');
    const admin = await User.create({
      name: 'Aisha', email: 'admin@eventsphere.pk', phone: '+923001234567',
      password: 'password123', role: 'admin', isVerified: true,
    });

    const attendeeUsers = await Promise.all([
      User.create({ name: 'Ali Ahmed', email: 'ali@example.com', phone: '+923011111111', password: 'password123', role: 'attendee' }),
      User.create({ name: 'Fatima Khan', email: 'fatima@example.com', phone: '+923022222222', password: 'password123', role: 'attendee' }),
      User.create({ name: 'Muhammad Hamza', email: 'hamza@example.com', phone: '+923033333333', password: 'password123', role: 'attendee' }),
      User.create({ name: 'Sara Malik', email: 'sara@example.com', phone: '+923044444444', password: 'password123', role: 'attendee' }),
      User.create({ name: 'Usman Tariq', email: 'usman@example.com', phone: '+923055555555', password: 'password123', role: 'attendee' }),
    ]);

    // ─── Exhibitors ─────────────────────────────────────────────────────
    console.log('🏢 Creating exhibitors...');
    const exhibitorData = [
      { name: 'Zainab Sheikh', email: 'zainab@techvision.pk', companyName: 'TechVision Solutions', category: 'Technology', city: 'Karachi', desc: 'Leading software house specializing in AI-driven enterprise solutions.' },
      { name: 'Bilal Raza', email: 'bilal@paktech.pk', companyName: 'PakTech Innovations', category: 'Technology', city: 'Lahore', desc: 'Cloud infrastructure and cybersecurity provider serving Pakistani banks.' },
      { name: 'Hira Aslam', email: 'hira@digitalpak.pk', companyName: 'Digital Pakistan Solutions', category: 'E-Commerce', city: 'Islamabad', desc: 'Full-service e-commerce consultancy and fulfillment platform.' },
      { name: 'Faisal Mehmood', email: 'faisal@futuresoft.pk', companyName: 'FutureSoft Technologies', category: 'Technology', city: 'Islamabad', desc: 'Enterprise ERP and HR automation software for Pakistani SMEs.' },
      { name: 'Amna Iqbal', email: 'amna@smartbiz.pk', companyName: 'Smart Business Group', category: 'Business', city: 'Karachi', desc: 'Business consulting and B2B networking events.' },
      { name: 'Rehan Akhtar', email: 'rehan@creativemedia.pk', companyName: 'Creative Media House', category: 'Fashion', city: 'Lahore', desc: 'Fashion, lifestyle and media production agency.' },
      { name: 'Nida Yousuf', email: 'nida@nextgen.pk', companyName: 'NextGen Electronics', category: 'Technology', city: 'Faisalabad', desc: 'Consumer electronics and IoT hardware manufacturer.' },
      { name: 'Kamran Shah', email: 'kamran@innovate.pk', companyName: 'Innovate Pakistan', category: 'Startup', city: 'Lahore', desc: 'Startup accelerator and venture studio.' },
    ];

    const exhibitors = [];
    for (const ex of exhibitorData) {
      const user = await User.create({
        name: ex.name, email: ex.email,
        phone: '+9230' + Math.floor(10000000 + Math.random() * 89999999),
        password: 'password123', role: 'exhibitor',
      });
      const exhibitor = await Exhibitor.create({
        user: user._id,
        companyName: ex.companyName, description: ex.desc, category: ex.category,
        email: ex.email, phone: user.phone, city: ex.city,
        website: `https://${ex.companyName.toLowerCase().replace(/\s+/g, '')}.pk`,
        products: ['Software', 'Consulting', 'Cloud Services'],
        address: `${ex.city}, Pakistan`,
      });
      exhibitors.push(exhibitor);
    }

    // ─── Events ─────────────────────────────────────────────────────────
    console.log('🎉 Creating events...');
    const eventsData = [
      { title: 'Pakistan Technology Expo 2026', city: 'Karachi', category: 'Technology', theme: 'Innovating for a Digital Pakistan' },
      { title: 'Digital Business Summit 2026', city: 'Lahore', category: 'Business', theme: 'Connect. Collaborate. Grow.' },
      { title: 'Pakistan IT & Software Exhibition', city: 'Islamabad', category: 'Technology', theme: 'Building the Future of Software' },
      { title: 'Fashion and Lifestyle Expo', city: 'Karachi', category: 'Fashion', theme: 'Threads of Tradition, Trends of Tomorrow' },
      { title: 'Pakistan Startup & Innovation Summit', city: 'Lahore', category: 'Startup', theme: 'From Idea to Impact' },
      { title: 'Healthcare Innovation Expo', city: 'Islamabad', category: 'Healthcare', theme: 'Transforming Healthcare' },
      { title: 'E-Commerce Business Expo', city: 'Faisalabad', category: 'E-Commerce', theme: 'The Future of Online Retail' },
      { title: 'International Education Expo', city: 'Karachi', category: 'Education', theme: 'Learn Global, Grow Local' },
    ];

    const banners = [
      '1540575467063-178a50c2df87',
      '1505373877841-8d25f7d46678',
      '1587825140708-dfaf72ae4b04',
      '1492684223066-81342ee5ff30',
      '1540575467063-178a50c2df87',
      '1511578314322-379afb476865',
      '1591115765373-5207764f72e7',
      '1515169067868-5387ec356754',
    ];

    const events = [];
    for (let i = 0; i < eventsData.length; i++) {
      const e = eventsData[i];
      const start = new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000);
      const end = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
      const event = await Event.create({
        title: e.title,
        description: `${e.title} is a premier ${e.category.toLowerCase()} event bringing together industry leaders, innovators and professionals from across Pakistan. Join us for three days of exhibitions, networking and keynote sessions.`,
        theme: e.theme, category: e.category,
        startDate: start, endDate: end,
        registrationDeadline: new Date(start.getTime() - 3 * 24 * 60 * 60 * 1000),
        city: e.city,
        venue: venues[e.city] || `${e.city} Expo Centre`,
        address: `${e.city}, Pakistan`,
        capacity: 2000, exhibitorCapacity: 100,
        price: 500 + i * 500, currency: 'PKR',
        organizer: admin._id,
        isPublished: true, isFeatured: i < 4,
        banner: `https://images.unsplash.com/photo-${banners[i]}?auto=format&fit=crop&w=1200&q=80`,
      });
      events.push(event);
    }

    // ─── Booths (first 3 events) ───────────────────────────────────────
    console.log('🏗️ Creating booths...');
    const boothCategories = ['Standard', 'Premium', 'Deluxe', 'Corner'];
    for (const event of events.slice(0, 3)) {
      const booths = [];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 6; col++) {
          booths.push({
            event: event._id,
            boothNumber: `B${row + 1}${String(col + 1).padStart(2, '0')}`,
            category: boothCategories[(row + col) % 4],
            price: 25000 + ((row + col) % 4) * 15000,
            size: '3m x 3m',
            status: 'available',
            position: { row, col },
          });
        }
      }
      await Booth.insertMany(booths);
    }

    // ─── Applications ──────────────────────────────────────────────────
    console.log('📝 Creating applications and bookings...');
    for (let i = 0; i < exhibitors.length; i++) {
      const event = events[i % events.length];
      await ExhibitorApplication.create({
        exhibitor: exhibitors[i]._id,
        event: event._id,
        message: 'We would love to showcase our products.',
        status: i < 5 ? 'approved' : 'pending',
      });
    }

    // ─── Reserve booths ────────────────────────────────────────────────
    const allBooths = await Booth.find({ event: events[0]._id });
    for (let i = 0; i < 5 && i < allBooths.length; i++) {
      const booth = allBooths[i];
      booth.status = 'reserved';
      booth.exhibitor = exhibitors[i]._id;
      await booth.save();
      await BoothReservation.create({
        booth: booth._id,
        exhibitor: exhibitors[i]._id,
        event: booth.event,
        status: 'confirmed',
      });
    }

    // ─── Attendee Registrations ────────────────────────────────────────
    console.log('🎟️ Creating registrations...');
    for (const user of attendeeUsers) {
      for (let i = 0; i < 3; i++) {
        await AttendeeRegistration.create({ user: user._id, event: events[i]._id });
        await Event.findByIdAndUpdate(events[i]._id, { $inc: { 'stats.attendeeCount': 1 } });
      }
    }

    // ─── Speakers & Sessions ───────────────────────────────────────────
    console.log('🎤 Creating speakers and sessions...');
    const speakerNames = ['Dr. Adnan Siddiqui', 'Sana Tariq', 'Hassan Raza', 'Mariam Zafar', 'Imran Qureshi'];
    const speakers = [];
    for (const name of speakerNames) {
      speakers.push(await Speaker.create({
        name, title: 'Industry Expert', company: 'TechVision Solutions',
        bio: `${name} is a leading figure in Pakistan's tech ecosystem.`,
        photo: `https://i.pravatar.cc/300?u=${encodeURIComponent(name)}`,
      }));
    }

    for (const event of events.slice(0, 3)) {
      for (let i = 0; i < 4; i++) {
        const start = new Date(event.startDate.getTime() + i * 60 * 60 * 1000);
        await Session.create({
          event: event._id,
          title: ['Opening Keynote', 'AI in Business', 'Networking Break', 'Panel Discussion'][i],
          description: 'A thought-provoking session.',
          speaker: speakers[i % speakers.length]._id,
          startTime: start,
          endTime: new Date(start.getTime() + 45 * 60 * 1000),
          hall: `Hall ${String.fromCharCode(65 + (i % 3))}`,
          track: 'Main',
        });
      }
    }

    // ─── Feedback ──────────────────────────────────────────────────────
    console.log('💬 Creating feedback...');
    for (let i = 0; i < 4; i++) {
      await Feedback.create({
        user: attendeeUsers[i]._id,
        event: events[i]._id,
        rating: 4 + (i % 2),
        category: 'general',
        message: 'Great experience! Very well organized event.',
      });
    }

    // ─── Done ──────────────────────────────────────────────────────────
    console.log('\n✅ Seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   Users:        ${await User.countDocuments()}`);
    console.log(`   Events:       ${await Event.countDocuments()}`);
    console.log(`   Exhibitors:   ${await Exhibitor.countDocuments()}`);
    console.log(`   Booths:       ${await Booth.countDocuments()}`);
    console.log(`   Applications: ${await ExhibitorApplication.countDocuments()}`);
    console.log(`   Speakers:     ${await Speaker.countDocuments()}`);
    console.log(`   Sessions:     ${await Session.countDocuments()}`);
    console.log('\n🔑 Login accounts:');
    console.log('   Admin:     admin@eventsphere.pk     / password123');
    console.log('   Exhibitor: zainab@techvision.pk     / password123');
    console.log('   Attendee:  ali@example.com          / password123\n');

    await mongoose.disconnect();
    console.log('👋 Disconnected. Bye!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Seeding failed:', err.message);
    if (err.errors) {
      Object.values(err.errors).forEach(e => console.error('   •', e.message));
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

run();