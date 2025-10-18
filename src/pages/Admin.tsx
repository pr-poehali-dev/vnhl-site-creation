import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TeamEditor from '@/components/admin/TeamEditor';
import GamesEditor from '@/components/admin/GamesEditor';
import PlayoffEditor from '@/components/admin/PlayoffEditor';
import RulesEditor from '@/components/admin/RulesEditor';
import { defaultEasternTeams, defaultWesternTeams, defaultUpcomingGames, defaultPlayoffBracket, defaultRules, defaultCaptains, defaultCaptainsEmptyMessage, defaultScheduleEmptyMessage, defaultRulesEmptyMessage } from '@/components/vnhl/defaultData';
import CaptainsEditor from '@/components/admin/CaptainsEditor';

const ADMIN_PASSWORD = '55935589k';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('teams');

  const [easternTeams, setEasternTeams] = useState(() => {
    const saved = localStorage.getItem('easternTeams');
    return saved ? JSON.parse(saved) : defaultEasternTeams;
  });

  const [westernTeams, setWesternTeams] = useState(() => {
    const saved = localStorage.getItem('westernTeams');
    return saved ? JSON.parse(saved) : defaultWesternTeams;
  });

  const [upcomingGames, setUpcomingGames] = useState(() => {
    const saved = localStorage.getItem('upcomingGames');
    return saved ? JSON.parse(saved) : defaultUpcomingGames;
  });

  const [playoffBracket, setPlayoffBracket] = useState(() => {
    const saved = localStorage.getItem('playoffBracket');
    return saved ? JSON.parse(saved) : defaultPlayoffBracket;
  });

  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem('rules');
    return saved ? JSON.parse(saved) : defaultRules;
  });

  const [captains, setCaptains] = useState(() => {
    const saved = localStorage.getItem('captains');
    return saved ? JSON.parse(saved) : defaultCaptains;
  });

  const [captainsEmptyMessage, setCaptainsEmptyMessage] = useState(() => {
    const saved = localStorage.getItem('captainsEmptyMessage');
    return saved ? JSON.parse(saved) : defaultCaptainsEmptyMessage;
  });

  const [scheduleEmptyMessage, setScheduleEmptyMessage] = useState(() => {
    const saved = localStorage.getItem('scheduleEmptyMessage');
    return saved ? JSON.parse(saved) : defaultScheduleEmptyMessage;
  });

  const [rulesEmptyMessage, setRulesEmptyMessage] = useState(() => {
    const saved = localStorage.getItem('rulesEmptyMessage');
    return saved ? JSON.parse(saved) : defaultRulesEmptyMessage;
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('easternTeams', JSON.stringify(easternTeams));
  }, [easternTeams]);

  useEffect(() => {
    localStorage.setItem('westernTeams', JSON.stringify(westernTeams));
  }, [westernTeams]);

  useEffect(() => {
    localStorage.setItem('upcomingGames', JSON.stringify(upcomingGames));
  }, [upcomingGames]);

  useEffect(() => {
    localStorage.setItem('playoffBracket', JSON.stringify(playoffBracket));
  }, [playoffBracket]);

  useEffect(() => {
    localStorage.setItem('rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('captains', JSON.stringify(captains));
  }, [captains]);

  useEffect(() => {
    localStorage.setItem('captainsEmptyMessage', JSON.stringify(captainsEmptyMessage));
  }, [captainsEmptyMessage]);

  useEffect(() => {
    localStorage.setItem('scheduleEmptyMessage', JSON.stringify(scheduleEmptyMessage));
  }, [scheduleEmptyMessage]);

  useEffect(() => {
    localStorage.setItem('rulesEmptyMessage', JSON.stringify(rulesEmptyMessage));
  }, [rulesEmptyMessage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      toast.success('Успешный вход в админ-панель');
    } else {
      toast.error('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
    toast.success('Выход выполнен');
  };

  const updateTeam = (conference: 'eastern' | 'western', index: number, updatedTeam: any) => {
    if (conference === 'eastern') {
      const updated = [...easternTeams];
      updated[index] = updatedTeam;
      setEasternTeams(updated);
    } else {
      const updated = [...westernTeams];
      updated[index] = updatedTeam;
      setWesternTeams(updated);
    }
    toast.success('Команда обновлена');
  };

  const deleteTeam = (conference: 'eastern' | 'western', index: number) => {
    if (conference === 'eastern') {
      setEasternTeams(easternTeams.filter((_, i) => i !== index));
    } else {
      setWesternTeams(westernTeams.filter((_, i) => i !== index));
    }
    toast.success('Команда удалена');
  };

  const addTeam = (conference: 'eastern' | 'western', team: any) => {
    if (conference === 'eastern') {
      setEasternTeams([...easternTeams, team]);
    } else {
      setWesternTeams([...westernTeams, team]);
    }
  };

  const updateGame = (index: number, updatedGame: any) => {
    const updated = [...upcomingGames];
    updated[index] = updatedGame;
    setUpcomingGames(updated);
    toast.success('Матч обновлён');
  };

  const deleteGame = (index: number) => {
    setUpcomingGames(upcomingGames.filter((_, i) => i !== index));
    toast.success('Матч удалён');
  };

  const addGame = (game: any) => {
    setUpcomingGames([...upcomingGames, game]);
  };

  const updatePlayoff = (bracket: any) => {
    setPlayoffBracket(bracket);
    toast.success('Сетка плей-офф обновлена');
  };

  const updateRule = (index: number, updatedRule: any) => {
    const updated = [...rules];
    updated[index] = updatedRule;
    setRules(updated);
    toast.success('Правило обновлено');
  };

  const deleteRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
    toast.success('Правило удалено');
  };

  const addRule = (rule: any) => {
    setRules([...rules, rule]);
  };

  const updateCaptain = (index: number, updatedCaptain: any) => {
    const updated = [...captains];
    updated[index] = updatedCaptain;
    setCaptains(updated);
    toast.success('Капитан обновлён');
  };

  const deleteCaptain = (index: number) => {
    setCaptains(captains.filter((_, i) => i !== index));
    toast.success('Капитан удалён');
  };

  const addCaptain = (captain: any) => {
    setCaptains([...captains, captain]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lock" size={24} className="text-primary" />
              Вход в админ-панель
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                />
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                На главную
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Settings" size={40} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold">Админ-панель</h1>
                <p className="text-sm text-muted-foreground">Управление данными VNHL</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (confirm('Сбросить все данные к значениям по умолчанию?')) {
                    localStorage.clear();
                    setEasternTeams(defaultEasternTeams);
                    setWesternTeams(defaultWesternTeams);
                    setUpcomingGames(defaultUpcomingGames);
                    setPlayoffBracket(defaultPlayoffBracket);
                    setRules(defaultRules);
                    setCaptains(defaultCaptains);
                    setCaptainsEmptyMessage(defaultCaptainsEmptyMessage);
                    setScheduleEmptyMessage(defaultScheduleEmptyMessage);
                    setRulesEmptyMessage(defaultRulesEmptyMessage);
                    toast.success('Данные сброшены');
                  }
                }}
              >
                <Icon name="RotateCcw" size={18} className="mr-2" />
                Сбросить данные
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="teams" className="gap-2">
              <Icon name="Users" size={18} />
              Команды
            </TabsTrigger>
            <TabsTrigger value="games" className="gap-2">
              <Icon name="Calendar" size={18} />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="playoff" className="gap-2">
              <Icon name="Zap" size={18} />
              Плей-офф
            </TabsTrigger>
            <TabsTrigger value="captains" className="gap-2">
              <Icon name="Shield" size={18} />
              Кэпы
            </TabsTrigger>
            <TabsTrigger value="rules" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <TeamEditor
              easternTeams={easternTeams}
              westernTeams={westernTeams}
              onUpdateTeam={updateTeam}
              onDeleteTeam={deleteTeam}
              onAddTeam={addTeam}
            />
          </TabsContent>

          <TabsContent value="games">
            <GamesEditor
              upcomingGames={upcomingGames}
              onUpdateGame={updateGame}
              onDeleteGame={deleteGame}
              onAddGame={addGame}
            />
          </TabsContent>

          <TabsContent value="playoff">
            <PlayoffEditor
              playoffBracket={playoffBracket}
              onUpdatePlayoff={updatePlayoff}
            />
          </TabsContent>

          <TabsContent value="captains">
            <CaptainsEditor
              captains={captains}
              onUpdateCaptain={updateCaptain}
              onDeleteCaptain={deleteCaptain}
              onAddCaptain={addCaptain}
            />
          </TabsContent>

          <TabsContent value="rules">
            <RulesEditor
              rules={rules}
              onUpdateRule={updateRule}
              onDeleteRule={deleteRule}
              onAddRule={addRule}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;