export const defaultEasternTeams = [
  { pos: 1, team: 'Boston Bruins', games: 28, wins: 20, losses: 6, otl: 2, points: 42, streak: 'W3' },
  { pos: 2, team: 'Toronto Maple Leafs', games: 27, wins: 18, losses: 7, otl: 2, points: 38, streak: 'W2' },
  { pos: 3, team: 'Tampa Bay Lightning', games: 28, wins: 17, losses: 9, otl: 2, points: 36, streak: 'L1' },
  { pos: 4, team: 'Florida Panthers', games: 27, wins: 16, losses: 9, otl: 2, points: 34, streak: 'W1' },
  { pos: 5, team: 'Buffalo Sabres', games: 28, wins: 15, losses: 10, otl: 3, points: 33, streak: 'OT1' },
  { pos: 6, team: 'Ottawa Senators', games: 27, wins: 14, losses: 11, otl: 2, points: 30, streak: 'L2' },
  { pos: 7, team: 'Montreal Canadiens', games: 28, wins: 12, losses: 13, otl: 3, points: 27, streak: 'W1' },
  { pos: 8, team: 'Detroit Red Wings', games: 27, wins: 10, losses: 15, otl: 2, points: 22, streak: 'L3' },
];

export const defaultWesternTeams = [
  { pos: 1, team: 'Vegas Golden Knights', games: 28, wins: 21, losses: 5, otl: 2, points: 44, streak: 'W5' },
  { pos: 2, team: 'Dallas Stars', games: 27, wins: 19, losses: 6, otl: 2, points: 40, streak: 'W2' },
  { pos: 3, team: 'Colorado Avalanche', games: 28, wins: 18, losses: 8, otl: 2, points: 38, streak: 'W3' },
  { pos: 4, team: 'Edmonton Oilers', games: 27, wins: 17, losses: 8, otl: 2, points: 36, streak: 'L1' },
  { pos: 5, team: 'Los Angeles Kings', games: 28, wins: 16, losses: 9, otl: 3, points: 35, streak: 'W1' },
  { pos: 6, team: 'Seattle Kraken', games: 27, wins: 14, losses: 11, otl: 2, points: 30, streak: 'OT1' },
  { pos: 7, team: 'Calgary Flames', games: 28, wins: 13, losses: 12, otl: 3, points: 29, streak: 'L1' },
  { pos: 8, team: 'Vancouver Canucks', games: 27, wins: 11, losses: 14, otl: 2, points: 24, streak: 'L2' },
];

export const defaultUpcomingGames = [
  { date: '19 окт', time: '19:00', home: 'Boston Bruins', away: 'Toronto Maple Leafs', status: 'Скоро' },
  { date: '19 окт', time: '21:30', home: 'Vegas Golden Knights', away: 'Dallas Stars', status: 'Скоро' },
  { date: '20 окт', time: '18:00', home: 'Tampa Bay Lightning', away: 'Florida Panthers', status: 'Завтра' },
  { date: '20 окт', time: '20:00', home: 'Colorado Avalanche', away: 'Edmonton Oilers', status: 'Завтра' },
  { date: '21 окт', time: '19:00', home: 'Buffalo Sabres', away: 'Ottawa Senators', status: '21 окт' },
  { date: '21 окт', time: '22:00', home: 'Los Angeles Kings', away: 'Seattle Kraken', status: '21 окт' },
];

export const defaultPlayoffBracket = {
  eastern: {
    round1: [
      { team1: 'Boston Bruins', team2: 'Detroit Red Wings', score1: 4, score2: 1 },
      { team1: 'Toronto Maple Leafs', team2: 'Montreal Canadiens', score1: 4, score2: 2 },
      { team1: 'Tampa Bay Lightning', team2: 'Ottawa Senators', score1: 4, score2: 3 },
      { team1: 'Florida Panthers', team2: 'Buffalo Sabres', score1: 3, score2: 4 },
    ],
    round2: [
      { team1: 'Boston Bruins', team2: 'Buffalo Sabres', score1: 4, score2: 2 },
      { team1: 'Toronto Maple Leafs', team2: 'Tampa Bay Lightning', score1: 4, score2: 3 },
    ],
    round3: [
      { team1: 'Boston Bruins', team2: 'Toronto Maple Leafs', score1: 4, score2: 2 },
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
      { team1: 'Vegas Golden Knights', team2: 'Edmonton Oilers', score1: 4, score2: 3 },
      { team1: 'Dallas Stars', team2: 'Seattle Kraken', score1: 4, score2: 1 },
    ],
    round3: [
      { team1: 'Vegas Golden Knights', team2: 'Dallas Stars', score1: 4, score2: 2 },
    ],
  },
  champion: 'Vegas Golden Knights',
};

export const defaultRules = [
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

export const defaultCaptains = [
  {
    id: '1',
    name: 'Connor McDavid',
    team: 'Edmonton Oilers',
    number: 97,
    position: 'C',
    image: '',
  },
  {
    id: '2',
    name: 'Sidney Crosby',
    team: 'Pittsburgh Penguins',
    number: 87,
    position: 'C',
    image: '',
  },
  {
    id: '3',
    name: 'Nathan MacKinnon',
    team: 'Colorado Avalanche',
    number: 29,
    position: 'C',
    image: '',
  },
  {
    id: '4',
    name: 'Aleksander Barkov',
    team: 'Florida Panthers',
    number: 16,
    position: 'C',
    image: '',
  },
];

export const defaultCaptainsEmptyMessage = {
  title: 'Сейчас нет Капитанов Команд',
  subtitle: 'Ожидайте, они скоро появятся',
};

export const defaultScheduleEmptyMessage = {
  title: 'Матчей ещё нет',
  subtitle: 'Ожидайте, скоро они появятся',
};

export const defaultRulesEmptyMessage = {
  title: 'На данный момент правил нет',
  subtitle: 'Ожидайте, они скоро тут появятся',
};