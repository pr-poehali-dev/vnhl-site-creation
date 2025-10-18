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
  final: PlayoffMatch[];
}

interface PlayoffBracketProps {
  bracket: {
    eastern: ConferenceBracket;
    western: ConferenceBracket;
    grandFinal?: PlayoffMatch[];
  };
}

const PlayoffBracket = ({ bracket }: PlayoffBracketProps) => {
  const renderMatch = (match: PlayoffMatch, idx: number) => {
    if (!match.team1 && !match.team2) return null;
    
    return (
      <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-1">
        <div className="flex justify-between items-center">
          <span className="font-medium">{match.team1 || 'TBD'}</span>
          <Badge variant={match.score1 > match.score2 ? 'default' : 'secondary'}>
            {match.score1}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{match.team2 || 'TBD'}</span>
          <Badge variant={match.score2 > match.score1 ? 'default' : 'secondary'}>
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
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">{title}</h3>
        <div className="space-y-2">
          {matches.map((match, idx) => {
            if (!match) return null;
            return (
              <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.team1 || 'TBD'}</span>
                  <Badge variant={match.score1 > match.score2 ? 'default' : 'secondary'}>
                    {match.score1}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.team2 || 'TBD'}</span>
                  <Badge variant={match.score2 > match.score1 ? 'default' : 'secondary'}>
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
        (conference.round3 && conference.round3.length > 0) ||
        (conference.final && conference.final.length > 0)
      );
    };

    return (
      checkRounds(bracket.eastern) ||
      checkRounds(bracket.western) ||
      (bracket.grandFinal && bracket.grandFinal.length > 0)
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
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Compass" size={24} className="text-primary" />
              Восточная конференция
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderRound('1/8 финала', bracket?.eastern?.round1)}
            {renderRound('1/4 финала', bracket?.eastern?.round2)}
            {renderRound('1/2 финала', bracket?.eastern?.round3)}
            {renderRound('Финал конференции', bracket?.eastern?.final)}
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
            {renderRound('1/8 финала', bracket?.western?.round1)}
            {renderRound('1/4 финала', bracket?.western?.round2)}
            {renderRound('1/2 финала', bracket?.western?.round3)}
            {renderRound('Финал конференции', bracket?.western?.final)}
          </CardContent>
        </Card>
      </div>

      {bracket?.grandFinal && bracket.grandFinal.length > 0 && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center text-2xl">
              <Icon name="Trophy" size={32} className="text-primary" />
              Главный Финал VNHL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              {renderRound('Чемпион VNHL', bracket.grandFinal)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlayoffBracket;