import SiteHeader from '@/components/index/SiteHeader';
import TabsNavigation from '@/components/index/TabsNavigation';
import { useIndexState } from '@/hooks/useIndexState';
import { useIndexHandlers } from '@/hooks/useIndexHandlers';

const Index = () => {
  const {
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
  } = useIndexState();

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleEditSite,
    handleFileUpload,
    handleSaveSiteSettings,
  } = useIndexHandlers(
    draggedIndex,
    setDraggedIndex,
    easternTeams,
    setEasternTeams,
    westernTeams,
    setWesternTeams,
    isAdmin,
    siteTitle,
    siteSubtitle,
    siteIcon,
    customIconUrl,
    iconType,
    setTempTitle,
    setTempSubtitle,
    setTempIcon,
    setTempCustomIconUrl,
    setTempIconType,
    setIsEditDialogOpen,
    setSiteTitle,
    setSiteSubtitle,
    setSiteIcon,
    setCustomIconUrl,
    setIconType
  );

  const allTeams = [...easternTeams, ...westernTeams].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        siteTitle={siteTitle}
        siteSubtitle={siteSubtitle}
        siteIcon={siteIcon}
        customIconUrl={customIconUrl}
        iconType={iconType}
        isAdmin={isAdmin}
        isEditDialogOpen={isEditDialogOpen}
        tempTitle={tempTitle}
        tempSubtitle={tempSubtitle}
        tempIcon={tempIcon}
        tempCustomIconUrl={tempCustomIconUrl}
        tempIconType={tempIconType}
        onEditSite={handleEditSite}
        onSaveSiteSettings={handleSaveSiteSettings}
        onCloseEditDialog={() => setIsEditDialogOpen(false)}
        onTempTitleChange={setTempTitle}
        onTempSubtitleChange={setTempSubtitle}
        onTempIconChange={setTempIcon}
        onTempIconTypeChange={setTempIconType}
        onFileUpload={handleFileUpload}
      />
      <TabsNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        easternTeams={easternTeams}
        westernTeams={westernTeams}
        allTeams={allTeams}
        upcomingGames={upcomingGames}
        playoffBracket={playoffBracket}
        rules={rules}
        captains={captains}
        captainsEmptyMessage={captainsEmptyMessage}
        scheduleEmptyMessage={scheduleEmptyMessage}
        rulesEmptyMessage={rulesEmptyMessage}
        isAdmin={isAdmin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default Index;
