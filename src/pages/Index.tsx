import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const defaultEasternTeams = [
  { pos: 1, team: 'Boston Bruins', games: 28, wins: 20, losses: 6, otl: 2, points: 42, streak: 'W3' },
  { pos: 2, team: 'Toronto Maple Leafs', games: 27, wins: 18, losses: 7, otl: 2, points: 38, streak: 'W2' },
  { pos: 3, team: 'Tampa Bay Lightning', games: 28, wins: 17, losses: 9, otl: 2, points: 36, streak: 'L1' },
  { pos: 4, team: 'Florida Panthers', games: 27, wins: 16, losses: 9, otl: 2, points: 34, streak: 'W1' },
  { pos: 5, team: 'Buffalo Sabres', games: 28, wins: 15, losses: 10, otl: 3, points: 33, streak: 'OT1' },
  { pos: 6, team: 'Ottawa Senators', games: 27, wins: 14, losses: 11, otl: 2, points: 30, streak: 'L2' },
  { pos: 7, team: 'Montreal Canadiens', games: 28, wins: 12, losses: 13, otl: 3, points: 27, streak: 'W1' },
  { pos: 8, team: 'Detroit Red Wings', games: 27, wins: 10, losses: 15, otl: 2, points: 22, streak: 'L3' },
];

const defaultWesternTeams = [
  { pos: 1, team: 'Vegas Golden Knights', games: 28, wins: 21, losses: 5, otl: 2, points: 44, streak: 'W5' },
  { pos: 2, team: 'Dallas Stars', games: 27, wins: 19, losses: 6, otl: 2, points: 40, streak: 'W2' },
  { pos: 3, team: 'Colorado Avalanche', games: 28, wins: 18, losses: 8, otl: 2, points: 38, streak: 'W3' },
  { pos: 4, team: 'Edmonton Oilers', games: 27, wins: 17, losses: 8, otl: 2, points: 36, streak: 'L1' },
  { pos: 5, team: 'Los Angeles Kings', games: 28, wins: 16, losses: 9, otl: 3, points: 35, streak: 'W1' },
  { pos: 6, team: 'Seattle Kraken', games: 27, wins: 14, losses: 11, otl: 2, points: 30, streak: 'OT1' },
  { pos: 7, team: 'Calgary Flames', games: 28, wins: 13, losses: 12, otl: 3, points: 29, streak: 'L1' },
  { pos: 8, team: 'Vancouver Canucks', games: 27, wins: 11, losses: 14, otl: 2, points: 24, streak: 'L2' },
];

const defaultUpcomingGames = [
  { date: '19 окт', time: '19:00', home: 'Boston Bruins', away: 'Toronto Maple Leafs', status: 'Скоро' },
  { date: '19 окт', time: '21:30', home: 'Vegas Golden Knights', away: 'Dallas Stars', status: 'Скоро' },
  { date: '20 окт', time: '18:00', home: 'Tampa Bay Lightning', away: 'Florida Panthers', status: 'Завтра' },
  { date: '20 окт', time: '20:00', home: 'Colorado Avalanche', away: 'Edmonton Oilers', status: 'Завтра' },
  { date: '21 окт', time: '19:00', home: 'Buffalo Sabres', away: 'Ottawa Senators', status: '21 окт' },
  { date: '21 окт', time: '22:00', home: 'Los Angeles Kings', away: 'Seattle Kraken', status: '21 окт' },
];

