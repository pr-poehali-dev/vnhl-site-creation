import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PlayoffMatch {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

interface ConferenceBracket {
  round1: PlayoffMatch[];
  round2: PlayoffMatch[];
  round3: PlayoffMatch[];
}

interface PlayoffBracketProps {
  bracket: {
    eastern: ConferenceBracket;
    western: ConferenceBracket;
    final?: PlayoffMatch[];
    champion?: string;
  };
}

const PlayoffBracket = ({ bracket }: PlayoffBracketProps) => {
  const renderMatch = (match: PlayoffMatch, idx: number) => {
    if (!match.team1 && !match.team2) return null;
    
    return (
      <div key={idx} className="bg-muted/30 rounded-lg p-2 md:p-3 space-y-1">
        <div className="flex justify-between items-center gap-2">
          <span className="font-medium text-xs md:text-sm truncate">{match.team1 || 'TBD'}</span>
          <Badge variant={match.score1 > match.score2 ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
            {match.score1}
          </Badge>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="font-medium text-xs md:text-sm truncate">{match.team2 || 'TBD'}</span>
          <Badge variant={match.score2 > match.score1 ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
            {match.score2}
          </Badge>
        </div>
      </div>
    );
  };

  const renderRound = (title: string, matches?: PlayoffMatch[]) => {
    if (!matches || !Array.isArray(matches) || matches.length === 0) return null;

    return (
      <div>
        <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 md:mb-3">{title}</h3>
        <div className="space-y-2">
          {matches.map((match, idx) => {
            if (!match) return null;
            return (
              <div key={idx} className="bg-muted/30 rounded-lg p-2 md:p-3 space-y-1">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-medium text-xs md:text-sm truncate">{match.team1 || 'TBD'}</span>
                  <Badge variant={match.score1 > match.score2 ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                    {match.score1}
                  </Badge>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-medium text-xs md:text-sm truncate">{match.team2 || 'TBD'}</span>
                  <Badge variant={match.score2 > match.score1 ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                    {match.score2}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const hasAnyMatches = () => {
    if (!bracket) return false;
    
    const checkRounds = (conference?: ConferenceBracket) => {
      if (!conference) return false;
      return (
        (conference.round1 && conference.round1.length > 0) ||
        (conference.round2 && conference.round2.length > 0) ||
        (conference.round3 && conference.round3.length > 0)
      );
    };

    return (
      checkRounds(bracket.eastern) ||
      checkRounds(bracket.western) ||
      (bracket.final && bracket.final.length > 0) ||
      !!bracket.champion
    );
  };

  if (!hasAnyMatches()) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="Trophy" size={64} className="text-muted-foreground/50 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ожидайте</h3>
        <p className="text-muted-foreground text-lg">Плей-офф скоро начнётся</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Icon name="Compass" size={20} className="text-primary md:w-6 md:h-6" />
              Восточная конференция
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {renderRound('1/8 финала', bracket?.eastern?.round1)}
            {renderRound('1/4 финала', bracket?.eastern?.round2)}
            {renderRound('Полуфинал', bracket?.eastern?.round3)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Icon name="Compass" size={20} className="text-secondary md:w-6 md:h-6" />
              Западная конференция
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {renderRound('1/8 финала', bracket?.western?.round1)}
            {renderRound('1/4 финала', bracket?.western?.round2)}
            {renderRound('Полуфинал', bracket?.western?.round3)}
          </CardContent>
        </Card>
      </div>

      {bracket?.final && bracket.final.length > 0 && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 md:gap-3 justify-center text-lg md:text-2xl">
              <Icon name="Trophy" size={24} className="text-primary md:w-8 md:h-8" />
              Главный Финал VNHL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              {renderRound('Финал', bracket.final)}
            </div>
          </CardContent>
        </Card>
      )}

      {bracket?.champion && (
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 md:gap-3 justify-center text-xl md:text-3xl">
              <Icon name="Trophy" size={32} className="text-primary md:w-10 md:h-10" />
              Чемпион VNHL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 md:py-6">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2">{bracket.champion}</h2>
              <p className="text-muted-foreground text-sm md:text-lg">Победитель сезона</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlayoffBracket;