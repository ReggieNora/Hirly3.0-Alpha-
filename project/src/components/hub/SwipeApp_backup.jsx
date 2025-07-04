import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { X, Heart, RotateCcw, RefreshCw, ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Users, Award, BookOpen, Building, CheckCircle, Info, Star, Eye, TrendingUp, Calendar, Globe, Phone, Mail, ExternalLink, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import HubBackground from './HubBackground';

// Optimized animation settings for consistent smoothness
const ANIMATION_CONFIG = {
  spring: { type: "spring", stiffness: 260, damping: 20 },
  springSmooth: { type: "spring", stiffness: 300, damping: 25 },
  springFast: { type: "spring", stiffness: 400, damping: 30 },
  easeOut: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
};

// Confetti Effect Component
const ConfettiEffect = React.memo(({ show, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!show) return;

    // Create particles that spread across the entire screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const newParticles = Array.from({ length: 80 }, (_, i) => {
      // Create particles from different starting positions across the top
      const startX = (i / 80) * screenWidth + Math.random() * (screenWidth / 80);
      const startY = -Math.random() * 100 - 20; // Start above screen
      
      return {
        id: i,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 12, // Horizontal velocity
        vy: Math.random() * 8 + 4, // Downward velocity
        gravity: 0.3 + Math.random() * 0.2, // Gravity effect
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: [
          '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
          '#ffeaa7', '#dda0dd', '#ff9ff3', '#54a0ff',
          '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84'
        ][Math.floor(Math.random() * 12)],
        size: Math.random() * 10 + 6,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      };
    });

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [show, onComplete]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            borderRadius: particle.shape === 'circle' ? '50%' : '2px',
            willChange: 'transform',
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            x: particle.x + particle.vx * 50,
            y: window.innerHeight + 100,
            rotate: particle.rotation + particle.rotationSpeed * 20,
            opacity: [1, 1, 0.8, 0.4, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeOut",
            times: [0, 0.3, 0.6, 0.8, 1],
          }}
        />
      ))}
      
      {/* Additional burst from center */}
      {particles.length > 0 && (
        <>
          {Array.from({ length: 30 }, (_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const velocity = 200 + Math.random() * 100;
            return (
              <motion.div
                key={`burst-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
                    '#ffeaa7', '#dda0dd', '#ff9ff3', '#54a0ff'
                  ][Math.floor(Math.random() * 8)],
                  willChange: 'transform',
                }}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: window.innerWidth / 2 + Math.cos(angle) * velocity,
                  y: window.innerHeight / 2 + Math.sin(angle) * velocity,
                  scale: [0, 1, 1, 0],
                  opacity: [1, 1, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  times: [0, 0.2, 0.8, 1],
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
});

const generateMatchPercentage = () => Math.floor(Math.random() * 51) + 50; // 50-100%

const getMatchColor = useMemo(() => (percentage) => {
  if (percentage >= 90) return { 
    bg: 'from-green-600 to-green-700', 
    border: 'border-green-500/30', 
    text: 'text-white',
    badge: 'bg-white/20 text-white border-white/30',
    cardBg: 'bg-gradient-to-br from-green-600 to-green-700',
    hover: 'hover:from-green-700 hover:to-green-800'
  };
  if (percentage >= 75) return { 
    bg: 'from-yellow-500 to-yellow-600', 
    border: 'border-yellow-400/30', 
    text: 'text-white',
    badge: 'bg-white/20 text-white border-white/30',
    cardBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    hover: 'hover:from-yellow-600 hover:to-yellow-700'
  };
  return { 
    bg: 'from-red-500 to-red-600', 
    border: 'border-red-400/30', 
    text: 'text-white',
    badge: 'bg-white/20 text-white border-white/30',
    cardBg: 'bg-gradient-to-br from-red-500 to-red-600',
    hover: 'hover:from-red-600 hover:to-red-700'
  };
}, []);

const DraggableCardBody = React.memo(({ item, userType, expanded, setExpanded, onSwipe, dragX, onCollapse }) => {
  const cardType = userType === 'candidate' ? 'job' : 'candidate';
  const cardRef = useRef(null);

  // Memoize match percentage and color to prevent recalculation
  const matchPercentage = useMemo(() => item.matchPercentage || generateMatchPercentage(), [item.matchPercentage]);
  const matchColor = useMemo(() => getMatchColor(matchPercentage), [matchPercentage]);

  // Optimize event handlers with useCallback
  const handleCardClick = useCallback(() => {
    if (!expanded) setExpanded(true);
  }, [expanded, setExpanded]);

  const handleDragEnd = useCallback((_event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else {
      dragX.set(0); 
    }
  }, [onSwipe, dragX]);

  // Optimize click outside handler with useCallback
  const handleClickOutside = useCallback((e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      if (onCollapse) onCollapse();
      setExpanded(false);
    }
  }, [onCollapse, setExpanded]);

  useEffect(() => {
    if (!expanded) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded, handleClickOutside]);

  // Optimize transforms with smoother settings
  const opacity = useTransform(dragX, [-150, 0, 150], [0.6, 1, 0.6]);
  const scale = useTransform(dragX, [-200, 0, 200], [0.96, 1, 0.96]);
  const rotateVal = useTransform(dragX, [-200, 0, 200], [-12, 0, 12], { clamp: false });

  // Memoize card content to prevent unnecessary re-renders
  const cardContent = useMemo(() => {
    if (cardType === 'job') {
      return (
        <Card className={cn("h-full border-0 shadow-lg transition-all duration-300 group", matchColor.cardBg, matchColor.hover)}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white/30">
                    <AvatarImage src={item.logo || `https://avatar.vercel.sh/${item.company}.png?text=${item.company[0]}`} alt={item.company} />
                    <AvatarFallback className="bg-white/20 text-white text-sm font-medium">
                      {item.company?.substring(0, 2) || 'CO'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white border-2 border-white rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className={cn("text-lg font-semibold transition-colors truncate", matchColor.text)}>
                      {item.title}
                    </CardTitle>
                    <Badge variant="secondary" className={cn("font-medium", matchColor.badge)}>
                      <Zap className="w-3 h-3 mr-1" />
                      {matchPercentage}%
                    </Badge>
                  </div>
                  <CardDescription className={cn("flex items-center gap-1 mt-1", matchColor.text, "opacity-90")}>
                    <Building className="w-4 h-4" />
                    {item.company}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={cn("border-white/30 text-white bg-white/10")}>
                <MapPin className="w-3 h-3 mr-1" />
                {item.location}
              </Badge>
              {item.salary && (
                <Badge variant="outline" className={cn("border-white/30 text-white bg-white/10")}>
                  <DollarSign className="w-3 h-3 mr-1" />
                  {item.salary}
                </Badge>
              )}
              <Badge variant="outline" className={cn("border-white/30 text-white bg-white/10")}>
                <Clock className="w-3 h-3 mr-1" />
                {item.type}
              </Badge>
            </div>

            {!expanded && (
              <div className="space-y-3">
                <p className={cn("text-sm line-clamp-2 leading-relaxed", matchColor.text, "opacity-90")}>
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {item.requirements?.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {req}
                    </Badge>
                  ))}
                  {item.requirements?.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      +{item.requirements.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <div className={cn("flex items-center gap-4 text-sm", matchColor.text, "opacity-80")}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.posted}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {Math.floor(Math.random() * 100) + 20} views
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="prose prose-sm max-w-none">
                  <p className={cn("leading-relaxed", matchColor.text, "opacity-90")}>{item.description}</p>
                </div>

                <div>
                  <h4 className={cn("font-medium mb-2 flex items-center gap-2", matchColor.text)}>
                    <BookOpen className="w-4 h-4" />
                    Requirements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.requirements?.map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {item.benefits && (
                  <div>
                    <h4 className={cn("font-medium mb-2 flex items-center gap-2", matchColor.text)}>
                      <Award className="w-4 h-4" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {item.benefits.map((benefit, index) => (
                        <li key={index} className={cn("text-sm flex items-start gap-2", matchColor.text, "opacity-90")}>
                          <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-white/20">
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30">
                    Apply Now
                  </Button>
                  <Button variant="outline" size="icon" className="border-white/30 text-white hover:bg-white/10">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      );
    } else {
      // Candidate Card
      return (
        <Card className={cn("h-full border-0 shadow-lg transition-all duration-300 group", matchColor.cardBg, matchColor.hover)}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white/30">
                    <AvatarImage src={item.avatarSrc || `https://avatar.vercel.sh/${item.name}.png`} alt={item.name} />
                    <AvatarFallback className="bg-white/20 text-white text-sm font-medium">
                      {item.name?.substring(0, 2) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white border-2 border-white rounded-full"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className={cn("text-lg font-semibold transition-colors truncate", matchColor.text)}>
                      {item.name}
                    </CardTitle>
                    <Badge variant="secondary" className={cn("font-medium", matchColor.badge)}>
                      <Zap className="w-3 h-3 mr-1" />
                      {matchPercentage}%
                    </Badge>
                  </div>
                  <CardDescription className={cn("flex items-center gap-1 mt-1", matchColor.text, "opacity-90")}>
                    <Briefcase className="w-4 h-4" />
                    {item.title}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={cn("border-white/30 text-white bg-white/10")}>
                <MapPin className="w-3 h-3 mr-1" />
                {item.location}
              </Badge>
              {item.salary && (
                <Badge variant="outline" className={cn("border-white/30 text-white bg-white/10")}>
                  <DollarSign className="w-3 h-3 mr-1" />
                  {item.salary}
                </Badge>
              )}
              <Badge variant="outline" className={cn("border-white/30 text-white bg-white/10")}>
                <Award className="w-3 h-3 mr-1" />
                {item.experience}
              </Badge>
            </div>

            {!expanded && (
              <div className="space-y-3">
                <p className={cn("text-sm line-clamp-2 leading-relaxed", matchColor.text, "opacity-90")}>
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {item.skills?.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {skill}
                    </Badge>
                  ))}
                  {item.skills?.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      +{item.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <div className={cn("flex items-center gap-4 text-sm", matchColor.text, "opacity-80")}>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Active
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      4.9 rating
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="prose prose-sm max-w-none">
                  <p className={cn("leading-relaxed", matchColor.text, "opacity-90")}>{item.description}</p>
                </div>

                <div>
                  <h4 className={cn("font-medium mb-2 flex items-center gap-2", matchColor.text)}>
                    <Users className="w-4 h-4" />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {item.resume?.experience && (
                  <div>
                    <h4 className={cn("font-medium mb-2 flex items-center gap-2", matchColor.text)}>
                      <Briefcase className="w-4 h-4" />
                      Experience
                    </h4>
                    {item.resume.experience.slice(0, 2).map((exp, index) => (
                      <div key={index} className="mb-3 p-3 bg-white/10 rounded-lg border border-white/20">
                        <p className={cn("font-medium", matchColor.text)}>{exp.title}</p>
                        <p className={cn("text-sm flex items-center gap-1", matchColor.text, "opacity-80")}>
                          <Building className="w-3 h-3" />
                          {exp.company}
                        </p>
                        <p className={cn("text-xs", matchColor.text, "opacity-70")}>{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-white/20">
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="icon" className="border-white/30 text-white hover:bg-white/10">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      );
    }
  }, [cardType, item, matchColor, matchPercentage, expanded]);

  // Optimize drag end handler
  const handleDragEnd = useCallback((_event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else {
      dragX.set(0); 
    }
  }, [onSwipe, dragX]);

  // Optimize click handler
  const handleCardClick = useCallback(() => {
    if (!expanded) setExpanded(true);
  }, [expanded, setExpanded]);

  return (
    <motion.div
      ref={cardRef}
      className="w-[380px] h-[520px] rounded-2xl shadow-lg overflow-hidden relative cursor-grab active:cursor-grabbing"
      style={{ 
        x: dragX, 
        rotate: rotateVal, 
        opacity, 
        scale,
        willChange: 'transform' // Performance optimization
      }}
      drag={!expanded ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onClick={handleCardClick}
      transition={{ type: "spring", stiffness: 400, damping: 40 }} // Improved spring settings
    >
      <div className="h-full">
        {cardContent}
      </div>
      
      {expanded && (
        <div className="absolute top-3 right-3 z-20">
          <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
            <Info className="w-4 h-4 mr-1" />
            Tap outside to close
          </Button>
        </div>
      )}
    </motion.div>
  );
});

const DraggableCardContainer = React.memo(({ items, userType, onSwipeEnd, onReset, onCollapse, onMatch }) => {
  // Keyboard navigation state
  const [keyboardActive, setKeyboardActive] = useState(true);

  const [stack, setStack] = useState(
    items.slice(0, 5).map(item => ({...item, matchPercentage: generateMatchPercentage() }))
  );
  const [expanded, setExpanded] = useState(false);
  const [interested, setInterested] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [lastDismissed, setLastDismissed] = useState(null);

  // Optimize motion values with better spring settings
  const topCardDragX = useMotionValue(0);
  const topCardSpringX = useSpring(topCardDragX, { stiffness: 400, damping: 50 });

  // Optimize transforms for swipe indicators
  const leftIconScale = useTransform(topCardDragX, [-150, 0], [1.5, 1]);
  const rightIconScale = useTransform(topCardDragX, [0, 150], [1, 1.5]);
  const leftIconOpacity = useTransform(topCardDragX, [-50, 0], [1, 0]);
  const rightIconOpacity = useTransform(topCardDragX, [0, 50], [0, 1]);

  // Memoize static motion value
  const staticMotionValue = useMemo(() => useMotionValue(0), []);

  // Optimize swipe handler with useCallback
  const handleSwipe = useCallback((direction) => {
    if (expanded || stack.length === 0) return;
    const dismissedItem = stack[stack.length - 1];
    setLastDismissed({ item: dismissedItem, direction });

    if (direction === 'right') {
      toast({ title: "Interested!", description: `You liked ${dismissedItem.name || dismissedItem.title}`, variant: "default" });
      if (Math.random() < 0.33) {
        setInterested(prev => [...prev, dismissedItem]);
        if (onMatch) onMatch(dismissedItem);
      }
    } else {
      setRejected(prev => [...prev, dismissedItem]);
      toast({ title: "Passed", description: `You passed on ${dismissedItem.name || dismissedItem.title}`, variant: "destructive" });
    }
    
    setStack(prev => {
      const newStack = prev.slice(0, -1);
      const nextItemIndex = items.findIndex(item => !newStack.find(s => s.id === item.id) && !interested.find(i => i.id === item.id) && !rejected.find(r => r.id === item.id) && item.id !== dismissedItem.id);
      if (newStack.length < 5 && nextItemIndex !== -1 && (items.length - (interested.length + rejected.length + 1)) > newStack.length) {
          const newItem = items[items.length - 1 - (interested.length + rejected.length)]; 
          if (newItem && !newStack.find(s => s.id === newItem.id)) { 
            return [{...newItem, matchPercentage: generateMatchPercentage()}, ...newStack];
          }
      }
      return newStack;
    });
    topCardDragX.set(0); 
  }, [expanded, stack, items, interested, rejected, onMatch, topCardDragX]);

  // Optimize reset handler
  const handleResetStack = useCallback(() => {
    setStack(items.slice(0, 5).map(item => ({...item, matchPercentage: generateMatchPercentage() })));
    setInterested([]);
    setRejected([]);
    setLastDismissed(null);
    setExpanded(false);
    topCardDragX.set(0);
    toast({ title: "Stack Reset!", description: "All cards are back." });
    if(onReset) onReset();
  }, [items, topCardDragX, onReset]);

  // Optimize event handlers
  const handleCardAreaClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleBackdropClick = useCallback(() => {
    if (expanded) {
      setExpanded(false);
    }
  }, [expanded]);

  const handleCollapseClick = useCallback((e) => {
    e.stopPropagation();
    onCollapse();
  }, [onCollapse]);

  const handleResetClick = useCallback((e) => {
    e.stopPropagation();
    handleResetStack();
  }, [handleResetStack]);

  // Check for completion
  useEffect(() => {
    if (stack.length === 0 && (interested.length + rejected.length === items.length)) {
      if(onSwipeEnd) onSwipeEnd({ interested, rejected });
    }
  }, [stack.length, interested.length, rejected.length, items.length, onSwipeEnd]);

  // Keyboard navigation for swiping  
  useEffect(() => {
    if (!keyboardActive || expanded || stack.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('left');
        toast({ title: 'Passed (Keyboard)', description: 'You passed using the left arrow key.', variant: 'destructive' });
      } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
        toast({ title: 'Interested (Keyboard)', description: 'You liked using the right arrow key.', variant: 'default' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardActive, expanded, stack.length, handleSwipe]);

  // Memoize card rotation values to prevent recalculation
  const cardRotations = useMemo(() => {
    return stack.map((_, index) => (Math.random() - 0.5) * 10 - (index * 2));
  }, [stack.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative pt-16" onClick={handleBackdropClick}>
      {/* Back button */}
      <div className="absolute top-4 left-4 z-30">
        <Button variant="outline" size="icon" onClick={handleCollapseClick} className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-md hover:shadow-lg">
          <ArrowLeft size={20} />
        </Button>
      </div>
      
      {/* Cards container - centered with fixed dimensions and moved down */}
      <div className="relative w-[380px] h-[520px] flex items-center justify-center" onClick={handleCardAreaClick}>
        <AnimatePresence>
          {stack.map((item, index) => {
            const isTopCard = index === stack.length - 1;
            return (
              <motion.div
                key={item.id || item.title} 
                style={{
                  position: 'absolute',
                  zIndex: index,
                  willChange: 'transform', // Performance optimization
                }}
                initial={{ opacity: 0, scale: 0.9, y: index * -8, rotate: cardRotations[index] || 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1 - (stack.length - 1 - index) * 0.02, // Reduced scale difference for smoothness
                  y: index * -6, // Reduced offset for better stacking
                  rotate: (isTopCard && !expanded) ? 0 : (cardRotations[index] || 0)
                }}
                exit={{ 
                  x: topCardDragX.get() > 0 ? 300 : -300, 
                  opacity: 0, 
                  scale: 0.9, 
                  transition: { duration: 0.25, ease: "easeOut" } // Faster exit animation
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }} // Optimized spring
              >
                <DraggableCardBody 
                  item={item} 
                  userType={userType} 
                  expanded={isTopCard && expanded} 
                  setExpanded={isTopCard ? setExpanded : () => {}}
                  onSwipe={handleSwipe} 
                  dragX={isTopCard ? topCardSpringX : staticMotionValue} 
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Swipe direction indicators */}
        {stack.length > 0 && !expanded && (
          <>
            <motion.div 
              style={{ 
                scale: leftIconScale, 
                opacity: leftIconOpacity,
                willChange: 'transform' // Performance optimization
              }} 
              className="absolute left-[-80px] top-1/2 -translate-y-1/2 p-4 bg-red-500 rounded-full shadow-lg"
            >
              <X size={32} className="text-white" />
            </motion.div>
            <motion.div 
              style={{ 
                scale: rightIconScale, 
                opacity: rightIconOpacity,
                willChange: 'transform' // Performance optimization
              }} 
              className="absolute right-[-80px] top-1/2 -translate-y-1/2 p-4 bg-green-500 rounded-full shadow-lg"
            >
              <Heart size={32} className="text-white" />
            </motion.div>
          </>
        )}
      </div>

      {/* Stack completion state */}
      {stack.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <Card className="p-8 text-center max-w-md mx-4 bg-white/10 border-white/20 text-white backdrop-blur-sm" onClick={handleCardAreaClick}>
            <CheckCircle size={64} className="mx-auto text-white mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">All Done!</h3>
            <p className="text-white/80 mb-1">Interested: {interested.length}</p>
            <p className="text-white/80 mb-4">Passed: {rejected.length}</p>
            <Button onClick={handleResetClick} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              <RefreshCw size={18} className="mr-2" /> 
              Reset Stack
            </Button>
          </Card>
        </div>
      )}

      {/* Reset button */}
      <div className="absolute bottom-4 right-4 z-30">
        <Button variant="outline" size="icon" onClick={handleResetClick} className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-md hover:shadow-lg">
          <RefreshCw size={20} />
        </Button>
      </div>

      {/* Status info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-center">
        <Card className="px-4 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
          <p className="text-xs text-white/90">Interested: {interested.length} | Passed: {rejected.length} | Remaining: {items.length - (interested.length + rejected.length)}</p>
          <p className="text-xs text-white/70 mt-1">Tap to expand • Drag to decide • Arrow keys work too</p>
        </Card>
      </div>
    </div>
  );
});


const SwipeApp = React.memo(({ onCollapse, userType, contentType, candidateProfiles = [], jobListings = [], onMatch }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Memoize items to prevent unnecessary recalculations
  const itemsToSwipe = useMemo(() => 
    (contentType === 'jobs' ? jobListings : candidateProfiles).map(item => ({
      ...item,
      matchPercentage: generateMatchPercentage() 
    })), 
  [contentType, jobListings, candidateProfiles]);

  // Optimize match handler
  const handleMatch = useCallback((item) => {
    setShowConfetti(true);
    toast({
      title: "🎉 It's a Match!",
      description: `You matched with ${item.name || item.title}!`,
      variant: "default",
    });
    if (onMatch) onMatch(item);
  }, [onMatch]);

  // Optimize swipe end handler
  const handleSwipeEnd = useCallback((stats) => {
    toast({
      title: "Swiping Complete!",
      description: `You showed interest in ${stats.interested.length} and passed on ${stats.rejected.length}.`,
    });
  }, []);

  // Optimize confetti completion handler
  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 25 }}
      className="fixed inset-0 z-40"
      style={{ willChange: 'transform' }} // Performance optimization
    >
      <HubBackground userType={userType}>
        <ConfettiEffect 
          show={showConfetti} 
          onComplete={handleConfettiComplete} 
        />
        <div className="w-full h-full">
          <DraggableCardContainer
            items={itemsToSwipe}
            userType={userType}
            onSwipeEnd={handleSwipeEnd}
            onCollapse={onCollapse}
            onMatch={handleMatch}
          />
        </div>
      </HubBackground>
    </motion.div>
  );
});

export default SwipeApp;