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
}

interface PlayoffBracketProps {
  bracket: {
    eastern: ConferenceBracket;
    western: ConferenceBracket;
  };
}

const PlayoffBracket = ({ bracket }: PlayoffBracketProps) => {
  return (
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
              {bracket.eastern.round1.map((match, idx) => (
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
              {bracket.eastern.round2.map((match, idx) => (
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
              {bracket.western.round1.map((match, idx) => (
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
              {bracket.western.round2.map((match, idx) => (
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
  );
};

export default PlayoffBracket;