const defaultPlayoffBracket = {
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

const defaultRules = [
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('standings');
  const [easternTeams, setEasternTeams] = useState(defaultEasternTeams);
  const [westernTeams, setWesternTeams] = useState(defaultWesternTeams);
  const [upcomingGames, setUpcomingGames] = useState(defaultUpcomingGames);
  const [playoffBracket, setPlayoffBracket] = useState(defaultPlayoffBracket);
  const [rules, setRules] = useState(defaultRules);

  useEffect(() => {
    const savedEastern = localStorage.getItem('easternTeams');
    const savedWestern = localStorage.getItem('westernTeams');
    const savedGames = localStorage.getItem('upcomingGames');
    const savedPlayoff = localStorage.getItem('playoffBracket');
    const savedRules = localStorage.getItem('rules');

    if (savedEastern) setEasternTeams(JSON.parse(savedEastern));
    if (savedWestern) setWesternTeams(JSON.parse(savedWestern));
    if (savedGames) setUpcomingGames(JSON.parse(savedGames));
    if (savedPlayoff) setPlayoffBracket(JSON.parse(savedPlayoff));
    if (savedRules) setRules(JSON.parse(savedRules));
  }, []);

  const allTeams = [...easternTeams, ...westernTeams].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Icon name="Trophy" size={40} className="text-primary" />
            <div>
              <h1 className="text-4xl font-bold">VNHL</h1>
              <p className="text-sm text-muted-foreground">Виртуальная Национальная Хоккейная Лига</p>
            </div>
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Команда</TableHead>
                          <TableHead className="text-center">И</TableHead>
                          <TableHead className="text-center">В</TableHead>
                          <TableHead className="text-center">П</TableHead>
                          <TableHead className="text-center">ОТ</TableHead>
                          <TableHead className="text-center font-bold">О</TableHead>
                          <TableHead className="text-center">Серия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {easternTeams.map((team) => (
                          <TableRow key={team.pos} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{team.pos}</TableCell>
                            <TableCell className="font-semibold">{team.team}</TableCell>
                            <TableCell className="text-center">{team.games}</TableCell>
                            <TableCell className="text-center text-green-400">{team.wins}</TableCell>
                            <TableCell className="text-center text-red-400">{team.losses}</TableCell>
                            <TableCell className="text-center text-yellow-400">{team.otl}</TableCell>
                            <TableCell className="text-center font-bold text-primary">{team.points}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={team.streak.startsWith('W') ? 'default' : 'secondary'}>
                                {team.streak}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Команда</TableHead>
                          <TableHead className="text-center">И</TableHead>
                          <TableHead className="text-center">В</TableHead>
                          <TableHead className="text-center">П</TableHead>
                          <TableHead className="text-center">ОТ</TableHead>
                          <TableHead className="text-center font-bold">О</TableHead>
                          <TableHead className="text-center">Серия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {westernTeams.map((team) => (
                          <TableRow key={team.pos} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{team.pos}</TableCell>
                            <TableCell className="font-semibold">{team.team}</TableCell>
                            <TableCell className="text-center">{team.games}</TableCell>
                            <TableCell className="text-center text-green-400">{team.wins}</TableCell>
                            <TableCell className="text-center text-red-400">{team.losses}</TableCell>
                            <TableCell className="text-center text-yellow-400">{team.otl}</TableCell>
                            <TableCell className="text-center font-bold text-primary">{team.points}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={team.streak.startsWith('W') ? 'default' : 'secondary'}>
                                {team.streak}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Команда</TableHead>
                          <TableHead className="text-center">И</TableHead>
                          <TableHead className="text-center">В</TableHead>
                          <TableHead className="text-center">П</TableHead>
                          <TableHead className="text-center">ОТ</TableHead>
                          <TableHead className="text-center font-bold">О</TableHead>
                          <TableHead className="text-center">Серия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allTeams.map((team, index) => (
                          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="font-semibold">{team.team}</TableCell>
                            <TableCell className="text-center">{team.games}</TableCell>
                            <TableCell className="text-center text-green-400">{team.wins}</TableCell>
                            <TableCell className="text-center text-red-400">{team.losses}</TableCell>
                            <TableCell className="text-center text-yellow-400">{team.otl}</TableCell>
                            <TableCell className="text-center font-bold text-primary">{team.points}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={team.streak.startsWith('W') ? 'default' : 'secondary'}>
                                {team.streak}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="playoff" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Compass" size={24} className="text-primary" />
                    Восточная конференция
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">1/4 финала</h3>
                    <div className="space-y-2">
                      {playoffBracket.eastern.round1.map((match, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team1}</span>
                            <Badge variant={match.score1 > match.score2 ? 'default' : 'secondary'}>
                              {match.score1}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team2}</span>
                            <Badge variant={match.score2 > match.score1 ? 'default' : 'secondary'}>
                              {match.score2}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">1/2 финала</h3>
                    <div className="space-y-2">
                      {playoffBracket.eastern.round2.map((match, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team1}</span>
                            <Badge>{match.score1}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team2}</span>
                            <Badge>{match.score2}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Compass" size={24} className="text-secondary" />
                    Западная конференция
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">1/4 финала</h3>
                    <div className="space-y-2">
                      {playoffBracket.western.round1.map((match, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team1}</span>
                            <Badge variant={match.score1 > match.score2 ? 'default' : 'secondary'}>
                              {match.score1}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team2}</span>
                            <Badge variant={match.score2 > match.score1 ? 'default' : 'secondary'}>
                              {match.score2}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">1/2 финала</h3>
                    <div className="space-y-2">
                      {playoffBracket.western.round2.map((match, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team1}</span>
                            <Badge>{match.score1}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{match.team2}</span>
                            <Badge>{match.score2}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} className="text-primary" />
                  Предстоящие матчи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingGames.map((game, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/30 rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[80px]">
                          <div className="text-sm font-semibold">{game.date}</div>
                          <div className="text-xs text-muted-foreground">{game.time}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{game.home}</span>
                          <Icon name="Swords" size={18} className="text-muted-foreground" />
                          <span className="font-semibold">{game.away}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{game.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <div className="grid gap-4">
              {rules.map((rule, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Icon name="FileText" size={20} className="text-primary" />
                      {rule.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{rule.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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