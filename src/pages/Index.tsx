import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
} from '@/components/vnhl/defaultData';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('standings');
  const [easternTeams, setEasternTeams] = useState(defaultEasternTeams);
  const [westernTeams, setWesternTeams] = useState(defaultWesternTeams);
  const [upcomingGames, setUpcomingGames] = useState(defaultUpcomingGames);
  const [playoffBracket, setPlayoffBracket] = useState(defaultPlayoffBracket);
  const [rules, setRules] = useState(defaultRules);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedEastern = localStorage.getItem('easternTeams');
    const savedWestern = localStorage.getItem('westernTeams');
    const savedGames = localStorage.getItem('upcomingGames');
    const savedPlayoff = localStorage.getItem('playoffBracket');
    const savedRules = localStorage.getItem('rules');
    const adminAuth = sessionStorage.getItem('adminAuth');

    if (savedEastern) setEasternTeams(JSON.parse(savedEastern));
    if (savedWestern) setWesternTeams(JSON.parse(savedWestern));
    if (savedGames) setUpcomingGames(JSON.parse(savedGames));
    if (savedPlayoff) setPlayoffBracket(JSON.parse(savedPlayoff));
    if (savedRules) setRules(JSON.parse(savedRules));
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Trophy" size={40} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold">VNHL</h1>
                <p className="text-sm text-muted-foreground">Виртуальная Национальная Хоккейная Лига</p>
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

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
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
            <TabsTrigger value="rules" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standings" className="space-y-6">
            <Tabs defaultValue="east" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="east">Восточная конференция</TabsTrigger>
                <TabsTrigger value="west">Западная конференция</TabsTrigger>
                <TabsTrigger value="all">Общая таблица</TabsTrigger>
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

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Globe" size={24} className="text-primary" />
                      Общая таблица VNHL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StandingsTable
                      teams={allTeams}
                      isAdmin={false}
                      onDragStart={() => {}}
                      onDragOver={() => {}}
                      onDrop={() => {}}
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
