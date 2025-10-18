import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface PlayoffMatch {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

interface PlayoffBracket {
  eastern: {
    round1: PlayoffMatch[];
    round2: PlayoffMatch[];
  };
  western: {
    round1: PlayoffMatch[];
    round2: PlayoffMatch[];
  };
}

interface PlayoffEditorProps {
  playoffBracket: PlayoffBracket;
  onUpdatePlayoff: (bracket: PlayoffBracket) => void;
}

const PlayoffEditor = ({ playoffBracket, onUpdatePlayoff }: PlayoffEditorProps) => {
  const updateMatch = (
    conference: 'eastern' | 'western',
    round: 'round1' | 'round2',
    index: number,
    field: keyof PlayoffMatch,
    value: string | number
  ) => {
    const updated = { ...playoffBracket };
    updated[conference][round][index] = {
      ...updated[conference][round][index],
      [field]: value,
    };
    onUpdatePlayoff(updated);
  };

  const renderMatchInputs = (
    match: PlayoffMatch,
    conference: 'eastern' | 'western',
    round: 'round1' | 'round2',
    index: number
  ) => (
    <div className="p-4 border rounded-lg space-y-3 bg-card/50">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Команда 1</Label>
          <Input
            value={match.team1}
            onChange={(e) => updateMatch(conference, round, index, 'team1', e.target.value)}
            className="h-9"
          />
        </div>
        <div>
          <Label className="text-xs">Счёт</Label>
          <Input
            type="number"
            value={match.score1}
            onChange={(e) =>
              updateMatch(conference, round, index, 'score1', parseInt(e.target.value))
            }
            className="h-9"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Команда 2</Label>
          <Input
            value={match.team2}
            onChange={(e) => updateMatch(conference, round, index, 'team2', e.target.value)}
            className="h-9"
          />
        </div>
        <div>
          <Label className="text-xs">Счёт</Label>
          <Input
            type="number"
            value={match.score2}
            onChange={(e) =>
              updateMatch(conference, round, index, 'score2', parseInt(e.target.value))
            }
            className="h-9"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Zap" size={24} className="text-primary" />
            Плей-офф Восточной конференции
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Раунд 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playoffBracket.eastern.round1.map((match, index) => (
                <div key={index}>
                  {renderMatchInputs(match, 'eastern', 'round1', index)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Раунд 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playoffBracket.eastern.round2.map((match, index) => (
                <div key={index}>
                  {renderMatchInputs(match, 'eastern', 'round2', index)}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Zap" size={24} className="text-secondary" />
            Плей-офф Западной конференции
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Раунд 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playoffBracket.western.round1.map((match, index) => (
                <div key={index}>
                  {renderMatchInputs(match, 'western', 'round1', index)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Раунд 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playoffBracket.western.round2.map((match, index) => (
                <div key={index}>
                  {renderMatchInputs(match, 'western', 'round2', index)}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayoffEditor;
