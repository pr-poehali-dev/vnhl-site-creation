export const useIndexHandlers = (
  draggedIndex: number | null,
  setDraggedIndex: (index: number | null) => void,
  easternTeams: any[],
  setEasternTeams: (teams: any[]) => void,
  westernTeams: any[],
  setWesternTeams: (teams: any[]) => void,
  isAdmin: boolean,
  siteTitle: string,
  siteSubtitle: string,
  siteIcon: string,
  customIconUrl: string,
  iconType: 'lucide' | 'custom',
  setTempTitle: (value: string) => void,
  setTempSubtitle: (value: string) => void,
  setTempIcon: (value: string) => void,
  setTempCustomIconUrl: (value: string) => void,
  setTempIconType: (value: 'lucide' | 'custom') => void,
  setIsEditDialogOpen: (open: boolean) => void,
  setSiteTitle: (value: string) => void,
  setSiteSubtitle: (value: string) => void,
  setSiteIcon: (value: string) => void,
  setCustomIconUrl: (value: string) => void,
  setIconType: (value: 'lucide' | 'custom') => void
) => {
  const handleDragStart = (index: number) => {
    if (!isAdmin) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number, conference: 'eastern' | 'western') => {
    if (!isAdmin || draggedIndex === null) return;

    const teams = conference === 'eastern' ? [...easternTeams] : [...westernTeams];
    const [draggedTeam] = teams.splice(draggedIndex, 1);
    teams.splice(dropIndex, 0, draggedTeam);

    const updatedTeams = teams.map((team, idx) => ({
      ...team,
      pos: idx + 1,
    }));

    if (conference === 'eastern') {
      setEasternTeams(updatedTeams);
      localStorage.setItem('easternTeams', JSON.stringify(updatedTeams));
    } else {
      setWesternTeams(updatedTeams);
      localStorage.setItem('westernTeams', JSON.stringify(updatedTeams));
    }

    setDraggedIndex(null);
  };

  const handleEditSite = () => {
    setTempTitle(siteTitle);
    setTempSubtitle(siteSubtitle);
    setTempIcon(siteIcon);
    setTempCustomIconUrl(customIconUrl);
    setTempIconType(iconType);
    setIsEditDialogOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempCustomIconUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSiteSettings = () => {
    setSiteTitle((prev) => {
      const newValue = prev !== siteTitle ? siteTitle : prev;
      localStorage.setItem('siteTitle', newValue);
      return newValue;
    });
    setSiteSubtitle((prev) => {
      const newValue = prev !== siteSubtitle ? siteSubtitle : prev;
      localStorage.setItem('siteSubtitle', newValue);
      return newValue;
    });
    setSiteIcon((prev) => {
      const newValue = prev !== siteIcon ? siteIcon : prev;
      localStorage.setItem('siteIcon', newValue);
      return newValue;
    });
    setCustomIconUrl((prev) => {
      const newValue = prev !== customIconUrl ? customIconUrl : prev;
      localStorage.setItem('customIconUrl', newValue);
      return newValue;
    });
    setIconType((prev) => {
      const newValue = prev !== iconType ? iconType : prev;
      localStorage.setItem('iconType', newValue);
      return newValue;
    });
    setIsEditDialogOpen(false);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleEditSite,
    handleFileUpload,
    handleSaveSiteSettings,
  };
};
