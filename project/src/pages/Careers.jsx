import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Clock, Users, Briefcase, X, Send } from 'lucide-react';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Engineering');
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  // Motion values for drag gestures
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations'];

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (selectedJob || showApplicationForm) return; // Don't handle keys when modals are open
      
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        handleSwipe('left');
      } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        handleSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentJobIndex, selectedJob, showApplicationForm]);

  const jobData = {
    Engineering: [
      {
        title: 'Senior Full Stack Engineer',
        department: 'Engineering',
        location: 'San Francisco, CA / Remote',
        type: 'Full-time',
        experience: '5+ years',
        salary: '$150K - $200K',
        description: 'Join our core engineering team to build the next generation of job matching technology using React, Node.js, and blockchain.',
        responsibilities: [
          'Develop and maintain our swipe-based matching platform',
          'Integrate blockchain verification systems',
          'Build scalable backend services and APIs',
          'Collaborate with product and design teams'
        ],
        requirements: [
          '5+ years of full-stack development experience',
          'Expertise in React, Node.js, and TypeScript',
          'Experience with blockchain technology (preferred)',
          'Strong problem-solving and communication skills'
        ],
        benefits: ['Equity package', 'Health insurance', 'Unlimited PTO', '$5K learning budget']
      },
      {
        title: 'Blockchain Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        experience: '3+ years',
        salary: '$130K - $180K',
        description: 'Lead our blockchain infrastructure development on Algorand, focusing on smart contracts and decentralized verification.',
        responsibilities: [
          'Develop smart contracts for job verification',
          'Implement blockchain-based identity systems',
          'Optimize gas costs and transaction speeds',
          'Ensure security and compliance standards'
        ],
        requirements: [
          '3+ years of blockchain development experience',
          'Proficiency in Algorand, Solidity, or similar',
          'Understanding of cryptography and security',
          'Experience with DeFi protocols (preferred)'
        ],
        benefits: ['Equity package', 'Health insurance', 'Remote work', 'Conference budget']
      },
      {
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'New York, NY / Remote',
        type: 'Full-time',
        experience: '4+ years',
        salary: '$140K - $190K',
        description: 'Scale our infrastructure to support millions of users while maintaining security and performance.',
        responsibilities: [
          'Manage AWS/GCP cloud infrastructure',
          'Implement CI/CD pipelines',
          'Monitor system performance and reliability',
          'Ensure security and compliance'
        ],
        requirements: [
          '4+ years of DevOps/Infrastructure experience',
          'Expertise in AWS, Docker, and Kubernetes',
          'Experience with monitoring tools',
          'Security-first mindset'
        ],
        benefits: ['Equity package', 'Health insurance', 'Flexible hours', 'Home office budget']
      }
    ],
    Product: [
      {
        title: 'Senior Product Manager',
        department: 'Product',
        location: 'San Francisco, CA',
        type: 'Full-time',
        experience: '5+ years',
        salary: '$160K - $220K',
        description: 'Drive product strategy and roadmap for our revolutionary job matching platform.',
        responsibilities: [
          'Define product vision and strategy',
          'Lead cross-functional product teams',
          'Analyze user data and market trends',
          'Manage product roadmap and priorities'
        ],
        requirements: [
          '5+ years of product management experience',
          'Experience with consumer-facing apps',
          'Data-driven decision making',
          'Excellent communication skills'
        ],
        benefits: ['Equity package', 'Health insurance', 'Unlimited PTO', 'Product conference budget']
      },
      {
        title: 'Product Designer',
        department: 'Product',
        location: 'Remote',
        type: 'Full-time',
        experience: '3+ years',
        salary: '$120K - $160K',
        description: 'Design intuitive user experiences for our mobile-first job matching platform.',
        responsibilities: [
          'Create user-centered design solutions',
          'Conduct user research and testing',
          'Design mobile and web interfaces',
          'Collaborate with engineering teams'
        ],
        requirements: [
          '3+ years of product design experience',
          'Proficiency in Figma and design systems',
          'Experience with mobile app design',
          'Portfolio showcasing UX/UI work'
        ],
        benefits: ['Equity package', 'Health insurance', 'Design tool budget', 'Creative time']
      }
    ],
    Design: [
      {
        title: 'Lead UX Designer',
        department: 'Design',
        location: 'Los Angeles, CA / Remote',
        type: 'Full-time',
        experience: '6+ years',
        salary: '$140K - $180K',
        description: 'Lead our design team in creating delightful user experiences for job seekers and employers.',
        responsibilities: [
          'Lead UX strategy and design direction',
          'Mentor junior designers',
          'Conduct user research and usability testing',
          'Create design systems and guidelines'
        ],
        requirements: [
          '6+ years of UX design experience',
          'Leadership and mentoring experience',
          'Expertise in user research methods',
          'Strong portfolio of shipped products'
        ],
        benefits: ['Equity package', 'Health insurance', 'Design conference budget', 'Creative sabbatical']
      }
    ],
    Marketing: [
      {
        title: 'Growth Marketing Manager',
        department: 'Marketing',
        location: 'New York, NY / Remote',
        type: 'Full-time',
        experience: '4+ years',
        salary: '$110K - $150K',
        description: 'Drive user acquisition and growth through innovative marketing strategies.',
        responsibilities: [
          'Develop growth marketing strategies',
          'Manage paid advertising campaigns',
          'Optimize conversion funnels',
          'Analyze marketing performance data'
        ],
        requirements: [
          '4+ years of growth marketing experience',
          'Experience with digital advertising',
          'Data analysis and optimization skills',
          'B2C marketing experience preferred'
        ],
        benefits: ['Equity package', 'Health insurance', 'Marketing budget', 'Conference attendance']
      }
    ],
    Sales: [
      {
        title: 'Enterprise Sales Manager',
        department: 'Sales',
        location: 'Chicago, IL / Remote',
        type: 'Full-time',
        experience: '5+ years',
        salary: '$120K - $180K + Commission',
        description: 'Build relationships with enterprise clients and drive B2B sales growth.',
        responsibilities: [
          'Manage enterprise client relationships',
          'Develop sales strategies and processes',
          'Negotiate contracts and partnerships',
          'Meet and exceed sales targets'
        ],
        requirements: [
          '5+ years of B2B sales experience',
          'Track record of exceeding quotas',
          'Experience with SaaS/tech products',
          'Excellent communication skills'
        ],
        benefits: ['Equity package', 'Health insurance', 'Commission structure', 'Sales incentives']
      }
    ],
    Operations: [
      {
        title: 'Head of People Operations',
        department: 'Operations',
        location: 'Austin, TX / Remote',
        type: 'Full-time',
        experience: '6+ years',
        salary: '$130K - $170K',
        description: 'Lead our people operations and build an amazing culture as we scale.',
        responsibilities: [
          'Develop HR policies and procedures',
          'Manage talent acquisition and onboarding',
          'Build company culture initiatives',
          'Handle employee relations and development'
        ],
        requirements: [
          '6+ years of HR/People Ops experience',
          'Experience scaling startup teams',
          'Knowledge of employment law',
          'Strong interpersonal skills'
        ],
        benefits: ['Equity package', 'Health insurance', 'Unlimited PTO', 'Professional development']
      }
    ]
  };

  const currentJobs = jobData[selectedDepartment] || [];

  const handleSwipe = (direction) => {
    if (isCardExpanded) return; // Prevent swiping when card is expanded
    
    setSwipeDirection(direction);
    // Reset motion values
    x.set(direction === 'left' ? -300 : 300);
    
    setTimeout(() => {
      if (direction === 'left' && currentJobIndex > 0) {
        setCurrentJobIndex(currentJobIndex - 1);
      } else if (direction === 'right' && currentJobIndex < currentJobs.length - 1) {
        setCurrentJobIndex(currentJobIndex + 1);
      }
      setSwipeDirection(null);
      setIsCardExpanded(false); // Reset expansion for new card
      x.set(0); // Reset position
    }, 300);
  };

  const handleDragEnd = (event, info) => {
    if (isCardExpanded) return; // Prevent dragging when card is expanded
    
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      handleSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else {
      x.set(0); // Snap back to center
    }
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    setIsCardExpanded(!isCardExpanded);
  };

  const handleBackgroundClick = () => {
    setIsCardExpanded(false);
  };

  const handleJobClick = (job) => {
    if (typeof job === 'object') {
      setSelectedJob(job);
    } else {
      setSelectedJob(currentJobs[currentJobIndex]);
    }
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simple alert instead of toast to avoid dependency issues
    alert("Application Submitted! 🎉\nThank you for your interest in Hirly. We'll be in touch soon!");
    setShowApplicationForm(false);
    setSelectedJob(null);
    setFormData({ name: '', email: '', phone: '', resume: null, coverLetter: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Hirly</span> Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us revolutionize the future of work. Swipe through our open positions!
          </p>
        </div>
      </div>

      {/* Department Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {departments.map((dept) => (
            <motion.button
              key={dept}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedDepartment(dept);
                setCurrentJobIndex(0);
                setIsCardExpanded(false); // Reset expansion when changing departments
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedDepartment === dept
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'border border-white/30 text-white hover:bg-white/10'
              }`}
            >
              {dept}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <motion.div 
        key={selectedDepartment}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-sm mx-auto px-4 sm:px-6 lg:px-8" 
        onClick={handleBackgroundClick}
      >
        <div className={`relative perspective-1000 transition-all duration-300 ${
          isCardExpanded ? 'h-[600px]' : 'h-[500px]'
        }`}>
          <AnimatePresence mode="wait">
            {currentJobs.length > 0 && (
              <motion.div
                key={`${selectedDepartment}-${currentJobIndex}`}
                drag={isCardExpanded ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ 
                  x,
                  rotate,
                  opacity
                }}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{
                  x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
                  rotate: swipeDirection === 'left' ? -30 : swipeDirection === 'right' ? 30 : 0,
                  opacity: swipeDirection ? 0 : 1,
                  scale: isCardExpanded ? 1.02 : 1,
                  y: 0
                }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`absolute inset-0 w-full h-full ${
                  isCardExpanded ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
                }`}
                onClick={handleCardClick}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex-shrink-0">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {currentJobs[currentJobIndex].title}
                        </h3>
                        <div className="flex items-center text-white/80 mb-2">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>{currentJobs[currentJobIndex].department}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-white/90">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{currentJobs[currentJobIndex].location}</span>
                        </div>
                        <div className="flex items-center text-white/90">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{currentJobs[currentJobIndex].type} • {currentJobs[currentJobIndex].experience}</span>
                        </div>
                        <div className="flex items-center text-green-300 font-semibold">
                          <Users className="w-4 h-4 mr-2" />
                          <span className="text-sm">{currentJobs[currentJobIndex].salary}</span>
                        </div>
                      </div>

                      <p className="text-white/90 text-sm leading-relaxed">
                        {currentJobs[currentJobIndex].description}
                      </p>
                    </div>

                    {/* Scrollable expanded content */}
                    <div className={`flex-1 ${isCardExpanded ? 'overflow-y-auto scrollbar-hide' : 'overflow-hidden'}`}>
                      {/* Tap to expand indicator */}
                      {!isCardExpanded && (
                        <div className="mt-4 flex items-center justify-center text-white/50 text-xs">
                          <span>Tap to see more details</span>
                        </div>
                      )}
                      
                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isCardExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-4"
                          >
                            <div>
                              <h4 className="text-white font-semibold mb-2 text-sm">Responsibilities</h4>
                              <ul className="space-y-1">
                                {currentJobs[currentJobIndex].responsibilities.slice(0, 3).map((resp, index) => (
                                  <li key={index} className="flex items-start text-white/80 text-xs">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-white font-semibold mb-2 text-sm">Requirements</h4>
                              <ul className="space-y-1">
                                {currentJobs[currentJobIndex].requirements.slice(0, 3).map((req, index) => (
                                  <li key={index} className="flex items-start text-white/80 text-xs">
                                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-white font-semibold mb-2 text-sm">Benefits</h4>
                              <div className="flex flex-wrap gap-1">
                                {currentJobs[currentJobIndex].benefits.slice(0, 4).map((benefit, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-purple-500/20 rounded-full text-purple-200 text-xs"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobClick(currentJobs[currentJobIndex]);
                              }}
                              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg py-2 text-sm transition-all duration-300"
                            >
                              View Full Details
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Instructions */}
                    {!isCardExpanded && (
                      <div className="text-center text-white/60 text-xs mt-4">
                        Use ← → keys or swipe to browse
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center mt-8 space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            disabled={currentJobIndex === 0}
            className="p-3 rounded-lg border border-white/30 text-white hover:bg-white/10 disabled:opacity-30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="flex space-x-2">
            {currentJobs.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: index === currentJobIndex ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentJobIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            disabled={currentJobIndex === currentJobs.length - 1}
            className="p-3 rounded-lg border border-white/30 text-white hover:bg-white/10 disabled:opacity-30 transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Instructions */}
        <div className="text-center text-white/60 text-sm mt-4">
          Use keyboard arrows (← →) or drag cards to browse jobs
        </div>
      </motion.div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center text-purple-300 mb-2">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{selectedJob.department}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{selectedJob.type} • {selectedJob.experience}</span>
                  </div>
                  <div className="flex items-center text-green-300 font-semibold">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{selectedJob.salary}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">About the Role</h3>
                  <p className="text-white/80">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-white/80">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleApply}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Apply for this Position
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowApplicationForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Apply Now</h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Resume *</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleInputChange('resume', e.target.files[0])}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Cover Letter</label>
                  <textarea
                    rows={4}
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400 focus:outline-none resize-none"
                    placeholder="Tell us why you're interested in this role..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
