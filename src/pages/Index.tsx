import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import StandingsTable from '@/components/vnhl/StandingsTable';
import PlayoffBracket from '@/components/vnhl/PlayoffBracket';
import Schedule from '@/components/vnhl/Schedule';
import Rules from '@/components/vnhl/Rules';
import {
  defaultEasternTeams,
  defaultWesternTeams,
  defaultUpcomingGames,
  defaultPlayoffBracket,
  defaultRules,
  defaultCaptains,
  defaultCaptainsEmptyMessage,
} from '@/components/vnhl/defaultData';
import Captains from '@/components/vnhl/Captains';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('standings');
  const [easternTeams, setEasternTeams] = useState(defaultEasternTeams);
  const [westernTeams, setWesternTeams] = useState(defaultWesternTeams);
  const [upcomingGames, setUpcomingGames] = useState(defaultUpcomingGames);
  const [playoffBracket, setPlayoffBracket] = useState(defaultPlayoffBracket);
  const [rules, setRules] = useState(defaultRules);
  const [captains, setCaptains] = useState(defaultCaptains);
  const [captainsEmptyMessage, setCaptainsEmptyMessage] = useState(defaultCaptainsEmptyMessage);
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
    const savedEastern = localStorage.getItem('easternTeams');
    const savedWestern = localStorage.getItem('westernTeams');
    const savedGames = localStorage.getItem('upcomingGames');
    const savedPlayoff = localStorage.getItem('playoffBracket');
    const savedRules = localStorage.getItem('rules');
    const savedCaptains = localStorage.getItem('captains');
    const savedCaptainsEmptyMessage = localStorage.getItem('captainsEmptyMessage');
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
    if (savedSiteTitle) setSiteTitle(savedSiteTitle);
    if (savedSiteSubtitle) setSiteSubtitle(savedSiteSubtitle);
    if (savedSiteIcon) setSiteIcon(savedSiteIcon);
    if (savedCustomIconUrl) setCustomIconUrl(savedCustomIconUrl);
    if (savedIconType) setIconType(savedIconType as 'lucide' | 'custom');
    if (adminAuth === 'true') setIsAdmin(true);
  }, []);

  const allTeams = [...easternTeams, ...westernTeams].sort((a, b) => b.points - a.points);

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
    setSiteTitle(tempTitle);
    setSiteSubtitle(tempSubtitle);
    setSiteIcon(tempIcon);
    setCustomIconUrl(tempCustomIconUrl);
    setIconType(tempIconType);
    localStorage.setItem('siteTitle', tempTitle);
    localStorage.setItem('siteSubtitle', tempSubtitle);
    localStorage.setItem('siteIcon', tempIcon);
    localStorage.setItem('customIconUrl', tempCustomIconUrl);
    localStorage.setItem('iconType', tempIconType);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {iconType === 'custom' && customIconUrl ? (
                <img src={customIconUrl} alt="Logo" className="w-10 h-10 object-contain" />
              ) : (
                <Icon name={siteIcon} size={40} className="text-primary" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold">{siteTitle}</h1>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditSite}
                      className="gap-1 h-8"
                    >
                      <Icon name="Pencil" size={14} />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{siteSubtitle}</p>
              </div>
            </div>
            {!isAdmin ? (
              <Button
                variant="outline"
                onClick={() => navigate('/admin')}
                className="gap-2"
              >
                <Icon name="Settings" size={18} />
                Админ-панель
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  className="gap-2"
                >
                  <Icon name="Settings" size={18} />
                  Админ-панель
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    sessionStorage.removeItem('adminAuth');
                    setIsAdmin(false);
                  }}
                  className="gap-2"
                >
                  <Icon name="LogOut" size={18} />
                  Выйти
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить название и иконку сайта</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название сайта</label>
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                placeholder="VNHL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Подзаголовок</label>
              <Input
                value={tempSubtitle}
                onChange={(e) => setTempSubtitle(e.target.value)}
                placeholder="Виртуальная Национальная Хоккейная Лига"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Тип иконки</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={tempIconType === 'lucide' ? 'default' : 'outline'}
                  onClick={() => setTempIconType('lucide')}
                  className="flex-1"
                >
                  Lucide иконка
                </Button>
                <Button
                  type="button"
                  variant={tempIconType === 'custom' ? 'default' : 'outline'}
                  onClick={() => setTempIconType('custom')}
                  className="flex-1"
                >
                  Своя иконка
                </Button>
              </div>
            </div>

            {tempIconType === 'lucide' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">Название иконки (lucide-react)</label>
                <div className="flex gap-2">
                  <Input
                    value={tempIcon}
                    onChange={(e) => setTempIcon(e.target.value)}
                    placeholder="Trophy"
                  />
                  <div className="flex items-center justify-center w-12 h-12 border rounded-lg">
                    <Icon name={tempIcon} size={24} className="text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Примеры: Trophy, Medal, Award, Flame, Zap, Star
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Загрузить с компьютера</label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    {tempCustomIconUrl && (
                      <div className="flex items-center justify-center w-12 h-12 border rounded-lg overflow-hidden bg-background">
                        <img src={tempCustomIconUrl} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Загрузите изображение (PNG, JPG, SVG)
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-popover px-2 text-muted-foreground">или</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">URL изображения</label>
                  <Input
                    value={tempCustomIconUrl}
                    onChange={(e) => setTempCustomIconUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-xs text-muted-foreground">
                    Или вставьте ссылку на изображение
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button onClick={handleSaveSiteSettings}>
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="standings" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Таблицы
            </TabsTrigger>
            <TabsTrigger value="playoff" className="gap-2">
              <Icon name="Zap" size={18} />
              Плей-офф
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Icon name="Calendar" size={18} />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="captains" className="gap-2">
              <Icon name="Users" size={18} />
              Кэпы
            </TabsTrigger>
            <TabsTrigger value="rules" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standings" className="space-y-6">
            <Tabs defaultValue="east" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="east">Восточная конференция</TabsTrigger>
                <TabsTrigger value="west">Западная конференция</TabsTrigger>
              </TabsList>

              <TabsContent value="east">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Compass" size={24} className="text-primary" />
                      Восточная конференция
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StandingsTable
                      teams={easternTeams}
                      isAdmin={isAdmin}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={(index) => handleDrop(index, 'eastern')}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="west">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Compass" size={24} className="text-secondary" />
                      Западная конференция
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StandingsTable
                      teams={westernTeams}
                      isAdmin={isAdmin}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={(index) => handleDrop(index, 'western')}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="playoff" className="space-y-6">
            <PlayoffBracket bracket={playoffBracket} />
          </TabsContent>

          <TabsContent value="schedule">
            <Schedule games={upcomingGames} />
          </TabsContent>

          <TabsContent value="captains">
            <Captains
              captains={captains}
              isAdmin={isAdmin}
              onUpdate={(updated) => {
                setCaptains(updated);
                localStorage.setItem('captains', JSON.stringify(updated));
              }}
              emptyMessage={captainsEmptyMessage}
              onUpdateEmptyMessage={(updated) => {
                setCaptainsEmptyMessage(updated);
                localStorage.setItem('captainsEmptyMessage', JSON.stringify(updated));
              }}
            />
          </TabsContent>

          <TabsContent value="rules">
            <Rules rules={rules} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 VNHL. Виртуальная Национальная Хоккейная Лига</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;