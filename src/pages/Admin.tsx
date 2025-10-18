import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const ADMIN_PASSWORD = '55935589k';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('teams');

  const [easternTeams, setEasternTeams] = useState(() => {
    const saved = localStorage.getItem('easternTeams');
    return saved ? JSON.parse(saved) : [
      { pos: 1, team: 'Boston Bruins', games: 28, wins: 20, losses: 6, otl: 2, points: 42, streak: 'W3' },
      { pos: 2, team: 'Toronto Maple Leafs', games: 27, wins: 18, losses: 7, otl: 2, points: 38, streak: 'W2' },
      { pos: 3, team: 'Tampa Bay Lightning', games: 28, wins: 17, losses: 9, otl: 2, points: 36, streak: 'L1' },
      { pos: 4, team: 'Florida Panthers', games: 27, wins: 16, losses: 9, otl: 2, points: 34, streak: 'W1' },
      { pos: 5, team: 'Buffalo Sabres', games: 28, wins: 15, losses: 10, otl: 3, points: 33, streak: 'OT1' },
      { pos: 6, team: 'Ottawa Senators', games: 27, wins: 14, losses: 11, otl: 2, points: 30, streak: 'L2' },
      { pos: 7, team: 'Montreal Canadiens', games: 28, wins: 12, losses: 13, otl: 3, points: 27, streak: 'W1' },
      { pos: 8, team: 'Detroit Red Wings', games: 27, wins: 10, losses: 15, otl: 2, points: 22, streak: 'L3' },
    ];
  });

  const [westernTeams, setWesternTeams] = useState(() => {
    const saved = localStorage.getItem('westernTeams');
    return saved ? JSON.parse(saved) : [
      { pos: 1, team: 'Vegas Golden Knights', games: 28, wins: 21, losses: 5, otl: 2, points: 44, streak: 'W5' },
      { pos: 2, team: 'Dallas Stars', games: 27, wins: 19, losses: 6, otl: 2, points: 40, streak: 'W2' },
      { pos: 3, team: 'Colorado Avalanche', games: 28, wins: 18, losses: 8, otl: 2, points: 38, streak: 'W3' },
      { pos: 4, team: 'Edmonton Oilers', games: 27, wins: 17, losses: 8, otl: 2, points: 36, streak: 'L1' },
      { pos: 5, team: 'Los Angeles Kings', games: 28, wins: 16, losses: 9, otl: 3, points: 35, streak: 'W1' },
      { pos: 6, team: 'Seattle Kraken', games: 27, wins: 14, losses: 11, otl: 2, points: 30, streak: 'OT1' },
      { pos: 7, team: 'Calgary Flames', games: 28, wins: 13, losses: 12, otl: 3, points: 29, streak: 'L1' },
      { pos: 8, team: 'Vancouver Canucks', games: 27, wins: 11, losses: 14, otl: 2, points: 24, streak: 'L2' },
    ];
  });

  const [upcomingGames, setUpcomingGames] = useState(() => {
    const saved = localStorage.getItem('upcomingGames');
    return saved ? JSON.parse(saved) : [
      { date: '19 окт', time: '19:00', home: 'Boston Bruins', away: 'Toronto Maple Leafs', status: 'Скоро' },
      { date: '19 окт', time: '21:30', home: 'Vegas Golden Knights', away: 'Dallas Stars', status: 'Скоро' },
      { date: '20 окт', time: '18:00', home: 'Tampa Bay Lightning', away: 'Florida Panthers', status: 'Завтра' },
      { date: '20 окт', time: '20:00', home: 'Colorado Avalanche', away: 'Edmonton Oilers', status: 'Завтра' },
      { date: '21 окт', time: '19:00', home: 'Buffalo Sabres', away: 'Ottawa Senators', status: '21 окт' },
      { date: '21 окт', time: '22:00', home: 'Los Angeles Kings', away: 'Seattle Kraken', status: '21 окт' },
    ];
  });

  const [playoffBracket, setPlayoffBracket] = useState(() => {
    const saved = localStorage.getItem('playoffBracket');
    return saved ? JSON.parse(saved) : {
      eastern: {
        round1: [
          { team1: 'Boston Bruins', team2: 'Detroit Red Wings', score1: 4, score2: 1 },
          { team1: 'Toronto Maple Leafs', team2: 'Montreal Canadiens', score1: 4, score2: 2 },
          { team1: 'Tampa Bay Lightning', team2: 'Ottawa Senators', score1: 4, score2: 3 },
          { team1: 'Florida Panthers', team2: 'Buffalo Sabres', score1: 3, score2: 4 },
        ],
        round2: [
          { team1: 'Boston Bruins', team2: 'Buffalo Sabres', score1: 2, score2: 1 },
          { team1: 'Toronto Maple Leafs', team2: 'Tampa Bay Lightning', score1: 1, score2: 1 },
        ],
      },
      western: {
        round1: [
          { team1: 'Vegas Golden Knights', team2: 'Vancouver Canucks', score1: 4, score2: 0 },
          { team1: 'Dallas Stars', team2: 'Calgary Flames', score1: 4, score2: 2 },
          { team1: 'Colorado Avalanche', team2: 'Seattle Kraken', score1: 3, score2: 4 },
          { team1: 'Edmonton Oilers', team2: 'Los Angeles Kings', score1: 4, score2: 3 },
        ],
        round2: [
          { team1: 'Vegas Golden Knights', team2: 'Edmonton Oilers', score1: 1, score2: 2 },
          { team1: 'Dallas Stars', team2: 'Seattle Kraken', score1: 2, score2: 0 },
        ],
      },
    };
  });

  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem('rules');
    return saved ? JSON.parse(saved) : [
      {
        title: 'Формат игры',
        content: 'Матчи проводятся в формате 3 периода по 20 минут. При ничейном результате назначается овертайм 5 минут (3 на 3), затем буллиты.',
      },
      {
        title: 'Система очков',
        content: 'Победа в основное время - 2 очка, победа в овертайме/буллитах - 2 очка, поражение в овертайме/буллитах - 1 очко, поражение в основное время - 0 очков.',
      },
      {
        title: 'Регулярный сезон',
        content: 'Каждая команда проводит 56 матчей в регулярном сезоне. 8 лучших команд из каждой конференции выходят в плей-офф.',
      },
      {
        title: 'Плей-офф',
        content: 'Серии до 4 побед (best-of-7). Формат: 1 vs 8, 2 vs 7, 3 vs 6, 4 vs 5. Победители конференций встречаются в финале.',
      },
      {
        title: 'Штрафы',
        content: 'Малые штрафы - 2 минуты, большие - 5 минут + удаление до конца игры. Матч-штраф - немедленное удаление + дисквалификация.',
      },
      {
        title: 'Составы',
        content: 'Максимум 23 игрока в заявке: 20 полевых + 3 вратаря. На лёд - максимум 6 игроков (включая вратаря).',
      },
    ];
  });

  const [editTeam, setEditTeam] = useState<any>(null);
  const [editGame, setEditGame] = useState<any>(null);
  const [editRule, setEditRule] = useState<any>(null);

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

  const addTeam = (conference: 'eastern' | 'western') => {
    const newTeam = {
      pos: conference === 'eastern' ? easternTeams.length + 1 : westernTeams.length + 1,
      team: 'Новая команда',
      games: 0,
      wins: 0,
      losses: 0,
      otl: 0,
      points: 0,
      streak: 'W0',
    };
    if (conference === 'eastern') {
      setEasternTeams([...easternTeams, newTeam]);
    } else {
      setWesternTeams([...westernTeams, newTeam]);
    }
    toast.success('Команда добавлена');
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

  const addGame = () => {
    setUpcomingGames([
      ...upcomingGames,
      { date: '', time: '', home: '', away: '', status: 'Скоро' },
    ]);
    toast.success('Матч добавлен');
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

  const addRule = () => {
    setRules([...rules, { title: 'Новое правило', content: '' }]);
    toast.success('Правило добавлено');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Lock" size={28} className="text-primary" />
              Вход в админ-панель VNHL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  На главную
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Админ-панель VNHL</h1>
                <p className="text-sm text-muted-foreground">Управление контентом сайта</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Icon name="Home" size={18} className="mr-2" />
                На сайт
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="teams">Команды</TabsTrigger>
            <TabsTrigger value="schedule">Календарь</TabsTrigger>
            <TabsTrigger value="playoff">Плей-офф</TabsTrigger>
            <TabsTrigger value="rules">Правила</TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Восточная конференция</CardTitle>
                  <Button onClick={() => addTeam('eastern')}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить команду
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Команда</TableHead>
                      <TableHead>И</TableHead>
                      <TableHead>В</TableHead>
                      <TableHead>П</TableHead>
                      <TableHead>ОТ</TableHead>
                      <TableHead>О</TableHead>
                      <TableHead>Серия</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {easternTeams.map((team, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">{team.team}</TableCell>
                        <TableCell>{team.games}</TableCell>
                        <TableCell>{team.wins}</TableCell>
                        <TableCell>{team.losses}</TableCell>
                        <TableCell>{team.otl}</TableCell>
                        <TableCell className="font-bold">{team.points}</TableCell>
                        <TableCell>{team.streak}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditTeam({ ...team, conference: 'eastern', index: idx })}
                                >
                                  <Icon name="Pencil" size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Редактировать команду</DialogTitle>
                                </DialogHeader>
                                {editTeam && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Название команды</Label>
                                      <Input
                                        value={editTeam.team}
                                        onChange={(e) => setEditTeam({ ...editTeam, team: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Игры</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.games}
                                          onChange={(e) => setEditTeam({ ...editTeam, games: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Победы</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.wins}
                                          onChange={(e) => setEditTeam({ ...editTeam, wins: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Поражения</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.losses}
                                          onChange={(e) => setEditTeam({ ...editTeam, losses: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Овертаймы</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.otl}
                                          onChange={(e) => setEditTeam({ ...editTeam, otl: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Очки</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.points}
                                          onChange={(e) => setEditTeam({ ...editTeam, points: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Серия</Label>
                                        <Input
                                          value={editTeam.streak}
                                          onChange={(e) => setEditTeam({ ...editTeam, streak: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                    <Button
                                      onClick={() => {
                                        updateTeam('eastern', editTeam.index, editTeam);
                                        setEditTeam(null);
                                      }}
                                      className="w-full"
                                    >
                                      Сохранить
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTeam('eastern', idx)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Западная конференция</CardTitle>
                  <Button onClick={() => addTeam('western')}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить команду
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Команда</TableHead>
                      <TableHead>И</TableHead>
                      <TableHead>В</TableHead>
                      <TableHead>П</TableHead>
                      <TableHead>ОТ</TableHead>
                      <TableHead>О</TableHead>
                      <TableHead>Серия</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {westernTeams.map((team, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">{team.team}</TableCell>
                        <TableCell>{team.games}</TableCell>
                        <TableCell>{team.wins}</TableCell>
                        <TableCell>{team.losses}</TableCell>
                        <TableCell>{team.otl}</TableCell>
                        <TableCell className="font-bold">{team.points}</TableCell>
                        <TableCell>{team.streak}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditTeam({ ...team, conference: 'western', index: idx })}
                                >
                                  <Icon name="Pencil" size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Редактировать команду</DialogTitle>
                                </DialogHeader>
                                {editTeam && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Название команды</Label>
                                      <Input
                                        value={editTeam.team}
                                        onChange={(e) => setEditTeam({ ...editTeam, team: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Игры</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.games}
                                          onChange={(e) => setEditTeam({ ...editTeam, games: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Победы</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.wins}
                                          onChange={(e) => setEditTeam({ ...editTeam, wins: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Поражения</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.losses}
                                          onChange={(e) => setEditTeam({ ...editTeam, losses: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Овертаймы</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.otl}
                                          onChange={(e) => setEditTeam({ ...editTeam, otl: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Очки</Label>
                                        <Input
                                          type="number"
                                          value={editTeam.points}
                                          onChange={(e) => setEditTeam({ ...editTeam, points: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label>Серия</Label>
                                        <Input
                                          value={editTeam.streak}
                                          onChange={(e) => setEditTeam({ ...editTeam, streak: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                    <Button
                                      onClick={() => {
                                        updateTeam('western', editTeam.index, editTeam);
                                        setEditTeam(null);
                                      }}
                                      className="w-full"
                                    >
                                      Сохранить
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTeam('western', idx)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Календарь матчей</CardTitle>
                  <Button onClick={addGame}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить матч
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingGames.map((game, idx) => (
                    <div key={idx} className="bg-muted/30 rounded-lg p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="grid grid-cols-5 gap-4 items-center">
                          <div>
                            <Label className="text-xs">Дата</Label>
                            <Input
                              value={game.date}
                              onChange={(e) => updateGame(idx, { ...game, date: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Время</Label>
                            <Input
                              value={game.time}
                              onChange={(e) => updateGame(idx, { ...game, time: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Дома</Label>
                            <Input
                              value={game.home}
                              onChange={(e) => updateGame(idx, { ...game, home: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">В гостях</Label>
                            <Input
                              value={game.away}
                              onChange={(e) => updateGame(idx, { ...game, away: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Статус</Label>
                            <Input
                              value={game.status}
                              onChange={(e) => updateGame(idx, { ...game, status: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteGame(idx)}
                        className="ml-4"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playoff">
            <Card>
              <CardHeader>
                <CardTitle>Управление плей-офф</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Для редактирования плей-офф используйте браузерную консоль разработчика или
                  обновите данные напрямую в localStorage с ключом 'playoffBracket'
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Правила лиги</CardTitle>
                  <Button onClick={addRule}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить правило
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="bg-muted/30 rounded-lg p-4">
                      <div className="space-y-3">
                        <div>
                          <Label>Заголовок</Label>
                          <Input
                            value={rule.title}
                            onChange={(e) => updateRule(idx, { ...rule, title: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Содержание</Label>
                          <Input
                            value={rule.content}
                            onChange={(e) => updateRule(idx, { ...rule, content: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteRule(idx)}
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
