import { useState, useEffect } from 'react';
import {
  defaultEasternTeams,
  defaultWesternTeams,
  defaultUpcomingGames,
  defaultPlayoffBracket,
  defaultRules,
  defaultCaptains,
  defaultCaptainsEmptyMessage,
  defaultScheduleEmptyMessage,
  defaultRulesEmptyMessage,
} from '@/components/vnhl/defaultData';

export const useIndexState = () => {
  const [activeTab, setActiveTab] = useState('standings');
  const [easternTeams, setEasternTeams] = useState(defaultEasternTeams);
  const [westernTeams, setWesternTeams] = useState(defaultWesternTeams);
  const [upcomingGames, setUpcomingGames] = useState(defaultUpcomingGames);
  const [playoffBracket, setPlayoffBracket] = useState(defaultPlayoffBracket);
  const [rules, setRules] = useState(defaultRules);
  const [captains, setCaptains] = useState(defaultCaptains);
  const [captainsEmptyMessage, setCaptainsEmptyMessage] = useState(defaultCaptainsEmptyMessage);
  const [scheduleEmptyMessage, setScheduleEmptyMessage] = useState(defaultScheduleEmptyMessage);
  const [rulesEmptyMessage, setRulesEmptyMessage] = useState(defaultRulesEmptyMessage);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [siteTitle, setSiteTitle] = useState('VNHL');
  const [siteSubtitle, setSiteSubtitle] = useState('Виртуальная Национальная Хоккейная Лига');
  const [siteIcon, setSiteIcon] = useState('Trophy');
  const [customIconUrl, setCustomIconUrl] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [tempSubtitle, setTempSubtitle] = useState('');
  const [tempIcon, setTempIcon] = useState('');
  const [tempCustomIconUrl, setTempCustomIconUrl] = useState('');
  const [iconType, setIconType] = useState<'lucide' | 'custom'>('lucide');
  const [tempIconType, setTempIconType] = useState<'lucide' | 'custom'>('lucide');

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const savedEastern = localStorage.getItem('easternTeams');
      const savedWestern = localStorage.getItem('westernTeams');
      const savedGames = localStorage.getItem('upcomingGames');
      const savedPlayoff = localStorage.getItem('playoffBracket');
      const savedRules = localStorage.getItem('rules');
      const savedCaptains = localStorage.getItem('captains');
      const savedCaptainsEmptyMessage = localStorage.getItem('captainsEmptyMessage');
      const savedScheduleEmptyMessage = localStorage.getItem('scheduleEmptyMessage');
      const savedRulesEmptyMessage = localStorage.getItem('rulesEmptyMessage');
      const savedSiteTitle = localStorage.getItem('siteTitle');
      const savedSiteSubtitle = localStorage.getItem('siteSubtitle');
      const savedSiteIcon = localStorage.getItem('siteIcon');
      const savedCustomIconUrl = localStorage.getItem('customIconUrl');
      const savedIconType = localStorage.getItem('iconType');
      const adminAuth = sessionStorage.getItem('adminAuth');

      if (savedEastern) setEasternTeams(JSON.parse(savedEastern));
      if (savedWestern) setWesternTeams(JSON.parse(savedWestern));
      if (savedGames) setUpcomingGames(JSON.parse(savedGames));
      if (savedPlayoff) setPlayoffBracket(JSON.parse(savedPlayoff));
      if (savedRules) setRules(JSON.parse(savedRules));
      if (savedCaptains) setCaptains(JSON.parse(savedCaptains));
      if (savedCaptainsEmptyMessage) setCaptainsEmptyMessage(JSON.parse(savedCaptainsEmptyMessage));
      if (savedScheduleEmptyMessage) setScheduleEmptyMessage(JSON.parse(savedScheduleEmptyMessage));
      if (savedRulesEmptyMessage) setRulesEmptyMessage(JSON.parse(savedRulesEmptyMessage));
      if (savedSiteTitle) setSiteTitle(savedSiteTitle);
      if (savedSiteSubtitle) setSiteSubtitle(savedSiteSubtitle);
      if (savedSiteIcon) setSiteIcon(savedSiteIcon);
      if (savedCustomIconUrl) setCustomIconUrl(savedCustomIconUrl);
      if (savedIconType) setIconType(savedIconType as 'lucide' | 'custom');
      if (adminAuth === 'true') setIsAdmin(true);
    };

    loadFromLocalStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'easternTeams' && e.newValue) {
        setEasternTeams(JSON.parse(e.newValue));
      } else if (e.key === 'westernTeams' && e.newValue) {
        setWesternTeams(JSON.parse(e.newValue));
      } else if (e.key === 'upcomingGames' && e.newValue) {
        setUpcomingGames(JSON.parse(e.newValue));
      } else if (e.key === 'playoffBracket' && e.newValue) {
        setPlayoffBracket(JSON.parse(e.newValue));
      } else if (e.key === 'rules' && e.newValue) {
        setRules(JSON.parse(e.newValue));
      } else if (e.key === 'captains' && e.newValue) {
        setCaptains(JSON.parse(e.newValue));
      } else if (e.key === 'captainsEmptyMessage' && e.newValue) {
        setCaptainsEmptyMessage(JSON.parse(e.newValue));
      } else if (e.key === 'scheduleEmptyMessage' && e.newValue) {
        setScheduleEmptyMessage(JSON.parse(e.newValue));
      } else if (e.key === 'rulesEmptyMessage' && e.newValue) {
        setRulesEmptyMessage(JSON.parse(e.newValue));
      } else if (e.key === 'siteTitle' && e.newValue) {
        setSiteTitle(e.newValue);
      } else if (e.key === 'siteSubtitle' && e.newValue) {
        setSiteSubtitle(e.newValue);
      } else if (e.key === 'siteIcon' && e.newValue) {
        setSiteIcon(e.newValue);
      } else if (e.key === 'customIconUrl' && e.newValue) {
        setCustomIconUrl(e.newValue);
      } else if (e.key === 'iconType' && e.newValue) {
        setIconType(e.newValue as 'lucide' | 'custom');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    activeTab,
    setActiveTab,
    easternTeams,
    setEasternTeams,
    westernTeams,
    setWesternTeams,
    upcomingGames,
    playoffBracket,
    rules,
    captains,
    captainsEmptyMessage,
    scheduleEmptyMessage,
    rulesEmptyMessage,
    draggedIndex,
    setDraggedIndex,
    isAdmin,
    siteTitle,
    setSiteTitle,
    siteSubtitle,
    setSiteSubtitle,
    siteIcon,
    setSiteIcon,
    customIconUrl,
    setCustomIconUrl,
    isEditDialogOpen,
    setIsEditDialogOpen,
    tempTitle,
    setTempTitle,
    tempSubtitle,
    setTempSubtitle,
    tempIcon,
    setTempIcon,
    tempCustomIconUrl,
    setTempCustomIconUrl,
    iconType,
    setIconType,
    tempIconType,
    setTempIconType,
  };
};
