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
import { hashPassword, checkRateLimit, recordLoginAttempt, validateSession, setSecureSession, clearSecureSession, sanitizeInput } from '@/utils/security';

const ADMIN_PASSWORD_HASH = 'c27d44b5f50e3661a8d276c4e1860676a3c47a0252fadc394f6fc66e9eadad03';

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
    if (validateSession()) {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedPassword = sanitizeInput(password);
    
    const rateLimit = checkRateLimit('admin_login');
    if (!rateLimit.allowed) {
      toast.error(`Слишком много попыток входа. Попробуйте через ${rateLimit.lockoutTime} минут`);
      return;
    }
    
    const passwordHash = await hashPassword(sanitizedPassword);
    const isValid = passwordHash === ADMIN_PASSWORD_HASH;
    
    recordLoginAttempt('admin_login', isValid);
    
    if (isValid) {
      setIsAuthenticated(true);
      setSecureSession();
      toast.success('Успешный вход в админ-панель');
    } else {
      const remaining = rateLimit.remainingAttempts - 1;
      if (remaining > 0) {
        toast.error(`Неверный пароль. Осталось попыток: ${remaining}`);
      } else {
        toast.error('Неверный пароль. Аккаунт заблокирован на 15 минут');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearSecureSession();
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
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Icon name="Settings" size={32} className="text-primary md:w-10 md:h-10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-4xl font-bold truncate">Админ-панель</h1>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Управление данными VNHL</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline"
                className="flex-1 sm:flex-none gap-1 md:gap-2 text-xs md:text-sm"
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
                <Icon name="RotateCcw" size={16} className="md:w-[18px] md:h-[18px]" />
                Сбросить данные
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="flex-1 sm:flex-none gap-1 md:gap-2 text-xs md:text-sm">
                <Icon name="Home" size={16} className="md:w-[18px] md:h-[18px]" />
                На главную
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="flex-1 sm:flex-none gap-1 md:gap-2 text-xs md:text-sm">
                <Icon name="LogOut" size={16} className="md:w-[18px] md:h-[18px]" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="teams" className="gap-1 md:gap-2 flex-col md:flex-row py-2 md:py-3 text-xs md:text-sm">
              <Icon name="Users" size={16} className="md:w-[18px] md:h-[18px]" />
              <span>Команды</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="gap-1 md:gap-2 flex-col md:flex-row py-2 md:py-3 text-xs md:text-sm">
              <Icon name="Calendar" size={16} className="md:w-[18px] md:h-[18px]" />
              <span>Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="playoff" className="gap-1 md:gap-2 flex-col md:flex-row py-2 md:py-3 text-xs md:text-sm">
              <Icon name="Zap" size={16} className="md:w-[18px] md:h-[18px]" />
              <span>Плей-офф</span>
            </TabsTrigger>
            <TabsTrigger value="captains" className="gap-1 md:gap-2 flex-col md:flex-row py-2 md:py-3 text-xs md:text-sm">
              <Icon name="Shield" size={16} className="md:w-[18px] md:h-[18px]" />
              <span>Кэпы</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="gap-1 md:gap-2 flex-col md:flex-row py-2 md:py-3 text-xs md:text-sm">
              <Icon name="BookOpen" size={16} className="md:w-[18px] md:h-[18px]" />
              <span>Правила</span>
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